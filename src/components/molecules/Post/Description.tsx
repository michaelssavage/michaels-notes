import { memo, useEffect, useRef, useState } from "react";
import { DescriptionText, DescriptionWrapper } from "./Post.styled";

interface IDesc {
	description: string;
	isExpanded: boolean;
}

export const Description = memo(({ description, isExpanded }: IDesc) => {
	const contentRef = useRef<HTMLParagraphElement>(null);
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setContentHeight(contentRef.current.scrollHeight);
		}
	}, []);

	return (
		<DescriptionWrapper isExpanded={isExpanded} contentHeight={contentHeight}>
			<DescriptionText ref={contentRef}>{description}</DescriptionText>
		</DescriptionWrapper>
	);
});
