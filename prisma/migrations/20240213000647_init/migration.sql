/*
  Warnings:

  - You are about to drop the column `slotId` on the `DeferredCredit` table. All the data in the column will be lost.
  - You are about to drop the `Slot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `period` to the `DeferredCredit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thread` to the `DeferredCredit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeferredCredit" DROP CONSTRAINT "DeferredCredit_slotId_fkey";

-- AlterTable
ALTER TABLE "DeferredCredit" DROP COLUMN "slotId",
ADD COLUMN     "period" INTEGER NOT NULL,
ADD COLUMN     "thread" INTEGER NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Slot";
