

## Changes

**`src/components/CollectStage.tsx`** — two edits:

1. **Date format**: Change the copy format from `"MMM d, yyyy 'at' h:mm a"` to just `"MMM d, yyyy"` (line 58).

2. **Uniform icon buttons**: The Add button (line 134-140) is a filled `Button` with `bg-primary`, while the Copy button (line 90-95) is a plain `button` with muted styling. Make them match by styling the Add button the same way as the Copy icon — a minimal icon-only style with `p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors`. Both will be simple, subtle icon buttons sitting side by side or in their respective positions, creating visual consistency.

