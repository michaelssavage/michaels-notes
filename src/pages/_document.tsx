import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ReactElement } from "react";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): ReactElement {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="application-name" content="Michael Savage Portfolio" />
          <meta
            name="description"
            content="Michael Savage Portfolio and personal Blog Site"
          />
          <link rel="icon" href="/icon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
