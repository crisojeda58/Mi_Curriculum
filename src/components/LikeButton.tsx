"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function LikeButton() {
  const [likes, setLikes] = useState<number>(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Check local storage
    const liked = localStorage.getItem("hasLiked") === "true"
    setHasLiked(liked)

    // Fetch initial likes
    fetchLikes()

    // Subscribe to changes for real-time updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'website_stats',
          filter: 'id=eq.global'
        },
        (payload) => {
          if (payload.new && typeof payload.new.likes === 'number') {
            setLikes(payload.new.likes)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchLikes = async () => {
    const { data, error } = await supabase
      .from('website_stats')
      .select('likes')
      .eq('id', 'global')
      .single()

    if (data) {
      setLikes(data.likes)
    }
    setIsLoading(false)
  }

  const handleLike = async () => {
    if (hasLiked) return

    // Optimistic update
    setLikes(prev => prev + 1)
    setHasLiked(true)
    localStorage.setItem("hasLiked", "true")

    const { error } = await supabase.rpc('increment_likes')

    if (error) {
      console.error('Error liking:', error)
      // Revert if error
      setLikes(prev => prev - 1)
      setHasLiked(false)
      localStorage.removeItem("hasLiked")
    }
  }

  if (isLoading) return null

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleLike}
      disabled={hasLiked}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg transition-colors duration-300 border",
        hasLiked 
          ? "bg-red-500 text-white border-red-600 cursor-default" 
          : "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 hover:bg-red-50 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800"
      )}
    >
      <Heart className={cn("h-5 w-5 transition-all", hasLiked && "fill-current scale-110")} />
      <span className="font-bold font-mono min-w-[1ch] text-center">{likes}</span>
      
      <AnimatePresence>
        {hasLiked && (
          <motion.span
            initial={{ y: 0, opacity: 1, scale: 0.5 }}
            animate={{ y: -30, opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-red-500 font-bold pointer-events-none text-lg"
          >
            +1
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
