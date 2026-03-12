export type ValidationResult = {
  isValid: boolean;
  error: string | null;
};

export type XmlAttributeMap = Record<string, string>;

export type XmlJsonPrimitive = string | number | boolean | null;

export type XmlJsonValue = XmlJsonPrimitive | XmlJsonObject | XmlJsonValue[];

export type XmlJsonObject = {
  "@attributes"?: XmlAttributeMap;
  "#text"?: string;
  [key: string]: XmlJsonValue | XmlAttributeMap | string | undefined;
};

export type TextToolResult = {
  output: string;
  error: string | null;
};
