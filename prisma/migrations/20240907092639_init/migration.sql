/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContinueWatching` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Watchlist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `continueWatching` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `watchlist` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContinueWatching" DROP CONSTRAINT "ContinueWatching_contentId_fkey";

-- DropForeignKey
ALTER TABLE "ContinueWatching" DROP CONSTRAINT "ContinueWatching_userId_fkey";

-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_contentId_fkey";

-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "continueWatching" JSONB NOT NULL,
ADD COLUMN     "watchlist" JSONB NOT NULL;

-- DropTable
DROP TABLE "Content";

-- DropTable
DROP TABLE "ContinueWatching";

-- DropTable
DROP TABLE "Watchlist";

-- DropEnum
DROP TYPE "ContentType";
