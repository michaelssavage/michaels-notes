import styled from "@emotion/styled";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

export default function DefaultErrorComponent({ error }: ErrorComponentProps) {
  const [dogImageUrl, setDogImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        if (data.status === "success") {
          setDogImageUrl(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch dog image:", err);
      }
    };

    fetchDogImage();
  }, []);

  useEffect(() => {
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <ErrorContainer>
      <h1>There was an error</h1>
      {dogImageUrl && (
        <>
          <img src={dogImageUrl} alt="A cute dog to cheer you up" />
          <p>But here&apos;s a cute dog to cheer you up!</p>
        </>
      )}
    </ErrorContainer>
  );
}
