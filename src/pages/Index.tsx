import { useState } from "react";
import { Heart } from "lucide-react";
import CollectStage from "@/components/CollectStage";
import ComposeStage from "@/components/ComposeStage";

type Stage = "collect" | "compose";

const Index = () => {
  const [stage, setStage] = useState<Stage>("collect");
  const [composeMonth, setComposeMonth] = useState<string>("");

  const handleCompose = (monthKey: string) => {
    setComposeMonth(monthKey);
    setStage("compose");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center gap-2 py-6 px-4">
        <Heart className="w-5 h-5 text-primary fill-primary" />
        <h1 className="font-display text-xl font-bold text-foreground tracking-tight">
          Grateful
        </h1>
      </header>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-3 mb-8 px-4">
        {["Collect", "Compose"].map((s, i) => {
          const isActive = (i === 0 && stage === "collect") || (i === 1 && stage === "compose");
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
              {i === 0 && (
                <div className="w-8 h-px bg-border mx-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <main className="flex-1">
        {stage === "collect" && <CollectStage onCompose={handleCompose} />}
        {stage === "compose" && (
          <ComposeStage
            monthKey={composeMonth}
            onBack={() => setStage("collect")}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
