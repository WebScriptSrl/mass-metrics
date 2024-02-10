import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ensureStartsWith, getMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

const baseUrl = process.env.PUBLIC_BASE_URL
  ? `https://${process.env.PUBLIC_BASE_URL}`
  : `http://localhost:3000`;

const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, "@")
  : undefined;

const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, "@")
  : undefined;

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getMetadata("rootLayout");

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: metadata.title.default,
      template: `%s | ${SITE_NAME}`,
    },
    robots: {
      follow: true,
      index: true,
    },
    description: metadata.description,
    authors: metadata.author,

    openGraph: {
      ...metadata.openGraph,
    },

    twitter: {
      ...metadata.twitter,
      ...(twitterCreator && { creator: twitterCreator }),
      ...(twitterSite && { site: twitterSite }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
