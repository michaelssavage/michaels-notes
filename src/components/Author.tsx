import Image from "next/image";

export const Author = () => {
  const imageSize = 45;

  return (
    <div className="flex flex-row items-center space-x-3">
      <a target="_blank" rel="noreferrer noopened" href="www.github.com/michaelssavage">
        <Image width={imageSize} height={imageSize} src="/icon.png" alt="Michael" />

        <span>Michael Savage</span>
      </a>
    </div>
  );
};
