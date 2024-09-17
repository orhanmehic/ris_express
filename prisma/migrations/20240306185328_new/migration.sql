/*
  Warnings:

  - You are about to drop the column `privacy` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `privacy`,
    ADD COLUMN `private` BOOLEAN NOT NULL DEFAULT true;
