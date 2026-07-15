"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Sheet — a reusable, accessible bottom-sheet / drawer primitive.
 *
 * Controlled or uncontrolled. Renders an overlay + panel that slides in from
 * the edge (`side="bottom" | "right"`). On mobile it behaves like a native
 * bottom-sheet/drawer; on desktop it can still be used the same way (center
 * the content via the consumer if a dialog look is preferred).
 *
 * Accessibility:
 *  - `role="dialog"` + `aria-modal` on the panel
 *  - Escape closes the sheet
 *  - Focus moves into the panel on open and is restored on close
 *  - Basic focus trap (Tab / Shift+Tab cycle within the panel)
 *  - Body scroll is locked while open
 *  - Respects `motion-reduce` (no transitions)
 *
 * API:
 *  <Sheet open onOpenChange>        // or uncontrolled with defaultOpen
 *    <SheetTrigger>…</SheetTrigger> // optional
 *    <SheetContent side="bottom">…</SheetContent>
 *  </Sheet>
 */

export type SheetSide = "bottom" | "right";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheetContext(): SheetContextValue {
  const ctx = React.useContext(SheetContext);
  if (!ctx) {
    throw new Error("Sheet components must be used within a <Sheet>.");
  }
  return ctx;
}

interface SheetProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change. */
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: SheetProps) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const value = React.useMemo<SheetContextValue>(
    () => ({ open, setOpen }),
    [open, setOpen],
  );

  return (
    <SheetContext.Provider value={value}>{children}</SheetContext.Provider>
  );
}

type SheetTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  SheetTriggerProps
>(({ className, onClick, children, type, ...props }, ref) => {
  const { open, setOpen } = useSheetContext();
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
      {...props}
    >
      {children}
    </button>
  );
});
SheetTrigger.displayName = "SheetTrigger";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which edge the panel slides in from. Defaults to "bottom". */
  side?: SheetSide;
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "bottom", className, children, ...props }, ref) => {
    const { open, setOpen } = useSheetContext();

    // Keep the node mounted long enough to play the exit transition.
    const [render, setRender] = React.useState(open);
    const [visible, setVisible] = React.useState(false);

    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const previouslyFocused = React.useRef<HTMLElement | null>(null);
    const hasOpened = React.useRef(false);

    React.useEffect(() => {
      if (open) {
        hasOpened.current = true;
        previouslyFocused.current =
          document.activeElement as HTMLElement | null;
        let innerRaf = 0;
        const raf = requestAnimationFrame(() => {
          setRender(true);
          innerRaf = requestAnimationFrame(() => setVisible(true));
        });
        return () => {
          cancelAnimationFrame(raf);
          cancelAnimationFrame(innerRaf);
        };
      }
      const hideRaf = requestAnimationFrame(() => setVisible(false));
      const timer = setTimeout(() => setRender(false), 300);
      return () => {
        cancelAnimationFrame(hideRaf);
        clearTimeout(timer);
      };
    }, [open]);

    // Lock body scroll while the sheet is mounted.
    React.useEffect(() => {
      if (!render) return;
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }, [render]);

    // Move focus into the panel once it is visible.
    React.useEffect(() => {
      if (render && visible) {
        panelRef.current?.focus();
      }
    }, [render, visible]);

    // Restore focus to the trigger on close.
    React.useEffect(() => {
      if (!render && hasOpened.current) {
        previouslyFocused.current?.focus?.();
        hasOpened.current = false;
        previouslyFocused.current = null;
      }
    }, [render]);

    if (!render) return null;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const sideClasses =
      side === "bottom"
        ? "inset-x-0 bottom-0 max-h-[90vh] rounded-t-2xl border-t"
        : "inset-y-0 right-0 h-full w-full max-w-sm border-l";

    const transformClasses =
      side === "bottom"
        ? visible
          ? "translate-y-0"
          : "translate-y-full"
        : visible
          ? "translate-x-0"
          : "translate-x-full";

    return (
      <div className="fixed inset-0 z-50" onKeyDown={handleKeyDown}>
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out motion-reduce:transition-none",
            visible ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
        <div
          ref={(node) => {
            panelRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          {...props}
          className={cn(
            "bg-background fixed overflow-y-auto shadow-2xl transition-transform duration-300 ease-out outline-none motion-reduce:transition-none",
            sideClasses,
            transformClasses,
            !visible && "pointer-events-none",
            className,
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);
SheetContent.displayName = "SheetContent";
