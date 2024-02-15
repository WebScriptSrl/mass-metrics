/*
  Warnings:

  - You are about to drop the `DeferredCreditSlot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeferredCreditSlot" DROP CONSTRAINT "DeferredCreditSlot_address_fkey";

-- DropTable
DROP TABLE "DeferredCreditSlot";

-- CreateTable
CREATE TABLE "DeferredCreditData" (
    "amount" TEXT NOT NULL,
    "slotId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "DeferredCreditData_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "period" INTEGER NOT NULL,
    "thread" INTEGER NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeferredCreditData_address_key" ON "DeferredCreditData"("address");

-- AddForeignKey
ALTER TABLE "DeferredCreditData" ADD CONSTRAINT "DeferredCreditData_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeferredCreditData" ADD CONSTRAINT "DeferredCreditData_address_fkey" FOREIGN KEY ("address") REFERENCES "DeferredCredit"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
