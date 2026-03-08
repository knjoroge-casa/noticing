import { useState } from "react";
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
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Abstract background patterns */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-dusty-rose/20 blur-2xl" />
        <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-periwinkle/20 blur-2xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-ice-blue/20 blur-2xl" />
        <div className="absolute -bottom-16 left-1/3 w-56 h-56 rounded-full bg-lilac/20 blur-2xl" />
        <div className="absolute top-1/2 right-0 w-48 h-48 rounded-full bg-sage/15 blur-2xl" />
        <div className="absolute top-10 left-1/2 w-40 h-40 rounded-full bg-dusty-rose/15 blur-xl" />
      </div>
      {/* Header */}
      <header className="flex flex-col items-center justify-center py-8 px-4">
        <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
          Noticing
        </h1>
        <p className="text-xs text-muted-foreground tracking-widest uppercase mt-2 text-center">
          because gratitude is really about paying attention
        </p>
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
