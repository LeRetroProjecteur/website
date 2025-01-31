"use client";

import React, { ReactNode } from "react";

export class EmptyErrorBoundary extends React.Component<
  {
    children: ReactNode;
  },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.log({ error, errorInfo });
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
