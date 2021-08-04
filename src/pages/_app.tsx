import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { BaseTheme } from "react-lifesg-design-system";

import "sgds-govtech/css/sgds.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={BaseTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
