import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect } from "react";

interface DogResponse {
  status: string;
  message: string;
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

const fetchDogImage = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data: DogResponse = await response.json();
  return data.message;
};

export default function DefaultErrorComponent({ error }: ErrorComponentProps) {
  const { data: dogImageUrl, isError } = useQuery({
    queryKey: ["dogImage", error?.message],
    queryFn: fetchDogImage,
    retry: 1,
    staleTime: 60_000,
  });

  useEffect(() => {
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <ErrorContainer>
      <h1>There was an error</h1>
      {dogImageUrl && !isError && (
        <>
          <img src={dogImageUrl} alt="A cute dog to cheer you up" />
          <p>But here&apos;s a cute dog to cheer you up!</p>
        </>
      )}
    </ErrorContainer>
  );
}
