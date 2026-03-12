import type {
  TextToolResult,
  ValidationResult,
  XmlAttributeMap,
  XmlJsonObject,
  XmlJsonPrimitive,
  XmlJsonValue,
} from "@/types/data";

const ATTRIBUTE_KEY = "@attributes";
const TEXT_KEY = "#text";

function createParserError(message: string) {
  return {
    isValid: false,
    error: message,
  } satisfies ValidationResult;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseXmlDocument(xml: string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(xml, "application/xml");
  const parserError = document.querySelector("parsererror");

  if (parserError) {
    throw new Error(parserError.textContent?.trim() || "The XML input is malformed.");
  }

  return document;
}

function serializeNode(node: Node, level = 0): string {
  const indent = "  ".repeat(level);

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim() ?? "";
    return text ? `${indent}${escapeXml(text)}` : "";
  }

  if (node.nodeType === Node.CDATA_SECTION_NODE) {
    return `${indent}<![CDATA[${node.textContent ?? ""}]]>`;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return "";
  }

  const element = node as Element;
  const attributes = Array.from(element.attributes)
    .map((attribute) => ` ${attribute.name}="${escapeXml(attribute.value)}"`)
    .join("");

  const children = Array.from(element.childNodes)
    .map((child) => serializeNode(child, level + 1))
    .filter(Boolean);

  if (!children.length) {
    return `${indent}<${element.tagName}${attributes} />`;
  }

  if (
    children.length === 1 &&
    element.childNodes.length === 1 &&
    (element.firstChild?.nodeType === Node.TEXT_NODE ||
      element.firstChild?.nodeType === Node.CDATA_SECTION_NODE)
  ) {
    return `${indent}<${element.tagName}${attributes}>${children[0].trim()}</${element.tagName}>`;
  }

  return `${indent}<${element.tagName}${attributes}>\n${children.join("\n")}\n${indent}</${element.tagName}>`;
}

function xmlElementToJson(element: Element): XmlJsonObject {
  const result: XmlJsonObject = {};

  if (element.attributes.length) {
    const attributes: XmlAttributeMap = {};
    Array.from(element.attributes).forEach((attribute) => {
      attributes[attribute.name] = attribute.value;
    });
    result[ATTRIBUTE_KEY] = attributes;
  }

  const textSegments: string[] = [];
  const childGroups = new Map<string, XmlJsonObject[]>();

  Array.from(element.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const childElement = node as Element;
      const childValue = xmlElementToJson(childElement);
      const existing = childGroups.get(childElement.tagName) ?? [];
      existing.push(childValue);
      childGroups.set(childElement.tagName, existing);
    } else if (
      node.nodeType === Node.TEXT_NODE ||
      node.nodeType === Node.CDATA_SECTION_NODE
    ) {
      const text = node.textContent?.trim();
      if (text) {
        textSegments.push(text);
      }
    }
  });

  if (textSegments.length) {
    result[TEXT_KEY] = textSegments.join(" ");
  }

  childGroups.forEach((values, key) => {
    result[key] = values.length === 1 ? values[0] : values;
  });

  return result;
}

function coercePrimitiveToString(value: XmlJsonPrimitive) {
  if (value === null) {
    return "";
  }

  return String(value);
}

function appendJsonValueToElement(
  document: XMLDocument,
  element: Element,
  value: XmlJsonValue,
) {
  if (Array.isArray(value)) {
    throw new Error("Arrays are only allowed for repeated child elements, not as a direct element value.");
  }

  if (!isPlainObject(value)) {
    element.appendChild(document.createTextNode(coercePrimitiveToString(value)));
    return;
  }

  Object.entries(value).forEach(([key, nestedValue]) => {
    if (nestedValue === undefined) {
      return;
    }

    if (key === ATTRIBUTE_KEY) {
      if (!isPlainObject(nestedValue)) {
        throw new Error(`"${ATTRIBUTE_KEY}" must be an object of attribute key/value pairs.`);
      }

      Object.entries(nestedValue).forEach(([attributeName, attributeValue]) => {
        if (attributeValue === undefined || attributeValue === null) {
          return;
        }

        element.setAttribute(attributeName, String(attributeValue));
      });
      return;
    }

    if (key === TEXT_KEY) {
      if (typeof nestedValue === "object") {
        throw new Error(`"${TEXT_KEY}" must be a string, number, boolean, or null.`);
      }

      element.appendChild(document.createTextNode(coercePrimitiveToString(nestedValue)));
      return;
    }

    if (Array.isArray(nestedValue)) {
      nestedValue.forEach((item) => {
        const child = document.createElement(key);
        appendJsonValueToElement(document, child, item);
        element.appendChild(child);
      });
      return;
    }

    const child = document.createElement(key);
    appendJsonValueToElement(document, child, nestedValue);
    element.appendChild(child);
  });
}

export function validateXml(xml: string): ValidationResult {
  const trimmed = xml.trim();

  if (!trimmed) {
    return createParserError("Paste XML before running this tool.");
  }

  try {
    parseXmlDocument(trimmed);
    return {
      isValid: true,
      error: null,
    };
  } catch (error) {
    return createParserError(
      error instanceof Error ? error.message : "The XML input is malformed.",
    );
  }
}

export function validateJson(json: string): ValidationResult {
  const trimmed = json.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: "Paste JSON before running this tool.",
    };
  }

  try {
    JSON.parse(trimmed);
    return {
      isValid: true,
      error: null,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "The JSON input is invalid.",
    };
  }
}

export function prettifyXml(xml: string): TextToolResult {
  try {
    const document = parseXmlDocument(xml.trim());
    const formatted = serializeNode(document.documentElement);

    return {
      output: `<?xml version="1.0" encoding="UTF-8"?>\n${formatted}`,
      error: null,
    };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Unable to format the XML.",
    };
  }
}

export function convertXmlToJson(xml: string): TextToolResult {
  try {
    const document = parseXmlDocument(xml.trim());
    const root = document.documentElement;
    const json = {
      [root.tagName]: xmlElementToJson(root),
    };

    return {
      output: JSON.stringify(json, null, 2),
      error: null,
    };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Unable to convert XML to JSON.",
    };
  }
}

export function convertJsonToXml(json: string): TextToolResult {
  try {
    const parsed = JSON.parse(json.trim()) as unknown;

    if (!isPlainObject(parsed)) {
      throw new Error("JSON input must be an object with a single XML root node.");
    }

    const entries = Object.entries(parsed);
    if (entries.length !== 1) {
      throw new Error("JSON input must contain exactly one top-level property to use as the XML root.");
    }

    const [rootName, rootValue] = entries[0];
    const xmlDocument = document.implementation.createDocument("", "", null);
    const root = xmlDocument.createElement(rootName);
    appendJsonValueToElement(xmlDocument, root, rootValue as XmlJsonValue);
    xmlDocument.appendChild(root);

    const serialized = new XMLSerializer().serializeToString(xmlDocument);
    return prettifyXml(serialized);
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Unable to convert JSON to XML.",
    };
  }
}
