import type { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

interface YouTubePlayerProps {
	videoId: string;
	title?: string;
	styles?: SerializedStyles;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Player = ({
	videoId,
	title = "YouTube video player",
	styles,
}: YouTubePlayerProps) => {
	return (
		<Wrapper css={styles}>
			<Iframe
				src={`https://www.youtube.com/embed/${videoId}`}
				title={title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				referrerPolicy="strict-origin-when-cross-origin"
			/>
		</Wrapper>
	);
};
