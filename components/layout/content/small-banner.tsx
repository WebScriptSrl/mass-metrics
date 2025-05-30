import styles from "@/components/layout/content/content.module.css";

import CopyButton from "@/components/copyButton";
import IconX from "@/components/icons/x-icon";
import FacebookIcon from "@/components/icons/facebook";
import InstagramIcon from "@/components/icons/instagram";

const { MASSA_SPONSOR_MNS } = process.env;

export function SmallBanner() {
  return (
    <div className={styles.smallBanner}>
      <div className={styles.code}>
        <p>V.0.2.3</p>
      </div>

      <div className={styles.code}>
        {MASSA_SPONSOR_MNS && (
          <span className={styles.code}>
            {MASSA_SPONSOR_MNS}
            <CopyButton text={MASSA_SPONSOR_MNS} />
          </span>
        )}
      </div>

      <div className={styles.socialMediaBox}>
        <a
          href="https://twitter.com/Mass_Metrix"
          aria-label="Twitter"
          target="_blank"
          rel="noreferrer"
        >
          <IconX
            style={{ height: 34, width: 34 }}
            bgColor="transparent"
            fgColor="rgba(var(--callout-border-rgb))"
            as="span"
          />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61555904470124"
          aria-label="Facebook"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookIcon
            style={{ height: 36, width: 36 }}
            bgColor="transparent"
            fgColor="rgba(var(--callout-border-rgb))"
            as="span"
          />
        </a>
        <a
          href="https://www.instagram.com/mass.metrix/"
          aria-label="Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon
            style={{ height: 36, width: 36 }}
            bgColor="transparent"
            fgColor="rgba(var(--callout-border-rgb))"
            as="span"
          />
        </a>
      </div>
    </div>
  );
}
