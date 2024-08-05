import styles from "@/components/layout/main/main.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <a
          href="https://github.com/calyn05/next-auto-rolls.git"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Auto roll buy <span>-&gt;</span>
          </h2>
          <p>Auto roll buy app with dashboard.</p>
        </a>

        <a
          href="https://app.dusa.io/trade?ref=7s3w3p"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Dusa DEX <span>-&gt;</span>
          </h2>
          <p>First DEX on Massa blockchain&nbsp; - Start now!</p>
        </a>

        <a
          href="https://www.mexc.com/register?inviteCode=123Wwm"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            MEXC Exchange <span>-&gt;</span>
          </h2>
          <p>Trade Massa - $MAS on MEXC exchange.</p>
        </a>

        <a
          href="https://share.bitget.com/u/5VSDGH70"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            BitGet Exchange <span>-&gt;</span>
          </h2>
          <p>Trade Massa - $MAS on BitGet exchange.</p>
        </a>
      </div>
      <div>
        <p className={styles.copyRight}>
          &copy; {new Date().getFullYear()} MassMetriX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
