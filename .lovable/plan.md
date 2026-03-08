

## Make Copy Button More Subtle

Replace the full-width outlined "Copy list to clipboard" button with a small icon-only button. On hover, show a tooltip saying "Copy list to clipboard" (or "Copied!" after clicking).

### Changes

**`src/components/CollectStage.tsx`**
- Replace the full-width `Button` with a small icon-only button (ghost variant) placed next to the month header or above the item list.
- Wrap it in a `Tooltip` from the existing radix tooltip components.
- Show `Copy` icon by default, `Check` icon briefly after copying.
- Position it inline with the month selector row (right-aligned) so it feels integrated, not like a separate action.

