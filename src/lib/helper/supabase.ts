/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

import { defaultFetchOption } from "./fetcher";

const SUAPBASE_URL = String(process.env.SUPABASE_URL);
const SUPABASE_ANON_KEY = String(process.env.SUPABASE_ANON_KEY);

export const supabase = createClient(SUAPBASE_URL, SUPABASE_ANON_KEY);

export type LoginProps = {
  email: string;
  password: string;
};

export const setSessionToServer = async (
  event: AuthChangeEvent,
  session: Session | null
): Promise<void> => {
  fetch("/api/auth/set-session", {
    ...defaultFetchOption,
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  }).then((res) => res.json());
};

export const login = async ({ email, password }: LoginProps): Promise<any> => {
  const res = await fetch("/api/auth/login", {
    ...defaultFetchOption,
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const register = async ({
  email,
  password,
}: LoginProps): Promise<any> => {
  const res = await fetch("/api/auth/register", {
    ...defaultFetchOption,
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const logout = async (): Promise<void> => {
  await fetch("/api/auth/logout", {
    ...defaultFetchOption,
    method: "POST",
    credentials: "same-origin",
  }).then((res) => res.json());
};

export const handleLogout = async (): Promise<void> => {
  const session = supabase.auth.session();

  await logout();
  await setSessionToServer("SIGNED_OUT", session);

  setTimeout(() => {
    window.localStorage.removeItem("supabase.auth.token");
    window.location.assign("/");
  }, 500);
};

export const forgetPassword = async ({
  email,
}: {
  email: string;
}): Promise<any> => {
  const res = await fetch("/api/auth/forgot-password", {
    ...defaultFetchOption,
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({ email }),
  });

  return res.json();
};
