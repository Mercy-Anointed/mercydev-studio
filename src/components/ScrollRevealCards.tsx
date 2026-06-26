"use client"

import { useEffect, useRef, type ReactNode } from 'react'

type ScrollRevealCardsProps = {
  children: ReactNode
  className?: string
  staggerMs?: number
  threshold?: number
  rootMargin?: string
}

export default function ScrollRevealCards({
  children,
  className,
  staggerMs = 90,
  threshold = 0.22,
  rootMargin = '0px 0px -8% 0px',
}: ScrollRevealCardsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal-card], [data-reveal-item]'))
    if (items.length === 0) return

    if (!('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const item = entry.target as HTMLElement
          item.classList.add('is-revealed')
          observer.unobserve(item)
        })
      },
      { threshold, rootMargin }
    )

    items.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${index * staggerMs}ms`)
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [rootMargin, staggerMs, threshold])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
