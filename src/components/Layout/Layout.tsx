import { Outlet } from "react-router-dom";
import { Affix, Button, Transition } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons";
import { useWindowScroll } from "@mantine/hooks";
import { Navbar } from "components/Layout";

export const Layout = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Navbar />
      <main style={{ margin: "0 10%" }}>
        <Outlet />
        <Affix position={{ bottom: 20, left: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftIcon={<IconArrowUp size={16} />}
                style={transitionStyles}
                // eslint-disable-next-line id-length
                onClick={() => scrollTo({ y: 0 })}
                compact
                radius="xl"
                className="infoBtn"
              >
                Scroll to top
              </Button>
            )}
          </Transition>
        </Affix>
      </main>
    </>
  );
};
