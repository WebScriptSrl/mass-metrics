"use client";

import styles from "@/components/layout/main/main.module.css";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import PasteButton from "@/components/pasteButton";

export default function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const [value, setValue] = useState("");

  useEffect(() => {
    const search = document.querySelector(
      "input[name=search]"
    ) as HTMLInputElement;
    search.value = value;
  }, [value]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    if (pathname === "/") {
      push(`data/address?${params.toString()}`);
    } else {
      push(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <input
        key={searchParams?.get("q")}
        type="text"
        name="search"
        placeholder="Search a Massa address"
        autoComplete="off"
        className={styles.searchInput}
        onChange={(e) => setValue(e.target.value)}
      />

      {value && (
        <button type="submit" className={styles.searchButton}>
          <MagnifyingGlassIcon />
        </button>
      )}

      {!value && <PasteButton onPaste={(text) => setValue(text)} />}
    </form>
  );
}
