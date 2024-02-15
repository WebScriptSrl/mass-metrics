import styles from "@/components/grid/grid.module.css";

import { Suspense } from "react";

import {
  StakersResult,
  AddressesResult,
  StatusResult,
  ErrorResponse,
} from "@/lib/data/types";
import { getAddresses, getStakers, getStatus } from "@/lib/data";
import { AddressesTile } from "./addresses-tile";
import { StakersTile } from "./stakers-tile";
import { StatusTile } from "./status-tile";
import NodeSearch from "../layout/main/node-search";
import { scrollToElement } from "@/lib/utils";

export const dynamic = "force dynamic";

async function ThreeItemsGridItem({
  request,
  active,
  massaAddress,
  response,
  ip,
  port,
}: {
  request: "stakers" | "addresses" | "status";
  active: boolean;
  massaAddress: string;
  response?:
    | StakersResult
    | AddressesResult
    | StatusResult
    | ErrorResponse
    | null;
  className?: string;
  ip?: string;
  port?: string;
}) {
  try {
    if (request === "status" && ip && port) {
      const statusResult = await getStatus({ ip, port }).then((response) => {
        if (response.result) {
          return response;
        }

        return null;
      });

      return (
        <Suspense fallback={<div>Loading...</div>}>
          <StatusTile
            active={active}
            response={statusResult as StatusResult | ErrorResponse}
            ip={ip}
            port={port}
          />
        </Suspense>
      );
    }
  } catch (error: any) {
    console.error(error.message);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.statusContainer}>
          <div className={styles.warning}>
            <h2>Node Status</h2>
            <h3>{error.message}</h3>
            <p>Check for valid IP and PORT</p>
            <p>Check if PORT is open</p>
            <p>Or your node might be down</p>
          </div>

          <h4>Check again</h4>
          <p className={styles.infoSmall}>
            Last search was <span>{`ip: '${ip}'`}</span> and{" "}
            <span>{`port: '${port}'`}</span>
          </p>
          <NodeSearch />
        </div>
      </Suspense>
    );
  }

  return (
    <>
      {request === "addresses" && (
        <AddressesTile
          active={active}
          response={response as AddressesResult | ErrorResponse}
        />
      )}
      {request === "stakers" && (
        <StakersTile
          active={active}
          address={massaAddress}
          response={response as StakersResult | ErrorResponse}
        />
      )}
    </>
  );
}

export async function ThreeItemGrid({
  massaAddress,
  ip,
  port,
}: {
  massaAddress: string;
  ip?: string;
  port?: string;
}) {
  try {
    const stakersResponse = await getStakers().then((response) => {
      if (response.result.length > 0) {
        return response;
      }

      return null;
    });

    const addressesResponse = await getAddresses([[massaAddress]]).then(
      (response) => {
        const resError = response as ErrorResponse;
        if (resError.error) {
          return resError;
        }

        return response;
      }
    );

    return (
      <section className={styles.mainSection}>
        {massaAddress && addressesResponse !== null && (
          <ThreeItemsGridItem
            request="addresses"
            active={true}
            massaAddress={massaAddress}
            response={addressesResponse}
          />
        )}

        {massaAddress && addressesResponse === null && (
          <ThreeItemsGridItem
            request="addresses"
            active={false}
            massaAddress={massaAddress}
            response={addressesResponse}
          />
        )}

        <div className={styles.twoTilesContainer}>
          {massaAddress && stakersResponse !== null && (
            <ThreeItemsGridItem
              request="stakers"
              active={true}
              massaAddress={massaAddress}
              response={stakersResponse}
            />
          )}

          {massaAddress && stakersResponse === null && (
            <ThreeItemsGridItem
              request="stakers"
              active={false}
              massaAddress={massaAddress}
              response={stakersResponse}
            />
          )}

          {massaAddress && !ip && (
            <div className={styles.nodeStatusContainer}>
              <h2>Node Status</h2>
              <div className={styles.center}>
                <div className={styles.center}>
                  <p>Set your node IP address and port</p>
                  <p>
                    Example IP:{" "}
                    <span className={styles.info}>11.22.123.123</span>
                  </p>
                  <p>
                    Example Port: <span className={styles.info}>33035</span>
                  </p>
                </div>
              </div>
              <NodeSearch />
            </div>
          )}

          {massaAddress && ip && (
            <div className={styles.nodeStatusContainer}>
              <ThreeItemsGridItem
                request="status"
                active={true}
                massaAddress={massaAddress}
                ip={ip}
                port={port}
              />
            </div>
          )}

          {massaAddress && ip === undefined && (
            <ThreeItemsGridItem
              request="status"
              active={false}
              massaAddress={massaAddress}
            />
          )}
        </div>
      </section>
    );
  } catch (error: any) {
    throw new Error("Error fetching data", error.message);
  }
}
