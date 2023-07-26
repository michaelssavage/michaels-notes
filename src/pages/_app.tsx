import { AppProps } from "next/app";
import "../styles/styles.global.scss";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "components/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}
