import Image from "next/image";

export const NextImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className={"mdx-hero-image"}>
      <Image src={src} alt={alt} fill></Image>
    </div>
  );
};
