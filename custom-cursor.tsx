"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      const isClickable = target.closest('button, a, input, [role="button"], [tabindex]')
      setIsPointer(!!isClickable)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener("mousemove", updateCursor)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", updateCursor)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        className="fixed w-3 h-3 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          background: "linear-gradient(135deg, #ef4444, #f87171)",
          boxShadow: "0 0 12px rgba(239, 68, 68, 0.6)",
        }}
      />
      <div
        className="fixed w-5 h-5 rounded-full pointer-events-none z-[9998] transition-transform duration-200 ease-out border border-red-400/40"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
    </>
  )
}
