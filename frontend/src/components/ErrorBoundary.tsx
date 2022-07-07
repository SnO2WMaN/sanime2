import React, { ReactElement } from "react";

export class ErrorBoundary extends React.Component<
  { fallback: ReactElement; children: ReactElement },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactElement; children: ReactElement }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError
      ? this.props.fallback
      : this.props.children;
  }
}
