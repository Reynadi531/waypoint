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
    window.location.href = "/";
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

type CheckSlugArg = {
  slug: string;
};

export const checkSlug = async ({ slug }: CheckSlugArg): Promise<any> => {
  const res = await fetch(`/api/url/check/${slug}`, {
    ...defaultFetchOption,
    credentials: "same-origin",
    method: "GET",
  });
  return res.json();
};

export type SaveUrlArg = {
  userId: string;
  url: string;
  slug: string;
};

export const saveUrl = async ({
  userId,
  url,
  slug,
}: SaveUrlArg): Promise<any> => {
  const res = await fetch(`/api/url/save/${userId}`, {
    ...defaultFetchOption,
    method: "PUT",
    credentials: "same-origin",
    body: JSON.stringify({ url, slug }),
  });
  return res.json();
};

export type DeleteUrlArg = {
  id: string;
  userId: string;
};

export const deleteUrl = async ({ id, userId }: DeleteUrlArg): Promise<any> => {
  const res = await fetch(`/api/url/delete/${id}`, {
    ...defaultFetchOption,
    method: "DELETE",
    credentials: "same-origin",
    body: JSON.stringify({ userId }),
  });
  return res.json();
};

export type PatchSlugArg = {
  id: string;
  slug: string;
  userId: string;
};

export const patchSlug = async ({
  id,
  slug,
  userId,
}: PatchSlugArg): Promise<any> => {
  const res = await fetch(`/api/url/patch/${id}`, {
    ...defaultFetchOption,
    method: "PATCH",
    credentials: "same-origin",
    body: JSON.stringify({ slug, userId }),
  });
  return res.json();
};

export type SetNewPasswordArg = {
  password: string;
  accessToken: string;
};

export const setNewPassword = async ({
  password,
  accessToken,
}: SetNewPasswordArg): Promise<any> => {
  const res = await fetch("/api/auth/set-new-password", {
    ...defaultFetchOption,
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({ password, accessToken }),
  });

  return res.json();
};
