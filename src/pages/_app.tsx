import type { AppProps } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// Add proper type annotation and configuration
export default api.withTRPC(MyApp);