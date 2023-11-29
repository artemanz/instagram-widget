import { authStore } from "@/stores/auth";
import { widgetStore } from "@/stores/widget";
import { useStore } from "effector-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";

const CodeSnippet = () => {
  const {
    header,
    headerComponents: {
      followButton,
      followersCount,
      followingCount,
      fullName,
      postCount,
      profilePicture,
      username,
      verifiedBadge,
    },theme: {backgroundColor,textColor,transparentBackground}
  } = useStore(widgetStore);
  const { user } = useStore(authStore);
  const [copyMessage, setCopyMessage] = useState(false);

  const code = `<div id="instagram-widget-weblab"></div><script>window.WEBLAB_WIDGET_CONFIG={login:"${user?.instagramLogin}",header:${header},profile_picture:${profilePicture.checked},full_name:${fullName.checked},username:${username.checked},verifiedBadge:${verifiedBadge.checked},postCount:${postCount.checked},followersCount:${followersCount.checked},followingCount:${followingCount.checked},followButton:${followButton.checked},backgroundColor:${transparentBackground?"\"transparent\"":`\"${backgroundColor}\"`},color:"${textColor}"}</script><script src="${process.env.NEXT_PUBLIC_API}"></script>`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-base-100 rounded-2xl text-white relative max-w-3xl mx-4 w-[80vw]"
    >
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
