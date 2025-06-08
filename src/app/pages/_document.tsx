import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Montserrat Font Link */}
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
            rel="stylesheet"
          />
          {/* Daily.co External Script */}
          <script
            src="https://unpkg.com/@daily-co/daily-js"
            crossOrigin="anonymous"
            async
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
