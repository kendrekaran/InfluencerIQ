import Link from "next/link";
import { createClient } from "@/utils/supbase/server";
import { Button } from "@/components/ui/button";
import { PostCard } from "./recent-post-card";

interface Post {
  id: string;
  insta_username: string;
  created_at: string;
  category?: string;
  scrapped_data: {
    userInfo?: {
      profileImage?: string;
      fullName?: string;
    };
  };
  reponse?: {
    profileInfo?: {
      profilePic?: string;
      fullName?: string;
    };
    ratings?: {
      engagement?: {
        score?: string;
        dailyTrend?: string;
        percentage?: string;
      };
    };
    contentAnalysis?: {
      viewsAverage?: string;
      likesAverage?: string;
      commentsAverage?: string;
    };
  };
}

export async function RecentPosts() {
  const supabase = await createClient();
  
  // Fetch the most recent 4 posts
  const { data: posts, error } = await supabase
    .from("user_data")
    .select("id, insta_username, created_at, category, scrapped_data, reponse")
    .order("created_at", { ascending: false })
    .limit(8);
    
  if (error) {
    console.error("Error fetching recent posts:", error);
    return (
      <div className="py-8 text-center">
        <p className="text-zinc-400">Unable to load recent posts</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-zinc-400">No recent posts found</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 md:px-10 relative" id="recent-analyses">
      
      <div className="container mx-auto px-4 md:px-12 lg:px-24 mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl py-2 sm:py-4 font-medium md:text-4xl lg:text-5xl text-white mb-3">
              Recent Analyses
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-3xl">
              Check out the most recently analyzed Instagram profiles. Our AI has examined these accounts to provide detailed insights about their performance and engagement.
            </p>
          </div>
          
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {posts.map((post) => {
            const profileImage = 
              post.scrapped_data?.userInfo?.profileImage || 
              post.reponse?.profileInfo?.profilePic || 
              "https://i.pinimg.com/474x/0f/9c/fe/0f9cfeada1c8b4196a52a45c8e48f8cf.jpg";
              
            const createdAt = new Date(post.created_at);
            const formattedDate = createdAt.toLocaleDateString();
            const timeAgo = getTimeAgo(createdAt);
            
            // Extract engagement metrics
            const engagement = {
              score: post.reponse?.ratings?.engagement?.score,
              dailyTrend: post.reponse?.ratings?.engagement?.dailyTrend,
              percentage: post.reponse?.ratings?.engagement?.percentage,
              views: post.reponse?.contentAnalysis?.viewsAverage,
              likes: post.reponse?.contentAnalysis?.likesAverage,
              comments: post.reponse?.contentAnalysis?.commentsAverage
            };
            
            return (
              <PostCard
                key={post.id}
                id={post.id}
                username={post.insta_username}
                profileImage={profileImage}
                formattedDate={formattedDate}
                timeAgo={timeAgo}
                category={post.category}
                engagement={engagement}
              />
            );
          })}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:border-blue-500 hover:text-white hover:bg-blue-500/10"
            asChild
          >
            <Link href="/filter">
              View All Analyzed Profiles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Helper function to calculate time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffMins > 0) {
    return diffMins === 1 ? '1 minute ago' : `${diffMins} minutes ago`;
  } else {
    return 'Just now';
  }
} 