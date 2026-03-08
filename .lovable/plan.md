

## Add Footer Branding

Add a simple footer at the bottom of the main container in `src/pages/Index.tsx` with the text "Kui™ 2026" styled as a subtle, muted caption.

### Changes

**`src/pages/Index.tsx`** — Add a `<footer>` element after `</main>`, inside the bordered container:
```tsx
<footer className="py-4 text-center">
  <p className="text-xs text-muted-foreground/60">Kui™ 2026</p>
</footer>
```

