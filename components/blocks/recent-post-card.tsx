"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Users, 
  Heart,
  Eye 
} from "lucide-react";

interface PostCardProps {
  id: string;
  username: string;
  profileImage: string;
  formattedDate: string;
  timeAgo: string;
  engagement?: {
    score?: string;
    dailyTrend?: string;
    percentage?: string;
    views?: string;
    likes?: string;
    comments?: string;
  };
  category?: string;
}

// Array of engagement metrics with their icons and colors
const engagementMetrics = [
  { key: "score", label: "Score", icon: BarChart3, color: "text-blue-400" },
  {
    key: "dailyTrend",
    label: "Trend",
    icon: TrendingUp,
    color: "text-green-400",
  },
  {
    key: "percentage",
    label: "Engagement",
    icon: Users,
    color: "text-purple-400",
  },
  { key: "views", label: "Views", icon: Eye, color: "text-yellow-400" },
  { key: "likes", label: "Likes", icon: Heart, color: "text-red-400" },
];

export function PostCard({ 
  id, 
  username, 
  profileImage, 
  formattedDate,
  timeAgo,
  engagement,
  category
}: PostCardProps) {
  const [hoveredItem, setHoveredItem] = useState(false);

  // Function to determine trend icon
  const getTrendIcon = (trend: string) => {
    if (trend && (trend.includes("+") || trend.includes("up"))) {
      return <TrendingUp className="inline-block mr-1 h-4 w-4 text-green-400" />;
    } else if (trend && (trend.includes("-") || trend.includes("down"))) {
      return <TrendingDown className="inline-block mr-1 h-4 w-4 text-red-400" />;
    }
    return <TrendingUp className="inline-block mr-1 h-4 w-4 text-blue-400" />;
  };

  return (
    <Link 
      href={`/analysis/${username}`} 
      className="group block"
      onMouseEnter={() => setHoveredItem(true)}
      onMouseLeave={() => setHoveredItem(false)}
    >
      <div
        className={`relative overflow-hidden rounded-xl aspect-[4/5] border border-zinc-700 
        transition-all duration-300
        ${
          hoveredItem
            ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
            : "group-hover:border-blue-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        }`}
      >
        {/* Profile Image */}
        <Image
          src={profileImage}
          alt={username}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-transform duration-500 
          ${
            hoveredItem
              ? "scale-110"
              : "group-hover:scale-105"
          }`}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        {/* Username Badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md border border-zinc-700">
          <span className="text-sm font-medium text-white">@{username}</span>
        </div>

        {/* Creator Name */}
        <div className="absolute bottom-0 w-full p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-zinc-400 mb-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          {category && (
            <div className="inline-block bg-zinc-800/80 text-zinc-300 text-xs px-2 py-0.5 rounded mb-1">
              {category}
            </div>
          )}
        </div>

        {/* Enhanced Engagement Metrics on Hover */}
        {engagement && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center bg-black/80 
            transition-all duration-500 backdrop-blur-sm
            ${
              hoveredItem
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-full max-w-[85%] space-y-3 p-4 rounded-lg bg-zinc-900/80 border border-zinc-700 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
              <h4 className="text-white font-bold text-center mb-2 border-b border-zinc-700 pb-2">
                Engagement Metrics
              </h4>
              <div className="space-y-2">
                {engagementMetrics.map((metric) => {
                  const value = engagement[metric.key as keyof typeof engagement];
                  if (!value) return null;

                  return (
                    <div
                      key={metric.key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <metric.icon
                          className={`h-4 w-4 mr-2 ${metric.color}`}
                        />
                        <span className="text-zinc-300 text-sm">
                          {metric.label}:
                        </span>
                      </div>
                      <span
                        className={`font-medium text-sm ${metric.color}`}
                      >
                        {metric.key === "dailyTrend" ? (
                          <span className="flex items-center">
                            {getTrendIcon(value.toString())}
                            {value === "null" ? "N/A" : value}
                          </span>
                        ) : value === "null" ? (
                          "N/A"
                        ) : (
                          value
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-4 w-full flex justify-center">
              <span className="text-xs text-blue-300 animate-pulse">
                Click to view profile
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
} 