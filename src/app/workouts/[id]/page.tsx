import getAllFit from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToPlanButton from "@/components/AddToPlanButton";
import SaveButton from "@/components/SaveButton";

interface IWorkoutDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetails = async ({ params }: IWorkoutDetailsProps) => {
  const { id } = await params;

  const allWorkouts = await getAllFit();

  const workout = allWorkouts.find((fit) => fit.id === Number(id));

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#15171D] px-4 py-12 text-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left Side - Image */}
          <div className="overflow-hidden">
            <Image
              src={workout.image}
              alt={workout.name}
              width={800}
              height={800}
              className="h-full max-h-175 w-full object-cover"
            />
          </div>

          {/* Right Side */}
          <div>
            {/* Title */}
            <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-5 text-base leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Category Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="text-black  bg-[#ccff00] rounded-xl px-3 py-1 text-xs font-bold uppercase"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Key Specs */}
            <div className="mt-8 border-y border-white/10">

              <div className="divide-y divide-white/10">
                <div className="flex justify-between py-4">
                  <span className="text-sm font-semibold text-gray-500">EQUIPMENT</span>
                  <span className="text-sm font-bold">
                    {workout.equipment}
                  </span>
                </div>

                <div className="flex justify-between py-4">
                  <span className="text-sm text-gray-500 font-semibold">DIFFICULTY</span>
                  <span className="text-sm font-bold">
                    {workout.difficulty}
                  </span>
                </div>

                <div className="flex justify-between py-4">
                  <span className="text-sm text-gray-500 font-semibold">SETS</span>
                  <span className="text-sm font-bold">
                    {workout.sets}
                  </span>
                </div>

                <div className="flex justify-between py-4">
                  <span className="text-sm text-gray-500 font-semibold">REPS</span>
                  <span className="text-sm font-bold">
                    {workout.reps}
                  </span>
                </div>

                <div className="flex justify-between py-4">
                  <span className="text-sm text-gray-500 font-semibold">DURATION</span>
                  <span className="text-sm font-bold">
                    {workout.duration} min
                  </span>
                </div>

                <div className="flex justify-between py-4">
                  <span className="text-sm text-gray-500 font-semibold">CALORIES</span>
                  <span className="text-sm font-bold">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex justify-between py-4">
                  <span className="text-sm text-gray-500 font-semibold">RATING</span>
                  <span className="text-sm font-bold">
                    {workout.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className=" font-bold">
                INSTRUCTIONS
              </h2>

              <ol className="space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-sm leading-6 text-gray-300"
                  >
                    <span>
                      {index + 1}.
                    </span>

                    <span className="text-gray-400">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA Actions */}
            <div className="mt-10">
              <div className="flex flex-col gap-4 sm:flex-row">
                <AddToPlanButton fit={workout} />
                <SaveButton fit={workout} />
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                Add this workout to today&apos;s plan or save it for a later session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;