 "use client"

import React from "react"

import { useState, useRef } from "react"
import { X, Image, Loader2 } from "lucide-react"

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
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text && !imageFile) return

    setIsLoading(true)

    try {
      // Convert image to base64 for sending to API
      let imageBase64: string | null = null
      if (imageFile) {
        const reader = new FileReader()
        imageBase64 = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(imageFile)
        })
      }

      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          image: imageBase64,
          user_id: userId,
        }),
      })

      if (response.ok) {
        // Reset form and close modal on success
        setText("")
        setImageFile(null)
        setImagePreview(null)
        onClose()
      } else {
        console.error("Failed to create post")
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-lg w-full overflow-hidden">
        <div className="border-b border-gray-800 py-3 px-4 flex items-center justify-between">
          <h2 className="text-white font-semibold text-center flex-1">Create new post</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-gray-800 text-white rounded-lg p-3 min-h-[100px] resize-none focus:outline-none focus:ring-1 focus:ring-gray-600"
            />
          </div>

          {imagePreview ? (
            <div className="relative mb-4">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-auto max-h-[300px] object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null)
                  setImagePreview(null)
                }}
                className="absolute top-2 right-2 bg-gray-900/80 p-1 rounded-full"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 mb-4 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition"
            >
              <Image className="w-10 h-10 text-gray-500 mb-2" />
              <p className="text-gray-400 text-sm">Click to upload an image</p>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || (!text && !imageFile)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                "Share"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

