import { SerializedStyles } from "@emotion/react";

const UPLOADCARE_PUBLIC_KEY = import.meta.env.VITE_UPLOADCARE_KEY;

export interface FileUploadProps {
  value: string[];
  maxFiles?: number;
  maxFileSize?: number;
  onChange: (files: string[]) => void;
  styles?: SerializedStyles;
  acceptImages?: boolean;
}

export const filenameFromUrl = (url: string) => {
  try {
    return decodeURIComponent(url.split("/").filter(Boolean).pop() || url);
  } catch {
    return url;
  }
};

export const stripTempPrefix = (id: string) => {
  return id.replace(/^temp-\d+-/, "");
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  else if (bytes < 1024 * 1024 * 1024)
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
};

interface UploadcareResponse {
  uuid: string;
  original_filename: string;
  size: number;
  mime_type: string;
}

export const uploadToUploadcare = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<UploadcareResponse> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY);
    formData.append("file", file);
    xhr.open("POST", "https://upload.uploadcare.com/base/");
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);

          if (response.file) {
            resolve({
              uuid: response.file,
              original_filename: file.name,
              size: file.size,
              mime_type: file.type,
            });
          } else {
            reject(new Error("No file UUID in response"));
          }
        } catch (error) {
          console.error("Parse error:", error);
          reject(new Error("Invalid response from Uploadcare"));
        }
      } else {
        reject(new Error(`HTTP Error: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error occurred"));
    };

    xhr.send(formData);
  });
};
