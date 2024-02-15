"use client";

import styles from "@/components/layout/main/main.module.css";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import PasteButton from "@/components/pasteButton";
import { constants } from "@/lib/data/constants";

export default function NodeSearch() {
  const { defaultPublicPort } = constants;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const ipForm = useRef<HTMLFormElement>(null);

  const [ipValue, setIpValue] = useState("");
  const [portValue, setPortValue] = useState(defaultPublicPort);

  useEffect(() => {
    const search = document.querySelector("input[name=ip]") as HTMLInputElement;
    const port = document.querySelector("input[name=port]") as HTMLInputElement;
    search.value = ipValue;
    port.value = portValue;
  }, [ipValue, portValue]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (ipValue) {
      params.set("ip", ipValue);
      params.set("port", portValue);
    } else {
      params.delete("ip");
      params.delete("port");
    }

    if (pathname === "/") {
      push(`data/address?${params.toString()}`);
    } else {
      push(`${pathname}?${params.toString()}`);
    }

    ipForm.current?.reset();
  }

  return (
    <>
      <form
        onSubmit={handleSearch}
        className={styles.searchIpForm}
        ref={ipForm}
      >
        <div className={styles.nodeInputContainer}>
          <input
            key={searchParams?.get("ip") || "ip"}
            type="text"
            name="ip"
            placeholder="Ip address"
            autoComplete="off"
            className={styles.searchIpInput}
            onChange={(e) => setIpValue(e.target.value)}
          />
          {!ipValue && <PasteButton onPaste={(text) => setIpValue(text)} />}
        </div>

        <div className={styles.nodeInputContainer}>
          <input
            key={searchParams?.get("port") || "port"}
            type="text"
            name="port"
            placeholder="Port"
            autoComplete="off"
            className={styles.searchPortInput}
            onChange={(e) => setPortValue(e.target.value)}
          />
          {!portValue && <PasteButton onPaste={(text) => setPortValue(text)} />}
        </div>

        {ipValue && portValue && (
          <button type="submit" className={styles.searchIpButton}>
            <MagnifyingGlassIcon />
          </button>
        )}
      </form>
      <span className={styles.infoSmall}>
        Default public port is <span>{defaultPublicPort}</span>
      </span>
    </>
  );
}
