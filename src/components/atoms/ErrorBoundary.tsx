import styled from "@emotion/styled";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  dogImageUrl: string | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: calc(100vh - 20%);

  img {
    max-width: 400px;
    margin-top: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    dogImageUrl: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true, dogImageUrl: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.fetchDogImage();
  }

  private async fetchDogImage() {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      if (data.status === "success") {
        this.setState({ dogImageUrl: data.message });
      }
    } catch (error) {
      console.error("Failed to fetch dog image:", error);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h1>There was an error</h1>
          {this.state.dogImageUrl && (
            <>
              <img
                src={this.state.dogImageUrl}
                alt="A cute dog to cheer you up"
              />
              <p>But here&apos;s a cute dog to cheer you up!</p>
            </>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
