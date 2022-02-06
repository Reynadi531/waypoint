/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "lib/helper/supabase";
import { sendError401, sendError5xx } from "lib/helper/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const { user } = await supabase.auth.api.getUserByCookie(req);

    const { data: dataUserId } = await supabase
      .from("urls")
      .select("user_id")
      .eq("id", id)
      .single();

    // @ts-ignore
    if (dataUserId && dataUserId.user_id) {
      // @ts-ignore
      if (dataUserId.user_id === user.id) {
        const { data, error } = await supabase
          .from("urls")
          .delete()
          .match({ id });

        if (error) {
          res.statusCode = 400;
        } else {
          res.statusCode = 200;
        }

        res.json({
          success: !error,
          data,
          error,
        });
      } else {
        sendError401(res);
      }
    } else {
      sendError401(res);
    }
  } catch (error: any) {
    sendError5xx(res, error);
  }
};
