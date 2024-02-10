"use client";

import styles from "@/components/layout.module.css";

import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

import { pasteFromClipboard } from "@/lib/utils";

export default function PasteButton({
  onPaste,
}: {
  onPaste: (text: string) => void;
}) {
  return (
    <button
      type="button"
      className={styles.pasteButton}
      onClick={async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onPaste(await pasteFromClipboard());
      }}
    >
      <ClipboardDocumentListIcon className={styles.pasteIcon} />
    </button>
  );
}
