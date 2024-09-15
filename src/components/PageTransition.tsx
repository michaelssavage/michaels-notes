import { useLocation } from "@tanstack/react-router";
import { type ReactNode, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

interface Props {
  children: ReactNode;
}
export const PageTransition = ({ children }: Props) => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        classNames="page"
        timeout={100}
        unmountOnExit
      >
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};
