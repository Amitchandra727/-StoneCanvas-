"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Link as LinkIcon } from "lucide-react"

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const shareTitle = title || "Check out this amazing stone art from StoneCanvas!"
  const shareDescription = description || "Premium personalized stone art gifts for every occasion"

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(shareTitle)
    const encodedDescription = encodeURIComponent(shareDescription)

    let shareLink = ""

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case "copy":
        await navigator.clipboard.writeText(shareUrl)
        alert("Link copied to clipboard!")
        return
      default:
        return
    }

    window.open(shareLink, "_blank", "width=600,height=400")
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="h-5 w-5 text-amber-700" />
          <h3 className="font-semibold">Share this</h3>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleShare("facebook")}
            className="flex-1"
          >
            Facebook
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleShare("twitter")}
            className="flex-1"
          >
            Twitter
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleShare("linkedin")}
            className="flex-1"
          >
            LinkedIn
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleShare("copy")}
            className="flex-1"
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
