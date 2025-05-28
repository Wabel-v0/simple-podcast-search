"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"

type ResultItem = {
  artworkUrl100?: string
  artworkUrl60?: string
  trackName?: string
  collectionName?: string
  artistName?: string
  primaryGenreName?: string
}

type TrendingResultsProps = {
  results: unknown[]
  loading: boolean
  error: string
  searchTerm: string
}

// Helper to get higher quality image
function getHighResImage(url?: string): string | undefined {
  if (!url) return undefined
  return url.replace(/\/(\d{2,4})x\1bb\.jpg/, "/600x600bb.jpg")
}

export default function TrendingResults({ results, loading, error, searchTerm }: TrendingResultsProps) {
  return (
    <section className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-base md:text-lg lg:text-xl font-semibold truncate mr-2">
          {searchTerm ? `Results for "${searchTerm}"` : "Trending podcasts in all genres"}
        </h2>
        <Button variant="ghost" size="sm" className="text-slate-400 flex-shrink-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      {loading ? (
        <div className="text-slate-400 text-sm">Loading...</div>
      ) : error ? (
        <div className="text-red-400 text-sm">{error}</div>
      ) : (
        <div className="w-full overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 md:gap-4 pb-2 min-w-max">
              {results.length === 0 ? (
                <div className="text-slate-400 text-sm">No results found.</div>
              ) : (
                results.slice(0, 10).map((item, index) => {
                  const data = item as ResultItem
                  return (
                    <Card
                      key={index}
                      className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer flex-shrink-0 w-32 sm:w-36 md:w-44 lg:w-48"
                    >
                      <CardContent className="p-2 sm:p-3">
                        <div className="aspect-square mb-2 sm:mb-3 overflow-hidden rounded-md">
                          <Image
                            src={
                              getHighResImage(data.artworkUrl100) ||
                              getHighResImage(data.artworkUrl60) ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt={data.trackName || data.collectionName || ""}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                            quality={90}
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium text-xs sm:text-sm leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[2.8rem] text-white">
                            {data.trackName || data.collectionName || "Untitled"}
                          </h3>
                          <p className="text-slate-400 text-xs leading-tight line-clamp-1">
                            {data.artistName || data.primaryGenreName || ""}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
