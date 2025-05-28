"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

type GenreGridProps = {
  genres: { name: string; color: string }[]
}

export default function GenreGrid({ genres }: GenreGridProps) {
  return (
    <section className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-base md:text-lg lg:text-xl font-semibold">Browse by genre</h2>
        <Button variant="ghost" size="sm" className="text-slate-400 flex-shrink-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {genres.map((genre, index) => (
          <Card
            key={index}
            className={`${genre.color} border-0 hover:opacity-80 transition-opacity cursor-pointer overflow-hidden`}
          >
            <CardContent className="p-3 sm:p-4 md:p-6 min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] flex items-center">
              <h3 className="font-medium text-white text-xs sm:text-sm md:text-base line-clamp-2 leading-tight">
                {genre.name}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
