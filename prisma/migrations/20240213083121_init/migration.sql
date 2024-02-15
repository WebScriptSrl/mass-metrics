/*
  Warnings:

  - You are about to drop the column `amount` on the `DeferredCredit` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `DeferredCredit` table. All the data in the column will be lost.
  - You are about to drop the column `thread` on the `DeferredCredit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `DeferredCredit` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DeferredCredit" DROP COLUMN "amount",
DROP COLUMN "period",
DROP COLUMN "thread";

-- CreateTable
CREATE TABLE "DeferredCreditSlot" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "thread" INTEGER NOT NULL,
    "deferredId" INTEGER NOT NULL,

    CONSTRAINT "DeferredCreditSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeferredCreditSlot_id_key" ON "DeferredCreditSlot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeferredCredit_address_key" ON "DeferredCredit"("address");

-- AddForeignKey
ALTER TABLE "DeferredCreditSlot" ADD CONSTRAINT "DeferredCreditSlot_deferredId_fkey" FOREIGN KEY ("deferredId") REFERENCES "DeferredCredit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
