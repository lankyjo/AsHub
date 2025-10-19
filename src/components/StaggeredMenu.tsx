'use client'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export interface StaggeredMenuItem {
  label: string
  ariaLabel: string
  link: string
}

export interface StaggeredMenuSocialItem {
  label: string
  link: string
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right'
  colors?: string[]
  items?: StaggeredMenuItem[]
  socialItems?: StaggeredMenuSocialItem[]
  displaySocials?: boolean
  displayItemNumbering?: boolean
  menuButtonColor?: string
  openMenuButtonColor?: string
  accentColor?: string
  changeMenuColorOnOpen?: boolean
  onMenuOpen?: () => void
  onMenuClose?: () => void
}

// Separate toggle button component
export const StaggeredMenuToggle = React.forwardRef<
  HTMLButtonElement,
  {
    open: boolean
    onClick: () => void
    menuButtonColor: string
    openMenuButtonColor: string
    changeMenuColorOnOpen: boolean
  }
>(({ open, onClick, menuButtonColor, openMenuButtonColor, changeMenuColorOnOpen }, ref) => {
  const plusHRef = useRef<HTMLSpanElement | null>(null)
  const plusVRef = useRef<HTMLSpanElement | null>(null)
  const iconRef = useRef<HTMLSpanElement | null>(null)
  const textInnerRef = useRef<HTMLSpanElement | null>(null)

  const spinTweenRef = useRef<gsap.core.Timeline | null>(null)
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null)
  const colorTweenRef = useRef<gsap.core.Tween | null>(null)

  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close'])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const plusH = plusHRef.current
      const plusV = plusVRef.current
      const icon = iconRef.current
      const textInner = textInnerRef.current

      if (!plusH || !plusV || !icon || !textInner) return

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 })
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 })
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' })
      gsap.set(textInner, { yPercent: 0 })
    })
    return () => ctx.revert()
  }, [])

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current
    const h = plusHRef.current
    const v = plusVRef.current
    if (!icon || !h || !v) return

    spinTweenRef.current?.kill()

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' })
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0)
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0)
    }
  }, [])

  const animateColor = useCallback(
    (opening: boolean) => {
      if (!ref || typeof ref !== 'object' || !ref.current) return
      const btn = ref.current
      colorTweenRef.current?.kill()
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.set(btn, { color: menuButtonColor })
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen, ref],
  )

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current
    if (!inner) return

    textCycleAnimRef.current?.kill()

    const currentLabel = opening ? 'Menu' : 'Close'
    const targetLabel = opening ? 'Close' : 'Menu'
    const cycles = 3

    const seq: string[] = [currentLabel]
    let last = currentLabel
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu'
      seq.push(last)
    }
    if (last !== targetLabel) seq.push(targetLabel)
    seq.push(targetLabel)

    setTextLines(seq)
    gsap.set(inner, { yPercent: 0 })

    const lineCount = seq.length
    const finalShift = ((lineCount - 1) / lineCount) * 100

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out',
    })
  }, [])

  React.useEffect(() => {
    animateIcon(open)
    animateColor(open)
    animateText(open)
  }, [open, animateIcon, animateColor, animateText])

  React.useEffect(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = open ? openMenuButtonColor : menuButtonColor
        gsap.set(ref.current, { color: targetColor })
      } else {
        gsap.set(ref.current, { color: menuButtonColor })
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor, open, ref])

  return (
    <button
      ref={ref}
      className="sm-toggle relative z-1000 inline-flex items-center gap-3 bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible pointer-events-auto"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={onClick}
      type="button"
    >
      <span
        className="sm-toggle-textWrap text-foreground relative inline-block h-[1em] overflow-hidden whitespace-nowrap"
        aria-hidden="true"
      >
        <span
          ref={textInnerRef}
          className="sm-toggle-textInner text-white flex flex-col leading-none"
        >
          {textLines.map((l, i) => (
            <span className="sm-toggle-line block h-[1em] leading-none" key={i}>
              {l}
            </span>
          ))}
        </span>
      </span>

      <span
        ref={iconRef}
        className="sm-icon text-foreground relative w-[12px] h-[12px] shrink-0 inline-flex items-center justify-center [will-change:transform]"
        aria-hidden="true"
      >
        <span
          ref={plusHRef}
          className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
        />
        <span
          ref={plusVRef}
          className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
        />
      </span>
    </button>
  )
})

StaggeredMenuToggle.displayName = 'StaggeredMenuToggle'

