import type { AppProps } from "next/app";

import "sgds-govtech/css/sgds.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
