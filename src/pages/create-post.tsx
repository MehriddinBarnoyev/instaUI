"use client"

import React, { useState, useRef, useEffect } from "react"
import { Image, ChevronLeft, Smile, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { createPost } from "../lib/posts"

export default function CreatePostPage() {
  const [text, setText] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"upload" | "caption">("upload")
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const userId = localStorage.getItem("userId") // Haqiqiy user ID bilan almashtiring

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Fayl hajmi 10MB dan kichik bo‘lishi kerak")
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!imageFile) {
      setError("Iltimos, rasm tanlang")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await createPost(userId, text, imageFile);
      navigate("/")
    } catch (error: any) {
      setError(error.message || "Post yaratishda xatolik")
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    if (step === "caption") {
      setStep("upload")
      setImagePreview(null)
      setImageFile(null)
      setError(null)
    } else {
      navigate(-1)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") goBack()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [step])

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <header className="border-b border-gray-800 py-3 px-4 flex items-center justify-between bg-[#121212]">
        <button onClick={goBack} className="text-white hover:text-gray-300 transition" aria-label="Orqaga">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-white font-semibold text-center flex-1">Yangi post yaratish</h2>
        {step === "caption" && (
          <button 
            onClick={() => handleSubmit()}
            disabled={isLoading || !imageFile}
            className="text-[#0095F6] font-semibold hover:text-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Yuklanmoqda..." : "Ulashish"}
          </button>
        )}
        {step === "upload" && <div className="w-5"></div>}
      </header>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 text-sm">
          {error}
        </div>
      )}
      
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-[#121212] md:rounded-md overflow-hidden">
          {step === "upload" ? (
            <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
              <div className="mb-6">
                <Image className="w-16 h-16 text-white mb-4" />
                <h3 className="text-white text-xl font-light text-center">Rasm va videolarni bu yerga sudrab keling</h3>
              </div>
              <button
                onClick={triggerFileInput}
                className="bg-[#0095F6] hover:bg-blue-500 text-white px-4 py-1.5 rounded-md font-medium text-sm"
              >
                Kompyuterdan tanlash
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*" // Barcha rasm turlari qo'llab-quvvatlanadi
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-[60%] bg-black flex items-center justify-center">
                {isLoading ? (
                  <div className="flex items-center justify-center h-[600px]">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                ) : (
                  <img 
                    src={imagePreview || "/placeholder.svg"} 
                    alt="Ko‘rinish" 
                    className="max-w-full max-h-[600px] object-contain"
                  />
                )}
              </div>
              <div className="w-full md:w-[40%] border-l border-gray-800">
                <div className="flex items-center gap-2 p-4 border-b border-gray-800">
                  <img
                    src="https://ui-avatars.com/api/?name=User"
                    alt="profil"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <p className="text-white text-sm font-semibold">foydalanuvchi</p>
                </div>
                <div className="p-4 h-[200px]">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Izoh yozing..."
                    className="w-full h-full bg-transparent text-white text-sm resize-none focus:outline-none"
                    disabled={isLoading}
                  />
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                  <button className="text-white" disabled={isLoading} aria-label="Smaylik qo‘shish">
                    <Smile className="w-5 h-5" />
                  </button>
                  <span className="text-gray-500 text-xs">{text.length}/2,200</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}