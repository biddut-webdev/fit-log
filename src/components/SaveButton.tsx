"use client";

import { useContext } from "react";
import { Bookmark } from "lucide-react";
import { FitLogContext } from "@/context/FitLogContext";
import { IFit } from "@/types/workout";
import toast from "react-hot-toast";

interface IProps {
  fit: IFit;
}

const SaveButton = ({ fit }: IProps) => {
  const context = useContext(FitLogContext);

  if (!context) return null;

  const { saved, saveForLater } = context;

  const alreadySaved = saved.some((item) => item.id === fit.id);

  const handleSave = () => {
    if (alreadySaved) return;

    saveForLater(fit);
    toast.success(`${fit.name} saved for later!`);

  };

  return (
    <button
      onClick={handleSave}
      disabled={alreadySaved}
      className="flex flex-1 items-center justify-center gap-2 border border-white/20 px-4 py-2 font-semibold rounded-2xl 
       text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Bookmark size={20} />

      {alreadySaved ? "Saved" : "Save for later"}
    </button>
  );
};

export default SaveButton;