-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Completed');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "scheduled" TIMESTAMP(3),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
