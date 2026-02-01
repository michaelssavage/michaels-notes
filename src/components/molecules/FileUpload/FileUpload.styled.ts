import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const UploadContainer = styled.div<{ styles?: SerializedStyles }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > button {
    background-color: ${({ theme }) => theme.blue200};
    color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.black};

    &:hover {
      background-color: ${({ theme }) => theme.blue300};
      color: ${({ theme }) => theme.white};
      border: 1px solid ${({ theme }) => theme.black};
    }
  }

  ${({ styles }) => styles}
`;

export const UploadCount = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray600};
`;

export const UploadError = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.red300};
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.red};
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
  border: 1px solid ${({ theme }) => theme.gray400};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.white};
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.gray500};
  }
`;

export const UploadFileName = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray600};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;

export const UploadFileProgress = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.blue300};
  font-weight: 600;
  margin: 0;
`;

export const ImagePreview = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 0.375rem;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.gray300};
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
  background-color: ${({ theme }) => theme.gray300};
  border-radius: 2px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ theme }) => theme.blue300};
  transition: width 0.3s ease;
`;
