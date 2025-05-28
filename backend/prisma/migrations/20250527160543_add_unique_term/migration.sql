/*
  Warnings:

  - A unique constraint covering the columns `[term]` on the table `SearchResult` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SearchResult_term_key" ON "SearchResult"("term");
