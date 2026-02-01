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
  stripTempPrefix,
  uploadToUploadcare,
} from "./FileUpload.util";

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
  const [uploading, setUploading] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setErrors([]);

    if (value.length + files.length > maxFiles) {
      setErrors([`You can only upload a maximum of ${maxFiles} files`]);
      return;
    }

    Array.from(files).forEach(async (file) => {
      if (file.size > maxFileSize) {
        setErrors((prev) => [
          ...prev,
          `${file.name} exceeds ${formatFileSize(maxFileSize)}`,
        ]);
        return;
      }

      if (acceptImages && !file.type.startsWith("image/")) {
        setErrors((prev) => [...prev, `${file.name} is not an image file`]);
        return;
      }

      const tempId = `temp-${Date.now()}-${file.name}`;
      setUploading((prev) => ({ ...prev, [tempId]: 0 }));

      try {
        const response = await uploadToUploadcare(file, (progress) => {
          setUploading((prev) => ({ ...prev, [tempId]: progress }));
        });

        const url = `https://31m9mhhbv2.ucarecd.net/${response.uuid}/${response.original_filename}`;

        setUploading((prev) => {
          const next = { ...prev };
          delete next[tempId];
          return next;
        });

        onChange([...value, url]);
      } catch {
        setErrors((prev) => [...prev, `Failed to upload ${file.name}`]);
        setUploading((prev) => {
          const next = { ...prev };
          delete next[tempId];
          return next;
        });
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
          disabled={
            value.length >= maxFiles || Object.keys(uploading).length > 0
          }
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

      {errors.length > 0 && (
        <UploadError>
          {errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </UploadError>
      )}

      <UploadFileList>
        {Object.entries(uploading).map(([id, progress]) => (
          <UploadFileItem key={id}>
            <Group direction="row" align="center" gap="0.5rem">
              <UploadFileName>{stripTempPrefix(id)}</UploadFileName>
              <UploadFileProgress>{progress}%</UploadFileProgress>
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
