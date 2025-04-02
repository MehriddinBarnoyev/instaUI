"use client"

import  React from "react"
import { useState, useRef } from "react"
import { X, Image, ChevronLeft, Smile, Loader2 } from "lucide-react"
import { createPost } from "../lib/posts"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export default function CreatePostModal({ isOpen, onClose, userId }: CreatePostModalProps) {
  const [text, setText] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"upload" | "caption">("upload")
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size should be less than 10MB")
        return
      }

      setError(null)
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setStep("caption")
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!imageFile) return

    setIsLoading(true)
    setError(null)

    try {
      // Convert image to base64 for sending to API
      let imageBase64 = null
      if (imageFile) {
        const reader = new FileReader()
        imageBase64 = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(imageFile)
        })
      }

      // Use the createPost function from lib/posts.ts
      await createPost(userId, text, imageBase64 || undefined)

      // Reset form and close modal on success
      setText("")
      setImageFile(null)
      setImagePreview(null)
      setStep("upload")
      onClose()
    } catch (error) {
      console.error("Error creating post:", error)
      setError(error instanceof Error ? error.message : "Failed to create post")
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    setStep("upload")
    setImagePreview(null)
    setImageFile(null)
    setError(null)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#262626] rounded-xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-800 py-3 px-4 flex items-center justify-between">
          {step === "caption" && (
            <button onClick={goBack} className="text-white hover:text-gray-300 transition" aria-label="Go back">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <h2 className="text-white font-semibold text-center flex-1">Create new post</h2>

          {step === "caption" ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading || !imageFile}
              className="text-[#0095F6] font-semibold hover:text-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sharing..." : "Share"}
            </button>
          ) : (
            <button onClick={onClose} className="text-white hover:text-gray-300 transition" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Error message */}
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 text-sm">{error}</div>}

        {/* Content */}
        {step === "upload" ? (
          <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
            <div className="mb-6">
              <Image className="w-16 h-16 text-white mb-4" />
              <h3 className="text-white text-xl font-light text-center">Drag photos and videos here</h3>
            </div>

            <button
              onClick={triggerFileInput}
              className="bg-[#0095F6] hover:bg-blue-500 text-white px-4 py-1.5 rounded-md font-medium text-sm"
            >
              Select from computer
            </button>

            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Image preview */}
            <div className="w-full md:w-[60%] bg-black flex items-center justify-center">
              {isLoading ? (
                <div className="flex items-center justify-center h-[500px]">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              ) : (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-[500px] object-contain"
                />
              )}
            </div>

            {/* Caption form */}
            <div className="w-full md:w-[40%] border-l border-gray-800">
              {/* User info */}
              <div className="flex items-center gap-2 p-4 border-b border-gray-800">
                <img
                  src="https://ui-avatars.com/api/?name=User"
                  alt="profile"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <p className="text-white text-sm font-semibold">username</p>
              </div>

              {/* Caption textarea */}
              <div className="p-4 h-[200px]">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write a caption..."
                  className="w-full h-full bg-transparent text-white text-sm resize-none focus:outline-none"
                  disabled={isLoading}
                />
              </div>

              {/* Emoji picker */}
              <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                <button className="text-white" disabled={isLoading} aria-label="Add emoji">
                  <Smile className="w-5 h-5" />
                </button>
                <span className="text-gray-500 text-xs">{text.length}/2,200</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

