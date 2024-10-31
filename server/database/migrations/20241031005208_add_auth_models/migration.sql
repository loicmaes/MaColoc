-- CreateTable
CREATE TABLE "authSessions" (
    "token" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authSessions_pkey" PRIMARY KEY ("token","userUid")
);

-- AddForeignKey
ALTER TABLE "authSessions" ADD CONSTRAINT "authSessions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
