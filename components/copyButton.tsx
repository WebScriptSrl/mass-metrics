"use client";

import styles from "@/components/layout.module.css";

import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

import { copyToClipboard } from "@/lib/utils";

export default function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        copyToClipboard(text);
      }}
      className={styles.copyButton}
    >
      <ClipboardDocumentIcon className={styles.copyIcon} />
    </button>
  );
}
