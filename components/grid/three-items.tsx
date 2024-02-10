import styles from "@/components/grid/grid.module.css";

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
import { redirect } from "next/navigation";

async function ThreeItemsGridItem({
  request,
  active,
  massaAddress,
  response,
}: {
  request: "stakers" | "addresses" | "status";
  active: boolean;
  massaAddress: string;
  response:
    | StakersResult
    | AddressesResult
    | StatusResult
    | ErrorResponse
    | null;
  className?: string;
}) {
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
      {request === "status" && (
        <StatusTile active={active} response={response as StatusResult} />
      )}
    </>
  );
}

export async function ThreeItemGrid({
  massaAddress,
}: {
  massaAddress: string;
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
    const statusResponse = await getStatus().then((response) => {
      if (response.result) {
        return response;
      }

      return null;
    });

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

          {massaAddress && statusResponse !== null && (
            <ThreeItemsGridItem
              request="status"
              active={true}
              massaAddress={massaAddress}
              // Node IP address
              // Node port
              response={statusResponse}
            />
          )}

          {massaAddress && statusResponse === null && (
            <ThreeItemsGridItem
              request="status"
              active={false}
              massaAddress={massaAddress}
              response={statusResponse}
            />
          )}
        </div>
      </section>
    );
  } catch (error: any) {
    console.error(error.message);

    redirect("/");
  }
}
