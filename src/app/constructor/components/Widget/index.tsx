"use client";

import {
  AiOutlineDesktop,
  AiOutlineInstagram,
  AiOutlineMobile,
} from "react-icons/ai";
import { widgetApi, widgetStore } from "@/stores/widget";
import { useStore } from "effector-react";
import { HiVideoCamera, HiSquare2Stack } from "react-icons/hi2";
import { TInstagramData } from "../../@types";
import { useQuery } from "react-query";
import { authStore } from "@/stores/auth";
import { Loader } from "@/components/UI";

const Widget = () => {
  const { user } = useStore(authStore);
  const { pickView } = widgetApi;
  const { theme, view, header, headerComponents } = useStore(widgetStore);

  const { isLoading, error, data } = useQuery(
    "instagramData",
    () =>
      fetch(process.env.NEXT_PUBLIC_API!, {
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          username: user!.instagramLogin,
        }),
      }).then((res) => {
        return res.json();
      }),
    {
      select: (data) => {
        return data as TInstagramData;
      },
      enabled: !!user,
    }
  );

  if (isLoading) {
    return (
      <div className="grid place-content-center text-primary h-full">
        <Loader />
      </div>
    );
  }

  if (error || !data)
    return (
      <div className="grid place-content-center text-lg h-full">
        Error while downloading instagram data <br/>
      </div>
    );

  return (
    <div className="flex flex-col items-center py-4 overflow-y-auto custom-scrollbar">
      <div className="desktop:flex gap-4 mx-auto hidden">
        <button
          onClick={() => pickView("desktop")}
          className={` w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
            view === "desktop"
              ? "bg-secondary text-white"
              : "bg-neutral-200 hover:bg-neutral-300 text-neutral-500"
          }`}
        >
          <AiOutlineDesktop />
        </button>
        <button
          onClick={() => pickView("mobile")}
          className={` w-12 h-12 flex items-center justify-center rounded-lg  transition-colors ${
            view === "mobile"
              ? "bg-secondary text-white"
              : "bg-neutral-200 hover:bg-neutral-300 text-neutral-500"
          }`}
        >
          <AiOutlineMobile />
        </button>
      </div>
      <div
        style={{
          backgroundColor: theme.transparentBackground
            ? "transparent"
            : theme.backgroundColor,
          color: theme.textColor,
        }}
        className="desktop:mt-8 flex flex-col items-center max-w-fit mx-auto p-4 rounded-xl"
      >
        {/* HEADER */}
        {header && (
          <div
            className={`flex items-center gap-x-12 gap-y-4 py-4 flex-col ${
              view === "desktop" ? "desktop:flex-row" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              {headerComponents.profilePicture.checked && (
                <div className="p-0.5 rounded-full bg-gradient-primary overflow-hidden flex-shrink-0">
                  <img
                    className="rounded-full w-14"
                    src={data.profile_picture_url}
                    alt="Widget Logo"
                  />
                </div>
              )}
              <div className="flex items-start gap-1">
                <div>
                  {headerComponents.fullName.checked && (
                    <p className="text-lg font-bold leading-none">
                      {data.name}
                    </p>
                  )}
                  {headerComponents.username.checked && (
                    <small className="text-neutral-400">@{data.username}</small>
                  )}
                </div>
                {/* {headerComponents.verifiedBadge.checked && (
                  <RiVerifiedBadgeFill className="text-blue-500" />
                )} */}
              </div>
            </div>

            <ul className="flex gap-6">
              {headerComponents.postCount.checked && (
                <li className="text-center">
                  <p className="font-bold leading-none">{data.media_count}</p>
                  <small className="text-neutral-400">Posts</small>
                </li>
              )}
              {headerComponents.followersCount.checked && (
                <li className="text-center">
                  <p className="font-bold leading-none">
                    {data.followers_count}
                  </p>
                  <small className="text-neutral-400">Followers</small>
                </li>
              )}
              {headerComponents.followingCount.checked && (
                <li className="text-center">
                  <p className="font-bold leading-none">{data.follows_count}</p>
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
          className={`grid grid-cols-[minmax(0,300px)] justify-items-center ${
            view === "desktop" ? "desktop:grid-cols-3" : ""
          }`}
        >
          {data.media.data.slice(0, 9).map((post) => (
            <li
              key={post.id}
              className="relative transition-transform cursor-pointer w-52 aspect-square"
            >
              {post.media_type === "VIDEO" ? (
                <video className="w-full" loop src={post.media_url} />
              ) : (
                <img
                  className="w-full"
                  src={post.media_url}
                  alt={"Post image"}
                />
              )}
              {post.media_type === "VIDEO" && (
                <HiVideoCamera
                  className="absolute top-2 right-2 text-neutral-50"
                  size={24}
                />
              )}
              {post.media_type === "CAROUSEL_ALBUM" && (
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
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export { Widget };
