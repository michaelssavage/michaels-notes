import { Group } from "@/components/atoms/Group";
import { ArrowBackIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { useClickOutside } from "@/hooks/use-click-outside.hook";
import { animated, useTransition } from "@react-spring/web";
import { useHydrated } from "@tanstack/react-router";
import { useRef } from "react";
import { MenuContainer, Sidebar } from "./Menu.styled";

interface Picked {
  slug: string;
  title: string;
}

interface Props<T> {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: Array<T & Picked>;
  target: string;
}

export const Menu = <T extends object>({
  target,
  items,
  open,
  setOpen,
}: Props<T>) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  useClickOutside(menuRef, () => setOpen(false), open);

  const handleClick = () => setOpen(!open);

  const openMenu = () => !open && setOpen(true);

  const transitions = useTransition(hydrated && open, {
    from: { opacity: 0, transform: "translateY(-10px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-10px)" },
    config: { duration: 200 },
  });

  if (!hydrated) return null;

  return (
    <MenuContainer ref={menuRef} open={open} onClick={openMenu}>
      <Group direction="row" gap="0.5rem" align="center" onClick={handleClick}>
        <ArrowBackIcon />
        {open && <p>close</p>}
      </Group>

      {transitions(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <Sidebar>
                <Anchor
                  id="back-to-target"
                  text={`back to ${target}`}
                  link={`/${target}`}
                  variant="header"
                />
                {items.map(({ title, slug }) => {
                  return (
                    <li key={slug}>
                      <Anchor
                        text={title}
                        link={`/${target}/${slug}`}
                        variant="link"
                      />
                    </li>
                  );
                })}
              </Sidebar>
            </animated.div>
          ),
      )}
    </MenuContainer>
  );
};
