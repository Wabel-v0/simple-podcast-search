"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Sidebar from "@/components/home/Sidebar";
import TopNav from "@/components/home/TopNav";
import TrendingResults from "@/components/home/TrendingResults";
import EpisodesGrid from "@/components/home/EpisodesGrid";

type Episode = {
  trackId: string;
  trackName: string;
  releaseDate?: string;
  previewUrl?: string;
};

type ResultItem = {
  artworkUrl100?: string;
  artworkUrl60?: string;
  trackName?: string;
  collectionName?: string;
  collectionId?: string;
  artistName?: string;
  primaryGenreName?: string;
  description?: string;
  trackTimeMillis?: number;
  releaseDate?: string;
};

type Podcast = {
  collectionId: string;
  collectionName: string;
  artistName: string;
  artworkUrl100?: string;
  artworkUrl60?: string;
  episodes: Episode[];
};

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  // Fetch results from backend
  const fetchResults = async (term: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/search?term=" + encodeURIComponent(term));
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setResults(data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (results.length) {
      const podcastIds = results
        .filter((item: ResultItem) => item.collectionId)
        .map((item: ResultItem) => item.collectionId)
        .join(",");

      if (podcastIds) {
        setLoadingEpisodes(true);
        fetch(`/api/episodes?ids=${podcastIds}`)
          .then((res) => res.json())
          .then(
            (
              data: Array<{
                podcastTitle: string;
                artworkUrl: string;
                episodes: Episode[];
              }>
            ) => {
              // The backend returns an array of podcasts with episodes
              // Map this data to match the frontend structure
              const podcastsWithEpisodes: Podcast[] = data.map(
                (podcastData) => ({
                  collectionId:
                    results.find(
                      (r: ResultItem) =>
                        r.collectionName === podcastData.podcastTitle
                    )?.collectionId || "",
                  collectionName: podcastData.podcastTitle,
                  artistName:
                    results.find(
                      (r: ResultItem) =>
                        r.collectionName === podcastData.podcastTitle
                    )?.artistName || "",
                  artworkUrl100: podcastData.artworkUrl,
                  episodes: podcastData.episodes || [],
                })
              );
              setPodcasts(podcastsWithEpisodes);
            }
          )
          .catch((err: Error) => {
            console.error("Failed to fetch episodes:", err);
            setPodcasts([]);
          })
          .finally(() => {
            setLoadingEpisodes(false);
          });
      }
    }
  }, [results]);

  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setHasSearched(true);
      fetchResults(searchTerm.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <TopNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 md:ml-0 min-w-0">
          {!hasSearched ? (
            <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-slate-400 text-center px-4">
              <span className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                Search for podcasts, songs, or artists
              </span>
              <span className="text-sm">Type a term above and press Enter</span>
            </div>
          ) : (
            <TrendingResults
              results={results}
              loading={loading}
              error={error}
              searchTerm={searchTerm}
            />
          )}
          {/* <PersonalizedSection /> */}
          <EpisodesGrid podcasts={podcasts} loading={loadingEpisodes} />
        </main>
      </div>
    </div>
  );
}
