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
    <div className="min-h-screen bg-background flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-xl mx-auto min-h-screen flex flex-col border-x border-border bg-card/30 backdrop-blur-sm relative z-10">
      {/* Abstract background patterns */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-dusty-rose/20 blur-2xl" />
        <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-periwinkle/20 blur-2xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-ice-blue/20 blur-2xl" />
        <div className="absolute -bottom-16 left-1/3 w-56 h-56 rounded-full bg-lilac/20 blur-2xl" />
        <div className="absolute top-1/2 right-0 w-48 h-48 rounded-full bg-sage/15 blur-2xl" />
        <div className="absolute top-10 left-1/2 w-40 h-40 rounded-full bg-dusty-rose/15 blur-xl" />
        <div className="absolute top-3/4 left-10 w-60 h-60 rounded-full bg-periwinkle/15 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-sage/20 blur-2xl" />
        {/* Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diag-lines" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="hsl(240 15% 15%)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag-lines)" />
        </svg>
        {/* Cross-hatch accent */}
        <svg className="absolute top-1/4 right-0 w-[500px] h-[500px]" style={{ opacity: 0.05 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cross" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M0 12h24M12 0v24" stroke="hsl(250 30% 65%)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cross)" />
        </svg>
        {/* Dotted grid */}
        <svg className="absolute bottom-0 left-0 w-[400px] h-[400px]" style={{ opacity: 0.08 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="hsl(250 30% 65%)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        {/* Concentric circles */}
        <svg className="absolute top-10 left-10 w-72 h-72" style={{ opacity: 0.07 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="30" fill="none" stroke="hsl(250 35% 70%)" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="hsl(250 35% 70%)" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(250 35% 70%)" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="100" fill="none" stroke="hsl(250 35% 70%)" strokeWidth="0.8" />
        </svg>
        {/* Concentric circles bottom-right */}
        <svg className="absolute bottom-20 right-20 w-60 h-60" style={{ opacity: 0.05 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="40" fill="none" stroke="hsl(345 30% 72%)" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="hsl(345 30% 72%)" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="95" fill="none" stroke="hsl(345 30% 72%)" strokeWidth="0.8" />
        </svg>
      </div>
      {/* Header */}
      <header className="flex flex-col items-center justify-center py-8 px-4">
        <h1 className="font-display text-4xl font-bold text-foreground tracking-tight">
          Noticing
        </h1>
        <p className="text-xs text-muted-foreground tracking-widest uppercase mt-2 text-center">
          because gratitude is really about paying attention
        </p>
      </header>


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
