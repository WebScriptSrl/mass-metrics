"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getStatus } from ".";

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

export const connectionsStats = async () => {
  const response = getStatus().then((data) => {
    for (const [key, value] of Object.entries(data.result.connected_nodes)) {
      // console.log(`${key}: ${value[0]} ${value[1]}`);

      if (value[1] === false) {
        console.log(`Node ${key} is in connection`);
      }
    }
  });
};
