/*
  Warnings:

  - The primary key for the `Slot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Slot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DeferredCredit" DROP CONSTRAINT "DeferredCredit_slotId_fkey";

-- AlterTable
ALTER TABLE "DeferredCredit" ALTER COLUMN "slotId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Slot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Slot_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Slot_id_key" ON "Slot"("id");

-- AddForeignKey
ALTER TABLE "DeferredCredit" ADD CONSTRAINT "DeferredCredit_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
