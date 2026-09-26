
"use client";

import {
  createContext,
  ReactNode,
  useSyncExternalStore,
} from "react";

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

const createStorageStore = (key: string) => {
  let value = "[]";

  const listeners = new Set<() => void>();

  const getSnapshot = () => {
    if (typeof window === "undefined") {
      return "[]";
    }

    const currentValue = localStorage.getItem(key) ?? "[]";

    if (currentValue !== value) {
      value = currentValue;
    }

    return value;
  };

  const getServerSnapshot = () => "[]";

  const subscribe = (listener: () => void) => {
    listeners.add(listener);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        value = event.newValue ?? "[]";
        listener();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", handleStorage);
    };
  };

  const setValue = (newValue: string) => {
    value = newValue;

    localStorage.setItem(key, newValue);

    listeners.forEach((listener) => listener());
  };

  return {
    getSnapshot,
    getServerSnapshot,
    subscribe,
    setValue,
  };
};

const planStore = createStorageStore("fitlog-plan");
const savedStore = createStorageStore("fitlog-saved");

const FitLogProvider = ({ children }: IFitLogProviderProps) => {
  const planJSON = useSyncExternalStore(
    planStore.subscribe,
    planStore.getSnapshot,
    planStore.getServerSnapshot
  );

  const savedJSON = useSyncExternalStore(
    savedStore.subscribe,
    savedStore.getSnapshot,
    savedStore.getServerSnapshot
  );

  const plan: IFit[] = JSON.parse(planJSON);
  const saved: IFit[] = JSON.parse(savedJSON);

  const addToPlan = (fit: IFit) => {
    if (plan.some((item) => item.id === fit.id)) {
      return;
    }

    if (plan.length >= 5) {
      return;
    }

    planStore.setValue(JSON.stringify([...plan, fit]));
  };

  const saveForLater = (fit: IFit) => {
    if (saved.some((item) => item.id === fit.id)) {
      return;
    }

    savedStore.setValue(JSON.stringify([...saved, fit]));
  };

  const removeFromPlan = (id: number) => {
    const updatedPlan = plan.filter((fit) => fit.id !== id);

    planStore.setValue(JSON.stringify(updatedPlan));
  };

  const removeFromSaved = (id: number) => {
    const updatedSaved = saved.filter((fit) => fit.id !== id);

    savedStore.setValue(JSON.stringify(updatedSaved));
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

