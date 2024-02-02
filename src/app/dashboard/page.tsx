import { Protect, Header, Footer } from "@/components";
import { Feed } from "./components/Feed";

const Page = () => {
  return (
    <Protect>
      <div className="grid [grid-auto-rows:auto_minmax(0,1fr)_auto] min-h-screen">
        <Header />

        <main>
          <div className="container py-12 flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Instagram Feed</h1>
            <Feed />
          </div>
        </main>

        <Footer />
      </div>
    </Protect>
  );
};

export default Page;
