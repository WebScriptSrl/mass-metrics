/*
  Warnings:

  - You are about to drop the `DeferredCreditData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Slot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `DeferredCredit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `DeferredCredit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thread` to the `DeferredCredit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeferredCreditData" DROP CONSTRAINT "DeferredCreditData_deferredId_fkey";

-- DropForeignKey
ALTER TABLE "DeferredCreditData" DROP CONSTRAINT "DeferredCreditData_slotId_fkey";

-- AlterTable
ALTER TABLE "DeferredCredit" ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "period" INTEGER NOT NULL,
ADD COLUMN     "thread" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DeferredCreditData";

-- DropTable
DROP TABLE "Slot";
