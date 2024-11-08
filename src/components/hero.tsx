"use client";
import React from "react";
import  {Boxes} from "@/comp/background-boxes"
import { cn } from  "@/utils/cn"

export function Hero() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
      Empowering Educators with PDF-Driven Quizzes!
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
      Say Goodbye to Boring Study Sessions: PDFs Inspire Interactive Learning Experiences!
      </p>
    </div>
  );
}
