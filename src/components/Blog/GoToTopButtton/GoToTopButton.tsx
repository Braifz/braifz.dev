"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "../../ui/button";

const GoToTopButton = () => {
  return (
    <Button
      variant={"ghost"}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="p-3 border flex gap-3 items-center"
    >
      <ArrowUp className="w-5 h-5" />
      Volver al principio
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};

export default GoToTopButton;
