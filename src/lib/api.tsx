import { IFit } from "@/types/workout";


const getAllFit = async (): Promise<IFit[]> => {
  const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
  const data = await res.json();
  return data;


};

export default getAllFit;