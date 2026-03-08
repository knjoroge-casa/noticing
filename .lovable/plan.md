

## Add Timestamps to Gratitude Items

Show the date and time each item was added, formatted as `dd/mm/yy HH:mm` (e.g., `08/03/26 14:11`).

### Changes

**`src/components/CollectStage.tsx`**
- Next to each item's text (or below it), render the `createdAt` timestamp formatted as `dd/mm/yy HH:mm` using `date-fns` `format()`.
- Style it as small muted text so it doesn't compete with the item text.

**No store changes needed** — `createdAt` is already saved as an ISO string on every item.

