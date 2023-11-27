export type TInstagramData = {
  name: string;
  username: string;
  profile_picture_url: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  media: {
    data: {
      id: string;
      caption: string;
      media_type: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO";
      media_url: string;
      permalink: string;
    }[];
  };
};
