-- CreateEnum
CREATE TYPE "priorityEnum" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3),
    "priority" "priorityEnum" DEFAULT 'low',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
