"use client";

import { useContext } from "react";
import { ListPlus } from "lucide-react";
import { FitLogContext } from "@/context/FitLogContext";
import { IFit } from "@/types/workout";
import toast from "react-hot-toast";

interface IProps {
  fit: IFit;
}

const AddToPlanButton = ({ fit }: IProps) => {
  const context = useContext(FitLogContext);

  if (!context) return null;

  const { plan, addToPlan } = context;

  const alreadyAdded = plan.some((item) => item.id === fit.id);

  const handleAddToPlan = () => {
    if (alreadyAdded) return;

    if (plan.length >= 5) return;

    addToPlan(fit);
    toast.success(`${fit.name} added to today's plan!`);
  };

  return (
    <button
      onClick={handleAddToPlan}
      disabled={alreadyAdded || plan.length >= 5}
      className="flex flex-1 items-center justify-center gap-2 bg-[#ccff00] px-6 py-4 font-semibold rounded-2xl text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ListPlus size={20} />

      {alreadyAdded ? "Already in plan" : "Add to today's plan"}
    </button>
  );
};

export default AddToPlanButton;