import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowLeft, Upload, Type, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getMonthItems,
  getMonthLabelFromKey,
  type GratitudeItem,
} from "@/lib/gratitudeStore";

interface Props {
  monthKey: string;
  onBack: () => void;
}

type FontOption = "sans" | "serif" | "handwritten";

const FONT_MAP: Record<FontOption, { label: string; family: string; className: string }> = {
  sans: { label: "Poppins", family: "Poppins", className: "font-sans-brand" },
  serif: { label: "Playfair", family: "Playfair Display", className: "font-display" },
  handwritten: { label: "Handwritten", family: "Indie Flower", className: "font-handwritten" },
};

const CANVAS_W = 1080;
const CANVAS_H = 1920;

const ComposeStage = ({ monthKey, onBack }: Props) => {
  const allItems = getMonthItems(monthKey);
  const monthLabel = getMonthLabelFromKey(monthKey);
  const [month, year] = monthLabel.split(" ");

  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(allItems.map((i) => i.id))
  );
  const [photo, setPhoto] = useState<string | null>(null);
  const [font, setFont] = useState<FontOption>("sans");
  const [textPos, setTextPos] = useState({ x: 0.05, y: 0.45 }); // relative position
  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedItems = allItems.filter((i) => selectedIds.has(i.id));
  const headerText = `${month} Gratitude`;

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const getRelativePos = useCallback(
    (clientX: number, clientY: number) => {
      if (!previewRef.current) return null;
      const rect = previewRef.current.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(0.9, (clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(0.9, (clientY - rect.top) / rect.height)),
      };
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const pos = getRelativePos(e.clientX, e.clientY);
    if (pos) setTextPos(pos);
  };

  const handlePointerUp = () => setIsDragging(false);

  const exportImage = useCallback(async () => {
    if (!photo) return;

    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    const ctx = canvas.getContext("2d")!;

    // Draw photo
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.src = photo;
    });

    // Cover fit
    const imgRatio = img.width / img.height;
    const canvasRatio = CANVAS_W / CANVAS_H;
    let sw = img.width, sh = img.height, sx = 0, sy = 0;
    if (imgRatio > canvasRatio) {
      sw = img.height * canvasRatio;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / canvasRatio;
      sy = (img.height - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, CANVAS_W, CANVAS_H);

    // Text settings
    const fontFamily = FONT_MAP[font].family;
    const x = textPos.x * CANVAS_W;
    const y = textPos.y * CANVAS_H;
    const lineHeight = font === "handwritten" ? 58 : 50;
    const headerSize = font === "handwritten" ? 64 : 52;
    const itemSize = font === "handwritten" ? 48 : 38;

    // Shadow for readability
    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = "white";

    // Header
    ctx.font = `bold ${headerSize}px '${fontFamily}', sans-serif`;
    ctx.fillText(headerText, x, y);

    // Items
    ctx.font = `${itemSize}px '${fontFamily}', sans-serif`;
    selectedItems.forEach((item, i) => {
      ctx.fillText(item.text, x, y + (i + 1.5) * lineHeight);
    });

    // Download
    const link = document.createElement("a");
    link.download = `gratitude-${monthKey}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [photo, font, textPos, selectedItems, monthKey, headerText]);

  const fontConfig = FONT_MAP[font];

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 pb-8">
      <div className="flex items-center w-full mb-4">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-display text-2xl font-bold text-foreground flex-1 text-center pr-5">
          Compose
        </h2>
      </div>

      {/* Photo upload */}
      {!photo ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full aspect-[9/16] rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 bg-card mb-6"
        >
          <Upload className="w-10 h-10 text-muted-foreground" />
          <span className="text-muted-foreground text-sm font-medium">
            Upload your photo
          </span>
        </button>
      ) : (
        /* Preview */
        <div
          ref={previewRef}
          className="w-full aspect-[9/16] rounded-xl overflow-hidden relative mb-4 cursor-move select-none touch-none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <img
            src={photo}
            alt="Background"
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div
            className="absolute"
            style={{
              left: `${textPos.x * 100}%`,
              top: `${textPos.y * 100}%`,
              maxWidth: "90%",
            }}
            onPointerDown={handlePointerDown}
          >
            <p
              className={`text-lg font-bold leading-tight ${fontConfig.className}`}
              style={{
                color: "white",
                textShadow: "1px 1px 8px rgba(0,0,0,0.7)",
              }}
            >
              {headerText}
            </p>
            {selectedItems.map((item) => (
              <p
                key={item.id}
                className={`text-sm leading-snug ${fontConfig.className}`}
                style={{
                  color: "white",
                  textShadow: "1px 1px 8px rgba(0,0,0,0.7)",
                }}
              >
                {item.text}
              </p>
            ))}
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handlePhoto}
        className="hidden"
      />

      {photo && (
        <button
          onClick={() => fileRef.current?.click()}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 underline"
        >
          Change photo
        </button>
      )}

      {/* Font picker */}
      <div className="w-full mb-6">
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
          <Type className="w-3.5 h-3.5" /> Font Style
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(FONT_MAP) as FontOption[]).map((f) => (
            <button
              key={f}
              onClick={() => setFont(f)}
              className={`py-2.5 px-3 rounded-lg border text-sm transition-all ${
                font === f
                  ? "border-primary bg-primary/10 text-foreground font-semibold"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30"
              } ${FONT_MAP[f].className}`}
            >
              {FONT_MAP[f].label}
            </button>
          ))}
        </div>
      </div>

      {/* Item selection */}
      <div className="w-full mb-6">
        <p className="text-xs text-muted-foreground mb-2">
          Select items to include ({selectedIds.size}/{allItems.length})
        </p>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {allItems.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <Checkbox
                checked={selectedIds.has(item.id)}
                onCheckedChange={() => toggleItem(item.id)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-foreground">{item.text}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Export */}
      <Button
        onClick={exportImage}
        disabled={!photo || selectedItems.length === 0}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-base gap-2"
      >
        <Download className="w-5 h-5" />
        Download for Instagram
      </Button>
    </div>
  );
};

export default ComposeStage;
