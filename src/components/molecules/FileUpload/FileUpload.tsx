import { Group } from "@/components/atoms/Group";
import { FileInput } from "@/components/form/FileInput";
import { TextInput } from "@/components/form/TextInput";
import { XIcon } from "@/components/icons/X";
import { Button } from "@/components/molecules/Button";
import { Picture } from "@/components/molecules/Picture";
import { css, SerializedStyles } from "@emotion/react";
import { type ChangeEvent, useRef, useState } from "react";
import {
  ImagePreview,
  UploadContainer,
  UploadCount,
  UploadError,
  UploadFileItem,
  UploadFileList,
  UploadFileName,
  UploadFileProgress,
} from "./FileUpload.styled";
import {
  filenameFromUrl,
  formatFileSize,
  uploadToUploadcare,
} from "./FileUpload.util";

type PendingFile =
  | { name: string; status: "uploading"; progress: number }
  | { name: string; status: "failed"; message: string };

interface FileUploadProps {
  name: string;
  value: string[];
  maxFiles?: number;
  maxFileSize?: number;
  onChange: (files: string[]) => void;
  styles?: SerializedStyles;
  acceptImages?: boolean;
  showCount?: boolean;
}

export default function FileUpload({
  name,
  value = [],
  maxFiles = 10,
  maxFileSize = 5 * 1024 * 1024,
  onChange,
  styles,
  acceptImages = true,
  showCount = true,
}: FileUploadProps) {
  // Files that aren't in `value` yet: either in flight or rejected/failed.
  const [pending, setPending] = useState<Record<string, PendingFile>>({});
  const [limitError, setLimitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setFile = (id: string, file: PendingFile) =>
    setPending((prev) => ({ ...prev, [id]: file }));

  const removePending = (id: string) =>
    setPending((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });

  const uploadingEntries = Object.entries(pending).filter(
    (entry): entry is [string, Extract<PendingFile, { status: "uploading" }>] =>
      entry[1].status === "uploading",
  );
  const failedEntries = Object.entries(pending).filter(
    (entry): entry is [string, Extract<PendingFile, { status: "failed" }>] =>
      entry[1].status === "failed",
  );
  const isUploading = uploadingEntries.length > 0;

  const uploadFile = async (id: string, file: File) => {
    setFile(id, { name: file.name, status: "uploading", progress: 0 });
    try {
      const response = await uploadToUploadcare(file, (progress) => {
        setFile(id, { name: file.name, status: "uploading", progress });
      });
      removePending(id);
      return `https://31m9mhhbv2.ucarecd.net/${response.uuid}/${response.original_filename}`;
    } catch {
      setFile(id, {
        name: file.name,
        status: "failed",
        message: `Failed to upload ${file.name}`,
      });
      return null;
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    // Clear the input so selecting the same file again still fires onChange.
    e.target.value = "";
    if (!files.length) return;

    // A new selection starts fresh.
    setLimitError(null);
    setPending({});

    if (value.length + files.length > maxFiles) {
      setLimitError(`You can only upload a maximum of ${maxFiles} files`);
      return;
    }

    const toUpload: Array<{ id: string; file: File }> = [];
    for (const file of files) {
      const id = crypto.randomUUID();
      if (file.size > maxFileSize) {
        setFile(id, {
          name: file.name,
          status: "failed",
          message: `${file.name} exceeds ${formatFileSize(maxFileSize)}`,
        });
      } else if (acceptImages && !file.type.startsWith("image/")) {
        setFile(id, {
          name: file.name,
          status: "failed",
          message: `${file.name} is not an image file`,
        });
      } else {
        toUpload.push({ id, file });
      }
    }

    const urls = await Promise.all(
      toUpload.map(({ id, file }) => uploadFile(id, file)),
    );
    const uploaded = urls.filter((url): url is string => url !== null);
    if (uploaded.length) onChange([...value, ...uploaded]);
  };

  const handleRemoveFile = (url: string) => {
    onChange(value.filter((v) => v !== url));
  };

  return (
    <UploadContainer styles={styles}>
      <Group direction="row" gap="0.5rem" width="100%">
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          disabled={value.length >= maxFiles || isUploading}
          text={acceptImages ? "Upload images" : "Upload files"}
        />

        <TextInput
          id={name}
          name={name}
          value={value.length > 1 ? value.join(", ") : value[0]}
          placeholder="Enter the image URL"
          onChange={(e) => {
            onChange([e.target.value]);
          }}
          disabled={isUploading}
        />
      </Group>

      {showCount && (
        <UploadCount>
          Uploaded {value.length} of {maxFiles}
        </UploadCount>
      )}

      <FileInput
        id="file-upload"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple={maxFiles > 1}
        accept={acceptImages ? "image/*" : undefined}
        styles={css`
          display: none;
        `}
      />

      {(limitError || failedEntries.length > 0) && (
        <UploadError>
          {limitError && <p>{limitError}</p>}
          {failedEntries.map(([id, f]) => (
            <p key={id}>{f.message}</p>
          ))}
        </UploadError>
      )}

      <UploadFileList>
        {uploadingEntries.map(([id, f]) => (
          <UploadFileItem key={id}>
            <Group direction="row" align="center" gap="0.5rem">
              <UploadFileName>{f.name}</UploadFileName>
              <UploadFileProgress>{f.progress}%</UploadFileProgress>
            </Group>
          </UploadFileItem>
        ))}

        {value.map((url) => (
          <UploadFileItem key={url}>
            <Group direction="column" gap="0.5rem">
              {acceptImages && (
                <ImagePreview>
                  <Picture
                    src={url}
                    alt={filenameFromUrl(url)}
                    loading="lazy"
                  />
                </ImagePreview>
              )}

              <div>
                <UploadFileName>{filenameFromUrl(url)}</UploadFileName>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleRemoveFile(url)}
                  disabled={isUploading}
                  icon={<XIcon className="size-4" />}
                  text="Remove"
                />
              </div>
            </Group>
          </UploadFileItem>
        ))}
      </UploadFileList>
    </UploadContainer>
  );
}
