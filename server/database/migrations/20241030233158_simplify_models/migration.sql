/*
  Warnings:

  - You are about to drop the column `guarantor` on the `userInfo` table. All the data in the column will be lost.
  - You are about to drop the column `haveAnimal` on the `userInfo` table. All the data in the column will be lost.
  - You are about to drop the column `maritalStatus` on the `userInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userInfo" DROP COLUMN "guarantor",
DROP COLUMN "haveAnimal",
DROP COLUMN "maritalStatus";
