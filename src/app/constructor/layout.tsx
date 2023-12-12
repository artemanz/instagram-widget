import { PropsWithChildren } from "react";
import { Footer, Header } from "./components";
import { Popup, Protect } from "@/components";

const Constructor = ({ children }: PropsWithChildren) => {
  return (
    <Protect>
      <div className="grid h-screen [grid-auto-rows:auto_minmax(0,1fr)]">
        <Header />
        {children}
        <Footer />
      </div>
    </Protect>
  );
};

export default Constructor;
