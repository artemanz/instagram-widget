import { PropsWithChildren } from "react";
import { Header } from "./components";
import { Popup } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Constructor"
}

const Constructor = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid h-screen [grid-auto-rows:auto_minmax(0,1fr)]">
      <Header />
      {children}
      {/* <Footer /> */}
      <Popup />
    </div>
  );
};

export default Constructor;
