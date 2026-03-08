

## Align All Elements to the Same Width

The blurb card has `max-w-sm` (~384px) while the outer container is `max-w-md` (~448px). The month selector and input field fill the outer `max-w-md` container, making them wider than the blurb card.

**Fix**: Remove `max-w-sm` from the blurb card (line 67) so it stretches to match the outer `max-w-md` container width, aligning all three elements.

**File**: `src/components/CollectStage.tsx` — one class change on the blurb `div`.

