"use client"
import { Button } from "@/components/ui/button"
import { Play, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"

type Episode = {
  trackId: string
  trackName: string
  description?: string
  trackTimeMillis?: number
  releaseDate?: string
  artworkUrl100?: string
  artworkUrl60?: string
}

type Podcast = {
  collectionId: string
  collectionName: string
  artistName: string
  artworkUrl100?: string
  artworkUrl60?: string
  episodes: Episode[]
}

type EpisodesGridProps = {
  podcasts: Podcast[]
  loading: boolean
}

function millisToDuration(millis?: number): string {
  if (!millis) return ""
  const totalSeconds = Math.floor(millis / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

export default function EpisodesGrid({ podcasts, loading }: EpisodesGridProps) {
  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold">All Episodes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-800 rounded-lg p-3 md:p-4 flex gap-3 items-start">
              <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!podcasts.length) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold">All Episodes</h2>
        </div>
        <div className="text-slate-400 text-sm py-8 text-center">No episodes found.</div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg lg:text-xl font-semibold">All Episodes</h2>
      </div>
      <div className="space-y-6">
        {podcasts.map((podcast) => (
          <div key={podcast.collectionId} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-lg">
                <Image
                  src={podcast.artworkUrl100 || podcast.artworkUrl60 || "/placeholder.svg"}
                  alt={podcast.collectionName}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm sm:text-base">{podcast.collectionName}</h3>
                <p className="text-slate-400 text-xs sm:text-sm">{podcast.artistName}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
              {podcast.episodes.map((episode) => (
                <div
                  key={episode.trackId}
                  className="bg-slate-800 rounded-lg p-3 md:p-4 hover:bg-slate-750 transition-colors cursor-pointer group flex gap-3 items-start min-h-0"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden rounded-lg">
                      <Image
                        src={episode.artworkUrl100 || episode.artworkUrl60 || podcast.artworkUrl100 || podcast.artworkUrl60 || "/placeholder.svg"}
                        alt={episode.trackName}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      size="sm"
                      className="absolute inset-0 m-auto w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current ml-0.5" />
                    </Button>
                  </div>
                  <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                    <h3 className="font-medium text-sm sm:text-base leading-tight line-clamp-2">
                      {episode.trackName}
                    </h3>
                    {episode.description && (
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 hidden sm:block">
                        {episode.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                      <div className="flex items-center gap-1 sm:gap-2 text-xs text-slate-500 min-w-0">
                        {episode.trackTimeMillis && (
                          <>
                            <span className="truncate">{millisToDuration(episode.trackTimeMillis)}</span>
                            <span>•</span>
                          </>
                        )}
                        <span className="truncate">{formatDate(episode.releaseDate)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 flex-shrink-0"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
