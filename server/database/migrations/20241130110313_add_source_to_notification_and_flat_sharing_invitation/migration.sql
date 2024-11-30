-- AlterTable
ALTER TABLE "flatSharingInvitations" ADD COLUMN     "sourceUid" TEXT;

-- AddForeignKey
ALTER TABLE "flatSharingInvitations" ADD CONSTRAINT "flatSharingInvitations_sourceUid_fkey" FOREIGN KEY ("sourceUid") REFERENCES "users"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
