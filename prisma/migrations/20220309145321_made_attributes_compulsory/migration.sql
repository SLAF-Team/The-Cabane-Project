/*
  Warnings:

  - Made the column `description` on table `Cabane` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `Cabane` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cabane" DROP CONSTRAINT "Cabane_ownerId_fkey";

-- AlterTable
ALTER TABLE "Cabane" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Cabane" ADD CONSTRAINT "Cabane_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
