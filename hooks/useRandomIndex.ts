"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

export function useRandomIndex(length: number): [number, Dispatch<SetStateAction<number>>] {
  return useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Math.floor(Math.random() * length);
  });
}
