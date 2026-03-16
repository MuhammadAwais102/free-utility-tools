"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ToolErrorBoundaryProps = {
  children: ReactNode;
};

type ToolErrorBoundaryState = {
  hasError: boolean;
};

export class ToolErrorBoundary extends Component<
  ToolErrorBoundaryProps,
  ToolErrorBoundaryState
> {
  state: ToolErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Tool rendering failed", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="rounded-[32px] border-[var(--color-border-strong)] bg-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Processing Error
              </p>
              <h2 className="text-2xl font-black tracking-tight text-[var(--color-foreground)]">
                Something went wrong while processing your file.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted-foreground)]">
                Please try again with a different file or refresh the page.
              </p>
            </div>
            <Button onClick={() => this.setState({ hasError: false })}>Try again</Button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}
