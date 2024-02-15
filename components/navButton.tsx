"use client";

import styles from "@/components/layout.module.css";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function NavButton({
  href,
  from,
  text,
  address,
}: {
  href: string;
  from: string;
  text: string;
  address?: string;
}) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <button
      onClick={() => {
        const params = new URLSearchParams(searchParams);

        if (address) {
          params.set("q", address);
        } else {
          params.delete("q");
        }

        if (pathname === from) {
          push(`${href}?${params.toString()}`);
        } else {
          push(`${pathname}?${params.toString()}`);
        }
      }}
      className={styles.navButton}
    >
      {text}
    </button>
  );
}
