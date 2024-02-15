"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function revalidateData(tag: string) {
  revalidateTag(tag);
  return { success: true };
}

export async function setCookie(name: string, value: string) {
  const cookieStore = cookies();

  return {
    success: true,
    cookie: cookieStore.set(name, value),
  };
}
