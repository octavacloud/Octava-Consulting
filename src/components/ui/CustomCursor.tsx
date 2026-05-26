'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Only show custom cursor on pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 4 + 'px'
        cursorRef.current.style.top = e.clientY - 4 + 'px'
      }
    }

    const animateRing = () => {
      const { x: mx, y: my } = mouseRef.current
      const ring = ringPosRef.current
      ring.x += (mx - ring.x - 18) * 0.12
      ring.y += (my - ring.y - 18) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.x + 'px'
        ringRef.current.style.top = ring.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animateRing)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    rafRef.current = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          background: '#fff',
          borderRadius: '50%',
          transform: isHovering ? 'scale(2.5)' : 'scale(1)',
          transition: 'transform 0.15s ease, opacity 0.2s ease',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: 36,
          height: 36,
          border: isHovering ? '1px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.35)',
          borderRadius: '50%',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          transition: 'border-color 0.3s ease, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />
    </>
  )
}
