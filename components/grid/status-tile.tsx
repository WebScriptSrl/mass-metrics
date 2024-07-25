import styles from "@/components/grid/grid.module.css";

import { ErrorResponse, StatusResult } from "@/lib/data/types";
import { shortenAddress } from "@/lib/utils";
import CopyButton from "../copyButton";
import NodeSearch from "../layout/main/node-search";

// TO DO: implement user based node status
export async function StatusTile({
  active,
  response,
  ip,
  port,
}: {
  active: boolean;
  response: StatusResult | ErrorResponse;
  ip?: string;
  port?: string;
}) {
  const { MASSA_SPONSOR_MNS } = process.env;

  const resError = response as ErrorResponse;
  const statusRes = response as StatusResult;

  if (!active) {
    return (
      <div className={styles.statusContainer}>{resError.error.message}</div>
    );
  }

  if (resError.error) {
    return (
      <div className={styles.statusContainer}>{resError.error.message}</div>
    );
  }

  if (!statusRes) {
    return <div>Node might be down, or public port not opened</div>;
  }

  return (
    <div className={styles.statusContainer}>
      <h3>Node Status</h3>
      <NodeSearch />
      {statusRes && statusRes.result && (
        <>
          <p>
            IP: <span>{ip}</span>
          </p>
          <p>
            Port: <span>{port}</span>
          </p>
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

      {MASSA_SPONSOR_MNS && (
        <div className={styles.code}>
          <p className={styles.warning}>
            🍵
            <span className={styles.info}>
              {MASSA_SPONSOR_MNS} <CopyButton text={MASSA_SPONSOR_MNS} />
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
