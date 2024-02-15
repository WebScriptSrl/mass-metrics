/*
  Warnings:

  - The primary key for the `DeferredCredit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DeferredCredit` table. All the data in the column will be lost.
  - The primary key for the `DeferredCreditSlot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deferredId` on the `DeferredCreditSlot` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `DeferredCreditSlot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `DeferredCreditSlot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `DeferredCreditSlot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeferredCreditSlot" DROP CONSTRAINT "DeferredCreditSlot_deferredId_fkey";

-- DropIndex
DROP INDEX "DeferredCreditSlot_id_key";

-- AlterTable
ALTER TABLE "DeferredCredit" DROP CONSTRAINT "DeferredCredit_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "DeferredCredit_pkey" PRIMARY KEY ("address");

-- AlterTable
ALTER TABLE "DeferredCreditSlot" DROP CONSTRAINT "DeferredCreditSlot_pkey",
DROP COLUMN "deferredId",
DROP COLUMN "id",
ADD COLUMN     "address" TEXT NOT NULL,
ADD CONSTRAINT "DeferredCreditSlot_pkey" PRIMARY KEY ("address");

-- CreateIndex
CREATE UNIQUE INDEX "DeferredCreditSlot_address_key" ON "DeferredCreditSlot"("address");

-- AddForeignKey
ALTER TABLE "DeferredCreditSlot" ADD CONSTRAINT "DeferredCreditSlot_address_fkey" FOREIGN KEY ("address") REFERENCES "DeferredCredit"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
