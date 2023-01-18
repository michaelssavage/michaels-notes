interface LinkProps {
  url: string;
  name?: string;
  inline?: boolean;
}

export const ExternalLink = ({ url, name, inline }: LinkProps) => {
  return (
    <a
      className={inline ? "inlineLink" : "hoverLink"}
      data-replace={name ? name : url}
      href={`https://${url}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span>{name ? name : url}</span>
    </a>
  );
};
