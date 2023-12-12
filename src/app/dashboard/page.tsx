import { Protect, Header } from "@/components";
import { Feed } from "./components/Feed";

const Page = () => {
  return (
    <Protect>
      <Header />

      <main>
        <div className="container pt-12 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Instagram Feed</h1>
          <Feed />
        </div>
      </main>
    </Protect>
  );
};

export default Page;
