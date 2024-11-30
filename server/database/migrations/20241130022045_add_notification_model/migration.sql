-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('email', 'push', 'both');

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "userUid" TEXT,
    "type" "NotificationType" NOT NULL,
    "template" TEXT,
    "subject" TEXT,
    "data" TEXT,
    "title" TEXT,
    "caption" TEXT,
    "link" TEXT,
    "thumbnail" TEXT,
    "emittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
