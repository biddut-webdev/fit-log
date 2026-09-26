import { IFit } from "@/types/workout";

const getAllFit = async (): Promise<IFit[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!res.ok) {
    throw new Error("Failed to fetch workout data");
  }

  const data = await res.json();

  return data;
};

export default getAllFit;