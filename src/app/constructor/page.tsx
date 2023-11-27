import { Widget } from "./components";
import { Sidebar } from "./components/Sidebars";

const Constructor = async () => {
  return (
    <main className="relative bg-white text-base-200 grid grid-rows-1 md:grid-cols-[24rem_auto] w-screen">
      <Sidebar />
      <Widget />
    </main>
  );
};

export default Constructor;
