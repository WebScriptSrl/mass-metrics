-- CreateTable
CREATE TABLE "DeferredCredit" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "slotId" INTEGER NOT NULL,

    CONSTRAINT "DeferredCredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "period" INTEGER NOT NULL,
    "thread" INTEGER NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeferredCredit" ADD CONSTRAINT "DeferredCredit_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
