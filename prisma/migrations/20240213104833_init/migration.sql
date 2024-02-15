/*
  Warnings:

  - You are about to drop the column `amount` on the `DeferredCredit` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `DeferredCredit` table. All the data in the column will be lost.
  - You are about to drop the column `thread` on the `DeferredCredit` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "DeferredCredit_address_key";

-- AlterTable
ALTER TABLE "DeferredCredit" DROP COLUMN "amount",
DROP COLUMN "period",
DROP COLUMN "thread";

-- CreateTable
CREATE TABLE "CreditData" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "thread" INTEGER NOT NULL,
    "deferredCreditId" TEXT NOT NULL,

    CONSTRAINT "CreditData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CreditData_id_key" ON "CreditData"("id");

-- AddForeignKey
ALTER TABLE "CreditData" ADD CONSTRAINT "CreditData_deferredCreditId_fkey" FOREIGN KEY ("deferredCreditId") REFERENCES "DeferredCredit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
