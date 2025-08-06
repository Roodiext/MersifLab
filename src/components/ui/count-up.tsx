"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  prefix?: string
  separator?: string
  decimals?: number
  className?: string
}

export function CountUp({
  end,
  start = 0,
  duration = 2000,
  suffix = "",
  prefix = "",
  separator = ",",
  decimals = 0,
  className = ""
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const countRef = useRef<HTMLSpanElement>(null)

  // Format number with separator
  const formatNumber = (num: number) => {
    const fixedNum = num.toFixed(decimals)
    const parts = fixedNum.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return parts.join('.')
  }

  // Intersection Observer untuk trigger animasi saat element terlihat
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  // Animasi counting
  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const startValue = start
    const endValue = end
    const totalChange = endValue - startValue

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (totalChange * easeOut)

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, start, end, duration])

  return (
    <span ref={countRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  )
}