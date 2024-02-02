"use client";

import { feedApi, feedStore, removeWidgetFromDb } from "@/stores/feed";
import { popupApi } from "@/stores/popup";
import { widgetApi } from "@/stores/widget";
import { useStore } from "effector-react";
import { format } from "date-fns";
import {
  HiOutlineDotsHorizontal,
  HiOutlineCode,
  HiOutlineEyeOff,
  HiOutlineTrash,
} from "react-icons/hi";
import { useRouter } from "next/navigation";
import { PATH } from "@/common/path";
import { authStore, removeRefFromFeed } from "@/stores/auth";

const Feed = () => {
  const router = useRouter();
  const { reset, setWidgetData } = widgetApi;
  const { setPopup } = popupApi;

  const { user } = useStore(authStore);
  const { feed } = useStore(feedStore);
  const { removeWidget } = feedApi;

  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement | null;
    if (elem) elem?.blur();
  };

  const createWidget = () => {
    reset();
    setPopup("instagram_login");
  };

  return (
    <div className="mt-8">
      <div className="flex items-start justify-between flex-col-reverse md:items-center md:flex-row gap-4">
        <button
          onClick={createWidget}
          className="btn btn-primary capitalize text-lg w-full md:w-auto"
        >
          Create Widget
        </button>
        <div className="flex flex-col gap-2 md:self-end w-full md:w-auto">
          <div className="flex justify-between">
            <span>Views</span>
            <span className="font-bold">
              {5000 - user!.views_remain} / 5000
            </span>
          </div>

          <progress
            className="progress progress-success bg-neutral-content w-full md:w-56"
            value={5000 - user!.views_remain}
            max="5000"
          />

          <p>Reset {format(user!.update_views_limit, "d MMM, yyyy")}</p>
        </div>
      </div>
      <hr className="my-8" />

      {feed.length ? (
        <ul className="flex flex-col gap-4">
          {feed.map((w) => (
            <li
              className="border rounded-2xl p-4 md:p-8 flex justify-between"
              key={w.id}
            >
              <div className="flex flex-col gap-2 items-start">
                <p className="text-2xl font-bold md:text-3xl">{w.username}</p>
                <p className="text-secondary text-lg">
                  Created: {format(w.created, "MMM d, yyyy")}
                </p>
                <button
                  onClick={() => {
                    setWidgetData(w);
                    router.push(PATH.CONSTRUCTOR);
                  }}
                  className="btn w-20 mt-6"
                >
                  Edit
                </button>
              </div>

              <div>
                <div className="dropdown dropdown-end ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="hover:bg-gray-100 transition-colors rounded-lg p-1"
                  >
                    <HiOutlineDotsHorizontal size={32} />
                  </div>
                  <ul
                    tabIndex={0}
                    className="p-2 dropdown-content z-[1] shadow rounded-box w-60 mt-2 bg-white text-base-300 list-none flex flex-col overflow-hidden"
                  >
                    <li
                      onClick={() => {
                        closeDropdown();
                        setWidgetData(w);
                        setPopup("widget_code");
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer flex justify-between items-center"
                    >
                      Embed Code
                      <HiOutlineCode size={24} />
                    </li>
                    {/* <li
                      onClick={() => {
                        closeDropdown();
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer flex justify-between items-center"
                    >
                      Hide from Website <HiOutlineEyeOff size={24} />
                    </li> */}
                    <li className="p-2">
                      <hr />
                    </li>
                    <li
                      onClick={() => {
                        closeDropdown();
                        removeWidgetFromDb(w);
                        removeRefFromFeed({ userId: user!.id, widgetId: w.id });
                        removeWidget(w);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer flex justify-between items-center text-primary"
                    >
                      Delete Widget <HiOutlineTrash size={24} />
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400 text-center">
          Try to create new widget
        </div>
      )}
    </div>
  );
};

export { Feed };
