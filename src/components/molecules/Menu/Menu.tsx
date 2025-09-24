import { ArrowBackIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { useTheme } from "@emotion/react";
import { animated, useTransition } from "@react-spring/web";
import { MenuContainer, PageLink, Sidebar } from "./Menu.styled";

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
  const { colors } = useTheme();

  const handleClick = () => {
    setOpen(!open);
  };

  const openMenu = () => {
    if (!open) setOpen(true);
  };

  const transitions = useTransition(open, {
    from: { opacity: 0, transform: "translateY(-10px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-10px)" },
    config: { duration: 200 },
  });

  return (
    <MenuContainer open={open} onClick={openMenu}>
      <ArrowBackIcon onClick={handleClick} />

      {transitions(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <PageLink to={`/${target}`} color={colors.link}>
                back to {target}
              </PageLink>

              <Sidebar>
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
