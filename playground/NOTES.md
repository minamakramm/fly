# Accessibility & Component Architecture Notes

This document compares custom hand-written W3C ARIA implementations ([CustomModal](file:///e:/fly/playground/components/CustomModal.tsx), [CustomTabs](file:///e:/fly/playground/components/CustomTabs.tsx), [CustomDisclosure](file:///e:/fly/playground/components/CustomDisclosure.tsx)) against production-grade Radix UI / shadcn primitives (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`).

---

## 🔍 Concrete Architectural Gaps & Analysis

### 1. React Portal Mounting & Stacking Context Isolation
- **Custom Version**: Hand-written components render directly in place within the parent component's DOM hierarchy.
- **shadcn / Radix Primitive**: Uses `Dialog.Portal` to mount overlay and content elements directly at the root `document.body` level.
- **Impact**: In hand-written implementations, parent containers with `overflow: hidden`, `transform`, `filter`, or lower `z-index` stacking contexts will clip or obscure the modal overlay. Radix guarantees top-level rendering and isolation from parent CSS boundaries.

### 2. Body Scroll Locking & Layout Shift Prevention
- **Custom Version**: When the modal opens, the background page (`document.body`) remains scrollable, allowing users to scroll page content behind the backdrop and causing double-scrollbar confusion.
- **shadcn / Radix Primitive**: Automatically sets `document.body.style.overflow = "hidden"` upon modal mount and restores it on unmount. Crucially, Radix measures the browser's scrollbar width and injects compensatory `padding-right` on `body` to prevent "layout jitter" (page content shifting horizontally when the scrollbar disappears).

### 3. Focus Scope Guards & Dynamic DOM Mutation Handling
- **Custom Version**: Focus trap logic queries focusable elements inside the modal container when a keydown event occurs.
- **shadcn / Radix Primitive**: Uses a dedicated `FocusScope` wrapper with invisible focus guard sentinel elements (`<span data-radix-focus-guard tabIndex={0} />`) prepended and appended to the container.
- **Impact**: If modal content dynamically mounts or updates children (e.g., loading states, step forms), hand-written DOM querying can become desynchronized. Sentinel guards guarantee focus containment regardless of dynamic child re-renders.

### 4. Outside Pointer Interaction Management
- **Custom Version**: Listens for click events on the backdrop overlay.
- **shadcn / Radix Primitive**: Implements sophisticated pointer event tracking (`onPointerDownOutside`, `onInteractOutside`, `onDismiss`). It distinguishes between touch, mouse, and stylus pointer-down vs pointer-up sequences, preventing accidental closure when a user starts a text selection drag inside the modal and releases the mouse outside.

### 5. Tab Orientation & Activation Modes (`manual` vs `automatic`)
- **Custom Version**: Supports horizontal tab navigation with automatic selection on arrow key press (`ArrowRight`, `ArrowLeft`).
- **shadcn / Radix Primitive**: Supports `orientation="horizontal" | "vertical"` (remapping `ArrowUp`/`ArrowDown`), bidirectional RTL layout support (`dir="ltr" | "rtl"`), and `activationMode="manual"` (where arrow keys move focus across tab triggers without activating the tab panel until `Enter` or `Space` is pressed, critical for heavy data-fetching tab panels).

---

## 🛠️ TypeScript Strictness & Type Safety

- **No `any` Escapes**: All custom components enforce strict interface props:
  - `CustomModalProps`: Strongly typed `isOpen: boolean`, `onClose: () => void`, `title: string`, `description?: string`, `children: React.ReactNode`.
  - `CustomTabsProps`: Strongly typed `tabs: TabItem[]`, `defaultActiveId?: string`, `ariaLabel?: string`.
  - `CustomDisclosureProps`: Strongly typed `title: string`, `defaultExpanded?: boolean`, `children: React.ReactNode`.
