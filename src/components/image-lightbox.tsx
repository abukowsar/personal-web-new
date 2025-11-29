"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface ImageLightboxProps {
  isOpen: boolean
  imageSrc: string
  imageAlt: string
  onClose: () => void
}

export default function ImageLightbox({ isOpen, imageSrc, imageAlt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full max-h-screen" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-50"
          aria-label="Close lightbox"
        >
          <X size={32} />
        </button>

        <img
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />

        <div className="text-center mt-4 text-white/80 text-sm">Click outside or press ESC to close</div>
      </div>
    </div>
  )
}
