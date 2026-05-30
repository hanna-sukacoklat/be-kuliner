/*
  Warnings:

  - You are about to alter the column `number` on the `table` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `table` MODIFY `number` INTEGER NOT NULL;
