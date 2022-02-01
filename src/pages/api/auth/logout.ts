import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "lib/helper/supabase";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await supabase.auth.signOut();
    res.statusCode = 200;
    res.json({
      success: true,
      ...response,
    });
  } catch (error) {
    res.statusCode = 500;
    res.json({
      success: false,
      error,
    });
  }
};
