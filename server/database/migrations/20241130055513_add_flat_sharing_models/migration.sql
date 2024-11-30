-- CreateTable
CREATE TABLE "postalAddresses" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "additional" TEXT,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "postalAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flatSharings" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flatSharings_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "flatSharingInvitations" (
    "userUid" TEXT NOT NULL,
    "flatSharingUid" TEXT NOT NULL,
    "emittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flatSharingInvitations_pkey" PRIMARY KEY ("userUid","flatSharingUid")
);

-- CreateTable
CREATE TABLE "flatSharingMembers" (
    "userUid" TEXT NOT NULL,
    "flatSharingUid" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flatSharingMembers_pkey" PRIMARY KEY ("userUid","flatSharingUid")
);

-- CreateIndex
CREATE UNIQUE INDEX "postalAddresses_street_additional_zipCode_city_country_key" ON "postalAddresses"("street", "additional", "zipCode", "city", "country");

-- CreateIndex
CREATE UNIQUE INDEX "flatSharingMembers_userUid_key" ON "flatSharingMembers"("userUid");

-- AddForeignKey
ALTER TABLE "flatSharings" ADD CONSTRAINT "flatSharings_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "postalAddresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flatSharingInvitations" ADD CONSTRAINT "flatSharingInvitations_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flatSharingInvitations" ADD CONSTRAINT "flatSharingInvitations_flatSharingUid_fkey" FOREIGN KEY ("flatSharingUid") REFERENCES "flatSharings"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flatSharingMembers" ADD CONSTRAINT "flatSharingMembers_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flatSharingMembers" ADD CONSTRAINT "flatSharingMembers_flatSharingUid_fkey" FOREIGN KEY ("flatSharingUid") REFERENCES "flatSharings"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
