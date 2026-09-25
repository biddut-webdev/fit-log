import { IFit } from "@/types/workout";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

interface IWorkoutCardProps {
  fit: IFit;
}

const WorkoutCard = ({ fit }: IWorkoutCardProps) => {
  return (
    <Link href={`/workouts/${fit.id}`}>
      <div className="overflow-hidden border border-white/10 bg-[#15171D] text-white transition rounded-2xl hover:-translate-y-1 hover:border-[#ccff00]/50 hover:shadow-xl">

        {/* Image */}
        <figure className="h-56 overflow-hidden">
          <Image
            src={fit.image}
            alt={fit.name}
            width={500}
            height={500}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </figure>

        {/* Content */}
        <div className="p-5">

          {/* Category Tags */}
          <div className="mb-3 flex flex-wrap gap-2">
            {fit.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="  px-2 py-1 text-xs font-bold text-black  bg-[#ccff00] rounded-xl"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h2 className="text-xl font-black uppercase">
            {fit.name}
          </h2>

          {/* Equipment */}
          <p className="mt-2 text-sm text-gray-400">
            {fit.equipment}
          </p>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {fit.duration} min
            </span>

            <span className="flex items-center gap-1">
              <Flame size={16} className="text-gray-400" fill="currentColor" />
              {fit.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1">
              <Star size={16} />
              {fit.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;