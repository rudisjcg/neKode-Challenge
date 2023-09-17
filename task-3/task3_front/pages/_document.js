import { Html, Head, Main, NextScript } from "next/document";

export const metadata = {
  title: "Canine Breeds",
  description: "Dogs World",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Canine Breeds</title>
        <link rel="icon" href="../public/logopage-no-background.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
