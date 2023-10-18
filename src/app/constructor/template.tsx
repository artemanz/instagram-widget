"use client";
import { ReactNode } from "react";
import { Header } from "./components";

interface Props {
  children: ReactNode;
}

const Root = ({ children }: Props) => {
  return (
    <div id="App">
      <Header />
      {children}
    </div>
  );
};

export default Root;
