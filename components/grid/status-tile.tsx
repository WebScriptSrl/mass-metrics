import styles from "@/components/grid/grid.module.css";

import { ErrorResponse, StatusResult } from "@/lib/data/types";
import { shortenAddress } from "@/lib/utils";
import CopyButton from "../copyButton";

// TO DO: implement user based node status
export async function StatusTile({
  active,
  response,
}: {
  active: boolean;
  response: StatusResult | ErrorResponse;
}) {
  const { MASSA_SPONSOR_ADDRESS } = process.env;

  const resError = response as ErrorResponse;
  const statusRes = response as StatusResult;

  if (!active) {
    return (
      <div className={styles.statusContainer}>{resError.error.message}</div>
    );
  }

  if (!statusRes.result) {
    return <div>Node must be down, or public port not opened</div>;
  }

  return (
    <div className={styles.statusContainer}>
      <p className={styles.ok}>Available soon for your node!!!</p>
      {/* Implement user based node info */}
      <p>
        Stay tuned! Follow us on{" "}
        <a
          href="https://twitter.com/Mass_Metrix"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ok}
        >
          X aka Twitter
        </a>{" "}
      </p>
      <h3>Node Status</h3>
      {statusRes && statusRes.result && (
        <>
          <p>
            Version:{" "}
            <span className={styles.info}>{statusRes?.result.version}</span>
          </p>
          <div className={styles.statusContainer}>
            <p>
              Connections:{" "}
              <span
                className={
                  statusRes?.result.network_stats.active_node_count < 1
                    ? styles.warning
                    : styles.info
                }
              >
                {" "}
                {statusRes?.result.network_stats.active_node_count}
              </span>
            </p>
            <p>
              In connections:{" "}
              <span
                className={
                  statusRes?.result.network_stats.in_connection_count < 1
                    ? styles.warning
                    : styles.info
                }
              >
                {statusRes?.result.network_stats.in_connection_count}
              </span>
            </p>
            <p>
              Out connections:{" "}
              <span
                className={
                  statusRes?.result.network_stats.out_connection_count < 1
                    ? styles.warning
                    : styles.info
                }
              >
                {statusRes?.result.network_stats.out_connection_count}
              </span>
            </p>
            <p>
              Known peers:{" "}
              <span className={styles.info}>
                {statusRes?.result.network_stats.known_peer_count}
              </span>
            </p>
            <p>
              Banned peers:{" "}
              <span className={styles.info}>
                {statusRes?.result.network_stats.banned_peer_count}
              </span>
            </p>
          </div>
        </>
      )}
      <h4 className={styles.info}>Support our development!</h4>
      {MASSA_SPONSOR_ADDRESS && (
        <div className={styles.code}>
          <p className={styles.warning}>
            Massa Address:{" "}
            <span className={styles.info}>
              {shortenAddress(MASSA_SPONSOR_ADDRESS)}{" "}
              <CopyButton text={MASSA_SPONSOR_ADDRESS} />
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
