import Image from "next/image";
import {
  post1,
  post2,
  post3,
  post4,
  post5,
  post6,
  post7,
  post8,
  post9,
  widgetLogo,
} from "./images";
import { AiOutlineInstagram } from "react-icons/ai";
import { widgetStore } from "@/stores/widget";
import { useStore } from "effector-react";
import { HiVideoCamera, HiSquare2Stack } from "react-icons/hi2";
import { RiVerifiedBadgeFill } from "react-icons/ri";
interface Props {}

const postsGrid = [
  { id: 1, image: post1, type: "video" },
  { id: 2, image: post2, type: "collection" },
  { id: 3, image: post3, type: "video" },
  { id: 4, image: post4, type: "video" },
  { id: 5, image: post5, type: "video" },
  { id: 6, image: post6 },
  { id: 7, image: post7 },
  { id: 8, image: post8 },
  { id: 9, image: post9 },
];

const Widget = (props: Props) => {
  const { theme, view, header, headerComponents } = useStore(widgetStore);

  return (
    <div
      className={`mt-8 flex flex-col items-center max-w-fit mx-auto py-4 px-8 ${
        theme === "light_theme"
          ? "bg-white text-base-100"
          : theme === "dark_theme"
          ? "bg-base-100 text-white"
          : "bg-transparent"
      }`}
    >
      {/* HEADER */}
      {header && (
        <div
          className={`flex items-center gap-x-12 gap-y-4 py-4 ${
            view === "desktop" ? "flex-row" : "flex-col"
          }`}
        >
          <div className="flex items-center gap-4">
            {headerComponents.profilePicture.checked && (
              <div className="p-0.5 rounded-full bg-gradient-primary overflow-hidden">
                <Image
                  className="rounded-full"
                  src={widgetLogo.src}
                  width={50}
                  height={50}
                  alt="Widget Logo"
                />
              </div>
            )}
            <div className="flex items-start gap-1">
              <div>
                {headerComponents.fullName.checked && (
                  <p className="text-lg font-bold leading-none">WEBLAB 420</p>
                )}
                {headerComponents.username.checked && (
                  <small className="text-neutral-400">@weblab420</small>
                )}
              </div>
              {headerComponents.verifiedBadge.checked && (
                <RiVerifiedBadgeFill className="text-blue-500" />
              )}
            </div>
          </div>

          <ul className="flex gap-6">
            {headerComponents.postCount.checked && (
              <li className="text-center">
                <p className="font-bold leading-none">39</p>
                <small className="text-neutral-400">Posts</small>
              </li>
            )}
            {headerComponents.followersCount.checked && (
              <li className="text-center">
                <p className="font-bold leading-none">420</p>
                <small className="text-neutral-400">Followers</small>
              </li>
            )}
            {headerComponents.followingCount.checked && (
              <li className="text-center">
                <p className="font-bold leading-none">3</p>
                <small className="text-neutral-400">Following</small>
              </li>
            )}
          </ul>
          {headerComponents.followButton.checked && (
            <button className="flex gap-2 px-4 py-2 text-white transition-all rounded-md bg-sky-500 hover:bg-sky-600 active:bg-sky-600 active:scale-95">
              <AiOutlineInstagram size={24} />
              Follow
            </button>
          )}
        </div>
      )}

      <ul
        className={`grid  gap-2 ${
          view === "desktop" ? "grid-cols-3" : "grid-cols-1"
        }`}
      >
        {postsGrid.map((post) => (
          <li
            key={post.id}
            className="relative transition-transform cursor-pointer"
          >
            <img
              src={post.image.src}
              width={200}
              height={200}
              alt={"Post image"}
            />
            {post.type === "video" && (
              <HiVideoCamera
                className="absolute top-2 right-2 text-neutral-50"
                size={24}
              />
            )}
            {post.type === "collection" && (
              <HiSquare2Stack
                className="absolute rotate-180 top-2 right-2 text-neutral-50"
                size={24}
              />
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <button className="px-8 py-2 text-white transition-all rounded-md bg-sky-500 hover:bg-sky-600 active:bg-sky-600 active:scale-95">
          Load more
        </button>
      </div>
    </div>
  );
};

export { Widget };
