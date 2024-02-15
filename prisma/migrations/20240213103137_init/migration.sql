/*
  Warnings:

  - The primary key for the `DeferredCredit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DeferredCreditData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `DeferredCreditData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `DeferredCredit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `DeferredCreditData` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `DeferredCredit` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `deferredId` to the `DeferredCreditData` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `DeferredCreditData` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "DeferredCreditData" DROP CONSTRAINT "DeferredCreditData_address_fkey";

-- DropIndex
DROP INDEX "DeferredCreditData_address_key";

-- AlterTable
ALTER TABLE "DeferredCredit" DROP CONSTRAINT "DeferredCredit_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DeferredCredit_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DeferredCreditData" DROP CONSTRAINT "DeferredCreditData_pkey",
DROP COLUMN "address",
ADD COLUMN     "deferredId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DeferredCreditData_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeferredCredit_id_key" ON "DeferredCredit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeferredCreditData_id_key" ON "DeferredCreditData"("id");

-- AddForeignKey
ALTER TABLE "DeferredCreditData" ADD CONSTRAINT "DeferredCreditData_deferredId_fkey" FOREIGN KEY ("deferredId") REFERENCES "DeferredCredit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
