import { useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addItem,
  removeItem,
  getMonthItems,
  getAllMonths,
  getCurrentMonthKey,
  getCurrentMonthLabel,
  getMonthLabelFromKey,
  type GratitudeItem,
} from "@/lib/gratitudeStore";

interface Props {
  onCompose: (monthKey: string) => void;
}

const CollectStage = ({ onCompose }: Props) => {
  const [text, setText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthKey());
  const [items, setItems] = useState<GratitudeItem[]>([]);
  const [showMonths, setShowMonths] = useState(false);

  const months = getAllMonths();
  const currentLabel = getMonthLabelFromKey(selectedMonth);

  useEffect(() => {
    setItems(getMonthItems(selectedMonth));
  }, [selectedMonth]);

  const refresh = () => setItems(getMonthItems(selectedMonth));

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addItem(trimmed, selectedMonth);
    setText("");
    refresh();
  };

  const handleRemove = (id: string) => {
    removeItem(selectedMonth, id);
    refresh();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto px-4 pb-8">
      <h2 className="font-display text-3xl font-bold text-foreground mb-1 text-center">
        Things That Found Me
      </h2>
      <p className="text-muted-foreground text-sm mb-6 text-center">
        the small things, the big things, all the things
      </p>

      {/* Month selector */}
      <div className="relative w-full mb-4">
        <button
          onClick={() => setShowMonths(!showMonths)}
          className="w-full flex items-center justify-between px-4 py-3 bg-card rounded-lg border border-border hover:border-primary/40 transition-colors"
        >
          <span className="font-semibold text-foreground">{currentLabel}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        {showMonths && months.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
            {months.map((m) => (
              <button
                key={m.key}
                onClick={() => {
                  setSelectedMonth(m.key);
                  setShowMonths(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-muted transition-colors text-sm text-foreground"
              >
                {m.label}{" "}
                <span className="text-muted-foreground">
                  ({m.items.length})
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 w-full mb-6">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add something you noticed...."
          className="flex-1 bg-card border-border focus-visible:ring-primary"
        />
        <Button
          onClick={handleAdd}
          size="icon"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Items */}
      <div className="w-full space-y-2 mb-8">
        {items.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">
            No items yet for {currentLabel}. Start adding!
          </p>
        )}
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 group animate-in fade-in slide-in-from-bottom-1 duration-200"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <span className="flex-1 text-foreground text-sm">{item.text}</span>
            <button
              onClick={() => handleRemove(item.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <Button
          onClick={() => onCompose(selectedMonth)}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-base"
        >
          Compose with {items.length} item{items.length !== 1 ? "s" : ""}
        </Button>
      )}
    </div>
  );
};

export default CollectStage;
