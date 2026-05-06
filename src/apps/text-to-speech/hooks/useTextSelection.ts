import { useEffect, useRef, useState, RefObject } from "react"

interface SelectionAnchor {
  x: number
  y: number
}

export function useTextSelection(textareaRef: RefObject<HTMLTextAreaElement | null>) {
  const [selection, setSelection] = useState<SelectionAnchor | null>(null)
  const mouseDownY = useRef(0)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    function onMouseDown(e: MouseEvent) {
      mouseDownY.current = e.clientY
    }

    function onMouseUp(e: MouseEvent) {
      // rAF lets the browser commit the selection before we read it
      requestAnimationFrame(() => {
        const el = textareaRef.current
        if (!el) return
        const { selectionStart: s, selectionEnd: e2 } = el
        if (s !== null && e2 !== null && s !== e2) {
          setSelection({
            x: e.clientX,
            y: Math.max(mouseDownY.current, e.clientY),
          })
        } else {
          setSelection(null)
        }
      })
    }

    // Dismiss when clicking outside both the textarea and the floating bar
    function onDocPointerDown(e: PointerEvent) {
      const target = e.target as Element
      const el = textareaRef.current
      if (!el) return
      if (target.closest("[data-floating-bar]")) return
      if (el.contains(target)) return
      setSelection(null)
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelection(null)
    }

    textarea.addEventListener("mousedown", onMouseDown)
    textarea.addEventListener("mouseup", onMouseUp)
    document.addEventListener("pointerdown", onDocPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      textarea.removeEventListener("mousedown", onMouseDown)
      textarea.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("pointerdown", onDocPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [textareaRef])

  return selection
}
