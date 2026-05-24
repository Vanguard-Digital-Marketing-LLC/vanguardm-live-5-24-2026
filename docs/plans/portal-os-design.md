# Portal-as-OS — design doc (prototype)

## Goal

Validate whether a desktop-OS metaphor for the client portal feels coherent before committing to a full redesign. Single opt-in route `/portal/desktop`; production portal untouched.

## Metaphor mapping

| OS concept | Portal concept |
|---|---|
| Desktop | Empty work area inside `/portal/desktop` |
| App | Existing portal surface (approvals, tickets, messages, etc.) |
| App icon | Button in the taskbar's launcher |
| Window | Movable container hosting an app surface |
| Taskbar | Bottom bar with launcher + open-window list |
| Focus | Topmost window receives input; others dim slightly |

## Window manager

State shape (held in `DesktopShell` via `useState`):

```ts
type WindowState = {
  id: string;          // generated on open
  appKey: AppKey;      // "approvals" | "tickets" | "messages"
  x: number; y: number;
  w: number; h: number;
  z: number;
  minimized: boolean;
};
```

- **Open** appends a new window with the next z-index. Multiple windows of the same app are allowed.
- **Focus** raises a window's z-index to `nextZ` and increments the counter.
- **Drag** updates `x`/`y` during pointer move; commits on pointer up.
- **Close** removes the window.
- **Minimize** flips `minimized`; minimized windows still render in the taskbar.

## Rendering

Each window's body is an `<iframe>` pointing to the corresponding existing portal route (`/portal/approvals`, `/portal/tickets`, `/portal/messages`). This:

- Reuses production data fetching, auth, and UI without duplication.
- Avoids re-implementing client/server boundaries inside the prototype.
- Slightly heavier per window than direct mount, but trivial for a prototype's window count (≤ 5 typical).

Trade-off accepted: iframes can't share JS state between windows. Fine for a proof-of-concept.

## Z-index strategy

- Base: 100.
- Windows occupy 100 + `z` (z is a monotonic counter, not a stack index).
- Taskbar: 1000.
- Drag preview: not needed (we move the actual window during drag).

## Focus model

- Pointer-down anywhere on a window → focuses it.
- Tab focus is not managed across windows (browser default).

## Mobile

Out of scope for prototype. Render a "desktop view requires a wider screen" message under 768px and link back to `/portal`.

## Persistence

Reset on each visit. No `localStorage`. Keeps the prototype simple.

## What this prototype validates

- Does the metaphor feel useful, or just a gimmick?
- Are clients more efficient with multiple surfaces visible simultaneously?
- What window operations get used (drag? minimize? multiple instances)?
- What apps want to live in a window vs. take over fullscreen?

## What it does not commit to

- The current portal shell is not changed.
- No production code paths read from desktop state.
- All 8 portal surfaces are not yet windowed — only approvals, tickets, messages. Add more once the metaphor is validated.

## Open questions to resolve before promoting beyond prototype

- Window persistence (localStorage? per-user DB row?).
- Mobile strategy — separate "card stack" UI, or punt to current portal forever?
- Cross-window data sharing (e.g., dragging a ticket from messages into approvals) — needs a real bus, not iframes.
- Dark/light theme — current portal is dark-only.
