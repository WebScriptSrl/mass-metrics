import styles from "@/components/layout/main/main.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <a
          href="https://massa.net/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Massa website <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Massa blockchain.</p>
        </a>

        <a
          href="https://docs.massa.net/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Discover Massa <span>-&gt;</span>
          </h2>
          <p>Learn about Massa on chain web with&nbsp;tutorials!</p>
        </a>

        <a
          href="https://explorer.massa.net/mainnet"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Explorer <span>-&gt;</span>
          </h2>
          <p>Massa blockchain offical explorer.</p>
        </a>

        <a
          href="https://docs.massa.net/docs/node/home"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy a Node <span>-&gt;</span>
          </h2>
          <p>Learn how to deploy your Massa validator Node.</p>
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
