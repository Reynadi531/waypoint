/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from "next";

import { setSessionToServer } from "./supabase";

export function sanitizeSlug(slug: string) {
  return slug.replace(/[^0-9a-zA-Z.-]/g, "");
}

export const sendError5xx = (res: NextApiResponse, error: Error): boolean => {
  res.statusCode = 500;
  res.json({
    success: false,
    data: null,
    error,
  });

  return false;
};

export const sendError401 = (res: NextApiResponse): boolean => {
  res.statusCode = 401;
  res.json({
    success: false,
    data: null,
    error: {
      message: "You have no authorization to perform this action",
    },
  });

  return false;
};

export const sendErrorSlugExist = (res: NextApiResponse): boolean => {
  res.statusCode = 400;
  res.json({
    success: false,
    data: null,
    error: {
      message: "The slug you are trying to save is exist",
    },
  });

  return false;
};

export const setStatusCode = (res: NextApiResponse, error?: any) => {
  if (error) {
    res.statusCode = 400;
  } else {
    res.statusCode = 200;
  }
};

export const COOKIE_AUTH_TOKEN = "sb:token";

export const LS_AUTH_TOKEN = "supabase.auth.token";
export const LS_FP_TOKEN = "ksana.in.fp-at";

export const CB_RECOVERY = "recovery";
export const CB_SIGNUP = "signup";

export const callbackHandler = async () => {
  if (typeof window !== "undefined") {
    const { hash } = window.location;
    if (hash) {
      const urlObj = new URL(`https://example.com?${hash.slice(1)}`);
      const type = urlObj.searchParams.get("type") || "";
      const accessToken = urlObj.searchParams.get("access_token") || "";

      if (type === CB_RECOVERY) {
        window.localStorage.setItem(LS_FP_TOKEN, accessToken);
        window.location.assign("/auth/set-new-password");
      } else if (type === CB_SIGNUP) {
        window.location.assign("/auth/login");
      } else if (accessToken) {
        // check again for session value. get token type & user
        await setSessionToServer("SIGNED_IN", {
          access_token: accessToken,
          token_type: "",
          user: null,
        });
        setTimeout(() => {
          window.location.assign("/auth/dashboard");
        }, 500);
      }
    }
  }
};
