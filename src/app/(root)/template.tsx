"use client";
import { ReactNode, useState } from "react";
import { Header } from "./components";
import { Loader } from "../components";
import { useLoading } from "../useLoading";
import { useInitialStores } from "@/stores/init";

interface Props {
  children: ReactNode;
}

const Root = ({ children }: Props) => {
  const [loading] = useLoading();

  useInitialStores();

  if (loading)
    return (
      <div id="App" className="grid place-content-center text-primary">
        <Loader />
      </div>
    );

  return (
    <div id="App">
      <Header />
      {children}
    </div>
  );
};

export default Root;
