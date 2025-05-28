-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "trackId" INTEGER NOT NULL,
    "trackName" TEXT NOT NULL,
    "podcastTitle" TEXT NOT NULL,
    "artworkUrl" TEXT,
    "releaseDate" TEXT NOT NULL,
    "previewUrl" TEXT,
    "description" TEXT,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Episode_trackId_key" ON "Episode"("trackId");
