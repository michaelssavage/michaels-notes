import { Anchor } from "@/components/molecules/Anchor";
import { memo, useEffect, useRef, useState } from "react";
import { DescriptionText, DescriptionWrapper } from "./Post.styled";

interface IDesc {
	description: string;
	isExternal?: string;
	slug: string;
	isExpanded: boolean;
}

export const Description = memo(
	({ description, isExternal, slug, isExpanded }: IDesc) => {
		const contentRef = useRef<HTMLParagraphElement>(null);
		const [contentHeight, setContentHeight] = useState(0);

		useEffect(() => {
			if (contentRef.current) {
				setContentHeight(contentRef.current.scrollHeight);
			}
		}, []);

		return (
			<DescriptionWrapper isExpanded={isExpanded} contentHeight={contentHeight}>
				<DescriptionText ref={contentRef}>
					{description}{" "}
					{isExternal ? (
						<Anchor
							link={isExternal}
							variant="link"
							text="Read More"
							isExternal
						/>
					) : (
						<Anchor text="Read More" variant="link" link={slug} />
					)}
				</DescriptionText>
			</DescriptionWrapper>
		);
	},
);
