/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "lib/helper/supabase";
import { sendError5xx } from "lib/helper/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.user_id;

    const { data, error } = await supabase
      .from("urls")
      .select("id,user_id,real_url,slug,hit,updated_at")
      .eq("user_id", userId)
      .order("id", { ascending: false });

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
  } catch (error: any) {
    sendError5xx(res, error);
  }
};
