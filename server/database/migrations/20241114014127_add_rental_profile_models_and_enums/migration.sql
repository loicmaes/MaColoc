-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('man', 'woman', 'other');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('regularly', 'socially', 'never');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('permanent', 'fixedTerm', 'student', 'selfEmployed', 'unemployed');

-- CreateEnum
CREATE TYPE "Diet" AS ENUM ('vegetarian', 'vegan', 'flexitarian', 'omnivore', 'carnivore');

-- CreateEnum
CREATE TYPE "DayMoment" AS ENUM ('day', 'evening', 'night', 'weekend');

-- CreateEnum
CREATE TYPE "HistoryStatus" AS ENUM ('new', 'experienced');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('french', 'english', 'german', 'italian', 'spanish', 'portuguese', 'russian', 'polish', 'indian', 'chinese', 'japanese', 'arabic', 'algerian');

-- AlterTable
ALTER TABLE "userInfo" ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender";

-- DropEnum
DROP TYPE "Animal";

-- CreateTable
CREATE TABLE "rentalProfiles" (
    "userUid" TEXT NOT NULL,
    "animals" BOOLEAN NOT NULL,
    "smoker" "Frequency" NOT NULL,
    "drinker" "Frequency" NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "jobStatus" "JobStatus" NOT NULL,
    "monthlyIncome" DECIMAL(65,30) NOT NULL,
    "diet" "Diet" NOT NULL,
    "availability" "DayMoment" NOT NULL,
    "driverLicense" BOOLEAN NOT NULL,
    "car" BOOLEAN NOT NULL,
    "motorcycle" BOOLEAN NOT NULL,
    "rentHistory" "HistoryStatus" NOT NULL,
    "languages" "Language"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rentalProfiles_pkey" PRIMARY KEY ("userUid")
);

-- AddForeignKey
ALTER TABLE "rentalProfiles" ADD CONSTRAINT "rentalProfiles_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
