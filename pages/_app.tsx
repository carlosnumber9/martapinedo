// This default export is required in a new `pages/_app.js` file.
// importing the provided NextJS type
import type { AppProps as NextAppProps } from "next/app";

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

// use the new type like so, replacing 'CustomPageProps' with whatever you want
export default function App({ Component, pageProps }: AppProps<AppProps>) {
  return <Component {...pageProps} />;
}
