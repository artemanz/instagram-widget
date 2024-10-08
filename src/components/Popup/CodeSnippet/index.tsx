import { authStore } from "@/stores/auth";
import { popupApi } from "@/stores/popup";
import { widgetStore } from "@/stores/widget";
import { useStore } from "effector-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineCopy, AiOutlineClose } from "react-icons/ai";

const CodeSnippet = () => {
  const {
    username,
    header,
    headerComponents: {
      followButton,
      followersCount,
      followingCount,
      fullName,
      postCount,
      profilePicture,
      username: profileUsername,
      verifiedBadge,
    },
    theme: { backgroundColor, textColor, transparentBackground },
  } = useStore(widgetStore);
  const { user } = useStore(authStore);
  const { setPopup } = popupApi;
  const [copyMessage, setCopyMessage] = useState(false);

  const code = `<div id="instagram-widget-weblab"></div><script>window.WEBLAB_WIDGET_CONFIG={token:"${
    user!.id
  }",login:"${username}",header:${header},profile_picture:${
    profilePicture.checked
  },full_name:${fullName.checked},username:${
    profileUsername.checked
  },verifiedBadge:${verifiedBadge.checked},postCount:${
    postCount.checked
  },followersCount:${followersCount.checked},followingCount:${
    followingCount.checked
  },followButton:${followButton.checked},backgroundColor:${
    transparentBackground ? '"transparent"' : `\"${backgroundColor}\"`
  },color:"${textColor}"}</script><script src="${
    process.env.NEXT_PUBLIC_API
  }"></script>`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-base-100 rounded-2xl text-white relative max-w-3xl mx-4 w-[80vw]"
    >
      <button onClick={() => setPopup(null)} className="absolute right-2 top-2">
        <AiOutlineClose size={20} />
      </button>
      <p>
        Copy and paste this code into desired place of your website (HTML
        editor, website template, theme, etc.).
      </p>
      <div className="relative">
        <pre className="mt-5 bg-base-200 p-4 pr-16 rounded-2xl ">
          <code className="overflow-x-scroll custom-scrollbar w-full block pb-2">
            {code}
          </code>
        </pre>
        <div className="absolute right-4 top-4">
          {copyMessage && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="badge badge-neutral absolute -top-8 -translate-x-1/2 left-1/2"
            >
              Copied!
            </motion.span>
          )}
          <button
            className="btn btn-success btn-sm text-lg p-0 aspect-square"
            onClick={() => {
              navigator.clipboard.writeText(code);
              setCopyMessage(true);
              setTimeout(() => setCopyMessage(false), 3000);
            }}
          >
            <AiOutlineCopy />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export { CodeSnippet };
