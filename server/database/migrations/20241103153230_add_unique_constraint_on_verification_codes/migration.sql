/*
  Warnings:

  - A unique constraint covering the columns `[userUid,code]` on the table `verificationCodes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "verificationCodes_userUid_code_key" ON "verificationCodes"("userUid", "code");
