import { db } from "@/lib/firebase";
import { add } from "date-fns";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

let ACCESS_TOKEN = `EAASu7wQRZBeQBO8OOpjhvp8TaEIOfC9OBBhCWK86nygc0yTm7tSDGwltALjnraqZCYktAvdYEYKBi751K3ekW5UTrSua7wroZATZAjLFDbRxgWqW3Ma1YsyPpAlZC6RK8S3bdfRRwRNy7PpZAifdxZCGr4aMXRfEp733chlvk2YabH8HALZBSmXeJZCJVVtZAOhUx0ElIZAm3nSYwZDZD`;
const FIELDS =
  "{name,followers_count,follows_count,username,media_count,biography,profile_picture_url," +
  "media.limit(0){comments_count,caption,like_count,permalink,media_type,media_url,thumbnail_url,timestamp}}";

export const POST = async (req: Request) => {
  const { username, token } = await req.json();
  const PART_LINK = `17841458467361823?fields=business_discovery.username(${username})${FIELDS}`;
  const URL = `https://graph.facebook.com/${PART_LINK}&access_token=${ACCESS_TOKEN}`;

  const origin = req.headers.get("origin");

  if (!token) return Response.json(null, { status: 400 });

  if (origin !== process.env.NEXT_PUBLIC_DOMAIN) {
    try {
      const userRef = doc(db, "users", token);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) throw new Error("No user with this token.");

      const data = userSnap.data() as {
        views_remain: number;
        update_views_limit: Timestamp;
      };
      if (data.views_remain === 0) throw new Error("limit has been reached");

      const updateViewsLimit = data.update_views_limit.toDate();

      if (Date.now() - updateViewsLimit.getTime() >= 0)
        await updateDoc(userRef, {
          update_views_limit: Timestamp.fromDate(
            add(updateViewsLimit, { months: 1 })
          ),
          views_remain: 5000,
        });
      else
        await updateDoc(userRef, {
          views_remain: data.views_remain - 1 < 0 ? 0 : data.views_remain - 1,
        });
    } catch (error) {
      return Response.json(null, { status: 400 });
    }
  }

  try {
    const res = await fetch(URL);
    const data = await res.json();

    if (data.error) throw new Error(data.error.error_user_msg);
    return Response.json(data.business_discovery);
  } catch (error) {
    return Response.json(null, { status: 400 });
  }
};

export const GET = async () => {
  const data = fs.readFileSync(path.resolve("src/shared/widget.js"));

  if (!data) {
    return Response.json("Error reading JS file", {
      status: 500,
    });
  }

  return new Response(data, {
    headers: { "Content-Type": "text/javascript" },
  });
};
