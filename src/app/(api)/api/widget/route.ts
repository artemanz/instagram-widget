import fs from "fs";
import path from "path";

const ACCESS_TOKEN = `EAASu7wQRZBeQBOwvvBieH0HA72Tr8ZAgshwYmaTxPfNZCsVQAO6xTqxGDFgMqpHPZBCw4BNLF2PChkajyEcxTT8o62kZCUuxL9lam731F5in7h5uoQ9RmLZAB4TbgcznRwNbt1tQn4DYDhCOLO0gPdPiTZB8ZBAW8e5QnZCbDhxBF1GhHe8oQ0nCrfZAwesX6xWdBpcg8WNitcCQZDZD`;
const FIELDS =
  "{name,followers_count,follows_count,username,media_count,biography,profile_picture_url," +
  "media.limit(12){comments_count,caption,like_count,permalink,media_type,media_url}}";

export const POST = async (req: Request) => {
  const { username } = await req.json();
  const PART_LINK = `17841458467361823?fields=business_discovery.username(${username})${FIELDS}`;
  const URL = `https://graph.facebook.com/${PART_LINK}&access_token=${ACCESS_TOKEN}`;
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
