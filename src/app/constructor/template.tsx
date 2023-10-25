"use client";
import { ReactNode, useEffect, useState } from "react";
import { CodeSnippetPopup, Header } from "./components";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
  children: ReactNode;
}
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const Root = ({ children }: Props) => {
  const [publishPopup, setPublishPopup] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        id="App"
        className="hidden lg:grid h-screen [grid-auto-rows:auto_minmax(0,1fr)]"
      >
        <Header setPublishPopup={setPublishPopup} />
        {children}
      </div>

      <div
        id="MobileApp"
        className="lg:hidden grid place-content-center h-screen"
      >
        Coming soon on mobile devices...
      </div>

      {publishPopup && (
        <div className="fixed inset-0 z-20 grid place-content-center place-items-center max-w-full">
          <div
            onClick={() => setPublishPopup(false)}
            className="fixed inset-0 bg-black bg-opacity-50"
          />
          <CodeSnippetPopup />
        </div>
      )}
    </QueryClientProvider>
  );
};

export default Root;
