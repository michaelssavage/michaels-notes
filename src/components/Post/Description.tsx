import { Anchor } from "@/components/Anchor";
import {
  DescriptionText,
  DescriptionWrapper,
} from "@/components/Post/Post.styled";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";

interface IDesc {
  isFirst: boolean;
  description: string;
  isExternal?: string;
  slug: string;
  isHovered: boolean;
}

const variants = {
  collapsed: { height: "1.4rem", opacity: 0.7 },
  expanded: { height: "auto", opacity: 1 },
};

export const Description = memo(
  ({ isFirst, description, isExternal, slug, isHovered }: IDesc) => {
    return (
      <DescriptionWrapper
        initial="collapsed"
        animate={isFirst || isHovered ? "expanded" : "collapsed"}
        variants={variants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          <DescriptionText>
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
        </AnimatePresence>
      </DescriptionWrapper>
    );
  }
);
