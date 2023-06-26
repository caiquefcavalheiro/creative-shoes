/*
  Warnings:

  - The `quantity` column on the `OrderProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;
