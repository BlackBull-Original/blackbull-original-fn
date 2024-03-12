import "@/styles/globals.css";
import "@/styles/color.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: true,
            retry: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // Get current URL using Next.js router
  const router = useRouter();
  const currentUrl = router.asPath;

  // Define an array of URLs where sidebar and footer won't be displayed
  const noSidebarFooterUrls = [
    "/login",
    "/signup",
    "/redirect",
    "/subscription-plan",
    "/",
    "/login/update-password",
    "/login/update-password?",
  ];

  const displaySidebarFooter = !noSidebarFooterUrls.includes(currentUrl);

  return (
    <QueryClientProvider client={queryClient}>
      {displaySidebarFooter ? (
        <>
          <Header />
          <div className="sticky top-0">
            <Sidebar />
          </div>
          <Component {...pageProps} />
          <div className="fixed bottom-0 w-full">
            <Footer />
          </div>
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </QueryClientProvider>
  );
}
