
"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

import { IFit } from "@/types/workout";

interface IFitLogContext {
  plan: IFit[];
  saved: IFit[];
  addToPlan: (fit: IFit) => void;
  saveForLater: (fit: IFit) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

export const FitLogContext = createContext<IFitLogContext | undefined>(
  undefined
);

interface IFitLogProviderProps {
  children: ReactNode;
}

const FitLogProvider = ({ children }: IFitLogProviderProps) => {
  const [plan, setPlan] = useState<IFit[]>([]);
  const [saved, setSaved] = useState<IFit[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setHydrated(true);
  }, []);

  // Save plan after localStorage data has been loaded
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  // Save saved workouts after localStorage data has been loaded
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  const addToPlan = (fit: IFit) => {
    setPlan((prev) => [...prev, fit]);
  };

  const saveForLater = (fit: IFit) => {
    setSaved((prev) => [...prev, fit]);
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((fit) => fit.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((fit) => fit.id !== id));
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export default FitLogProvider;