// Separate menu panel component
export const StaggeredMenuPanel = React.forwardRef<
  HTMLDivElement,
  {
    open: boolean
    position: 'left' | 'right'
    colors: string[]
    items: StaggeredMenuItem[]
    socialItems: StaggeredMenuSocialItem[]
    displaySocials: boolean
    displayItemNumbering: boolean
    accentColor: string
    onItemClick?: () => void
  }
>(
  (
    {
      open,
      position,
      colors,
      items,
      socialItems,
      displaySocials,
      displayItemNumbering,
      accentColor,
      onItemClick,
    },
    ref,
  ) => {
    const panelRef = useRef<HTMLDivElement | null>(null)
    const preLayersRef = useRef<HTMLDivElement | null>(null)
    const preLayerElsRef = useRef<HTMLElement[]>([])

    const openTlRef = useRef<gsap.core.Timeline | null>(null)
    const closeTweenRef = useRef<gsap.core.Tween | null>(null)
    const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null)
    const busyRef = useRef(false)

    // Combine refs
    React.useImperativeHandle(ref, () => panelRef.current as HTMLDivElement)

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const panel = panelRef.current
        const preContainer = preLayersRef.current

        if (!panel) return

        let preLayers: HTMLElement[] = []
        if (preContainer) {
          preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[]
        }
        preLayerElsRef.current = preLayers

        const offscreen = position === 'left' ? -100 : 100
        gsap.set([panel, ...preLayers], { xPercent: offscreen, duration: 0 })
      })
      return () => ctx.revert()
    }, [position])

    const buildOpenTimeline = useCallback(() => {
      const panel = panelRef.current
      const layers = preLayerElsRef.current
      if (!panel) return null

      openTlRef.current?.kill()
      if (closeTweenRef.current) {
        closeTweenRef.current.kill()
        closeTweenRef.current = null
      }
      itemEntranceTweenRef.current?.kill()

      const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
      const numberEls = Array.from(
        panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'),
      ) as HTMLElement[]
      const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null
      const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[]

      const layerStates = layers.map((el) => ({
        el,
        start: Number(gsap.getProperty(el, 'xPercent')),
      }))
      const panelStart = Number(gsap.getProperty(panel, 'xPercent'))

      if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })
      if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 })
      if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
      if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })

      const tl = gsap.timeline({ paused: true })

      layerStates.forEach((ls, i) => {
        tl.fromTo(
          ls.el,
          { xPercent: ls.start },
          { xPercent: 0, duration: 0.5, ease: 'power4.out' },
          i * 0.07,
        )
      })

      const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0
      const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0)
      const panelDuration = 0.65

      tl.fromTo(
        panel,
        { xPercent: panelStart },
        { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
        panelInsertTime,
      )

      if (itemEls.length) {
        const itemsStartRatio = 0.15
        const itemsStart = panelInsertTime + panelDuration * itemsStartRatio

        tl.to(
          itemEls,
          {
            yPercent: 0,
            rotate: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: { each: 0.1, from: 'start' },
          },
          itemsStart,
        )

        if (numberEls.length) {
          tl.to(
            numberEls,
            {
              duration: 0.6,
              ease: 'power2.out',
              ['--sm-num-opacity' as any]: 1,
              stagger: { each: 0.08, from: 'start' },
            },
            itemsStart + 0.1,
          )
        }
      }

      if (socialTitle || socialLinks.length) {
        const socialsStart = panelInsertTime + panelDuration * 0.4

        if (socialTitle)
          tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart)
        if (socialLinks.length) {
          tl.to(
            socialLinks,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: 'power3.out',
              stagger: { each: 0.08, from: 'start' },
              onComplete: () => {
                gsap.set(socialLinks, { clearProps: 'opacity' })
              },
            },
            socialsStart + 0.04,
          )
        }
      }

      openTlRef.current = tl
      return tl
    }, [position])

    const playOpen = useCallback(() => {
      if (busyRef.current) return
      busyRef.current = true
      const tl = buildOpenTimeline()
      if (tl) {
        tl.eventCallback('onComplete', () => {
          busyRef.current = false
        })
        tl.play(0)
      } else {
        busyRef.current = false
      }
    }, [buildOpenTimeline])

    const playClose = useCallback(() => {
      openTlRef.current?.kill()
      openTlRef.current = null
      itemEntranceTweenRef.current?.kill()

      const panel = panelRef.current
      const layers = preLayerElsRef.current
      if (!panel) return

      const all: HTMLElement[] = [...layers, panel]
      closeTweenRef.current?.kill()

      const offscreen = position === 'left' ? -100 : 100

      closeTweenRef.current = gsap.to(all, {
        xPercent: offscreen,
        duration: 0.32,
        ease: 'power3.in',
        overwrite: 'auto',
        onComplete: () => {
          const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
          if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })

          const numberEls = Array.from(
            panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'),
          ) as HTMLElement[]
          if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 })

          const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null
          const socialLinks = Array.from(
            panel.querySelectorAll('.sm-socials-link'),
          ) as HTMLElement[]
          if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
          if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })

          busyRef.current = false
        },
      })
    }, [position])

    React.useEffect(() => {
      if (open) {
        playOpen()
      } else {
        playClose()
      }
    }, [open, playOpen, playClose])

    return (
      <div
        className="sm-scope z-50 fixed top-0 right-0 w-screen h-screen overflow-hidden pointer-events-none"
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c']
            let arr = [...raw]
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2)
              arr.splice(mid, 1)
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full"
                style={{ background: c }}
              />
            ))
          })()}
        </div>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel fixed top-0 right-0 h-dvh z-100000000000 bg-white flex flex-col p-[6em_2em_2em_2em] overflow-y-auto pointer-events-auto w-[min(100%,420px)]"
          style={{ WebkitBackdropFilter: 'blur(12px)' }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-none"
                    key={it.label + idx}
                  >
                    <Link
                      className="sm-panel-item relative text-black font-semibold text-4xl lg:text-5xl cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={(e) => {
                        onItemClick?.()
                      }}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative text-black font-semibold text-sm sm:text-2xl md:text-4xl lg:text-5xl cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto pt-8 flex flex-col gap-3"
                aria-label="Social links"
              >
                <h3
                  className="sm-socials-title m-0 text-base font-medium"
                  style={{ color: accentColor }}
                >
                  Socials
                </h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-[1.2rem] font-medium text-[#111] no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        <style>{`
.sm-scope { position: fixed; top: 0; right: 0; width: 100vw; height: 100vh; overflow: hidden; pointer-events: none; z-index: 50; visibility: hidden; }
.sm-scope[data-open] { visibility: visible; }
.sm-scope .sm-toggle { position: relative; z-index: 20; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; color: #e9e9ef; font-weight: 500; line-height: 1; overflow: visible; pointer-events: auto; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-toggle-textWrap { position: relative; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; }
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
.sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .staggered-menu-panel { position: fixed; top: 0; right: 0; width: min(100%, 420px);  background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto;  pointer-events: auto; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: fixed; top: 0; right: 0; bottom: 0; width: min(100%, 420px); pointer-events: none; z-index: 10000; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100dvh; width: 100%; }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-socials-link:focus-visible { outline: 2px solid #5227FF; outline-offset: 3px; }
.sm-socials-link { font-size: 1.2rem; font-weight: 500; color: #111; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }
.sm-socials-link:hover { color: #ff6b6b; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-panel-item { position: relative; color: #000; font-weight: 600; font-size: 4rem; cursor: pointer; line-height: 1; letter-spacing: -2px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: inline-block; text-decoration: none; padding-right: 1.4em; }
@media (min-width: 768px) {
  .sm-scope .sm-panel-item { font-size: 4rem; }
}
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: #ff6b6b; }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-size: 18px; font-weight: 400; color: #ff6b6b; letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
        `}</style>
      </div>
    )
  },
)

StaggeredMenuPanel.displayName = 'StaggeredMenuPanel'

// Main component that manages state and coordinates toggle + panel
export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#000',
  changeMenuColorOnOpen = true,
  accentColor = '#5227FF',
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  const handleToggle = useCallback(() => {
    setOpen((prev) => {
      const newState = !prev
      if (newState) {
        onMenuOpen?.()
      } else {
        onMenuClose?.()
      }
      return newState
    })
  }, [onMenuOpen, onMenuClose])

  const handleItemClick = useCallback(() => {
    setOpen(false)
    onMenuClose?.()
  }, [onMenuClose])

  return (
    <>
      <StaggeredMenuToggle
        ref={toggleRef}
        open={open}
        onClick={handleToggle}
        menuButtonColor={menuButtonColor}
        openMenuButtonColor={openMenuButtonColor}
        changeMenuColorOnOpen={changeMenuColorOnOpen}
      />
      <StaggeredMenuPanel
        open={open}
        position={position}
        colors={colors}
        items={items}
        socialItems={socialItems}
        displaySocials={displaySocials}
        displayItemNumbering={displayItemNumbering}
        accentColor={accentColor}
        onItemClick={handleItemClick}
      />
    </>
  )
}

export default StaggeredMenu
