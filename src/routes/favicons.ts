import { Options } from "../types/Options";

interface ResponseFavicon {
  id: number;
  data: string;
}

export interface FaviconsResponse {
  favicons: ResponseFavicon[];
}

export const favicons = async (options: Options): Promise<FaviconsResponse> => {
  const favicons = await options.getFavicons();
  const responseFavicons = favicons.map((favicon): ResponseFavicon => {
    return {
      id: favicon.id,
      data: favicon.data,
    };
  });

  return {
    favicons: responseFavicons,
  };
};
