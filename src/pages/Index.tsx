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
        <div className="absolute top-3/4 left-10 w-60 h-60 rounded-full bg-periwinkle/15 blur-2xl" />
        <div className="absolute top-20 right-1/3 w-44 h-44 rounded-full bg-ice-blue/15 blur-xl" />
        <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-sage/20 blur-2xl" />
        <div className="absolute top-1/3 left-1/4 w-36 h-36 rounded-full bg-lilac/15 blur-xl" />
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
