import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const UploadContainer = styled.div<{ styles?: SerializedStyles }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > button {
    background-color: var(--color-blue200);
    color: var(--color-white);
    border: 1px solid var(--color-black);

    &:hover {
      background-color: var(--color-blue300);
      color: var(--color-white);
      border: 1px solid var(--color-black);
    }
  }

  ${({ styles }) => styles}
`;

export const UploadCount = styled.p`
  font-size: 0.8rem;
  color: var(--color-gray600);
`;

export const UploadError = styled.div`
  font-size: 0.8rem;
  color: var(--color-red300);
  padding: 0.75rem;
  background-color: var(--color-red);
  border-radius: 0.5rem;

  p {
    margin: 0;
    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  }
`;

export const UploadFileList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const UploadFileItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--color-gray400);
  border-radius: 0.5rem;
  background-color: var(--color-white);
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--color-gray500);
  }
`;

export const UploadFileName = styled.p`
  font-size: 0.8rem;
  color: var(--color-gray600);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;

export const UploadFileProgress = styled.p`
  font-size: 0.8rem;
  color: var(--color-blue300);
  font-weight: 600;
  margin: 0;
`;

export const ImagePreview = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 0.375rem;
  overflow: hidden;
  border: 1px solid var(--color-gray300);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: var(--color-gray300);
  border-radius: 2px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: var(--color-blue300);
  transition: width 0.3s ease;
`;
