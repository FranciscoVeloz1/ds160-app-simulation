import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  message: string | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { message: null };

  public static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "Something went wrong." };
  }

  public componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error(error, info);
  }

  public render(): ReactNode {
    if (this.state.message) {
      return (
        <main className="page">
          <p role="alert">{this.state.message}</p>
        </main>
      );
    }
    return this.props.children;
  }
}
