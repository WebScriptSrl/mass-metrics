import { PrismaClient } from "@prisma/client";

const { NODE_ENV, SEED_PATH, DEV_SEED_PATH } = process.env;

const isDev = NODE_ENV === "development";

const prisma = new PrismaClient();

// if we are in development, use the dev seed path
// otherwise use the production seed path

const seedPath = isDev ? DEV_SEED_PATH : (SEED_PATH as string);

const deferredCredits = async () => {
  if (!seedPath) {
    throw new Error("No seed path found");
  }
  return await import(seedPath)
    .then((m) => m.default)
    .catch((e) => console.error(e));
};

export async function main() {
  if (!seedPath) {
    throw new Error("No seed path found");
  }

  const deferredCreditsData = await deferredCredits().then((data) => {
    // get the data from the json file
    if (!data) {
      throw new Error("No data found");
    }
    const keys = Object.keys(data);
    const values = Object.values(data);

    return keys.map((key, index) => {
      return {
        address: key,
        deferredCredits: values[index] as Array<{
          slot: { period: number; thread: number };
          amount: string;
        }>,
      };
    });
  });

  if (!deferredCreditsData) {
    throw new Error("No data found");
  }

  for (const { address, deferredCredits } of deferredCreditsData) {
    for (const data of deferredCredits) {
      const amount = data.amount;
      const slot = data.slot;

      try {
        await prisma.deferredCredit.create({
          data: {
            address: address,
            creditData: {
              create: {
                amount: amount,
                period: slot.period,
                thread: slot.thread,
              },
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
