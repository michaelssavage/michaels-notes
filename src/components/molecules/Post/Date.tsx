import { memo, type ReactNode } from "react";
import { StyledDateText } from "./Post.styled";

export interface DateTextProps {
  isExternal?: string;
  isReview?: boolean;
  children: ReactNode;
}

export const DateText = memo(
  ({ isExternal, isReview, children }: DateTextProps) => {
    return (
      <StyledDateText isExternal={isExternal} isReview={isReview}>
        {children}
      </StyledDateText>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isExternal === nextProps.isExternal &&
      prevProps.isReview === nextProps.isReview &&
      prevProps.children === nextProps.children
    );
  },
);

DateText.displayName = "DateText";
