
"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  Clock,
  Flame,
  Star,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { FitLogContext } from "@/context/FitLogContext";

type SortOption = "duration" | "calories" | "rating";

const MyPlan = () => {
  const context = useContext(FitLogContext);

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedCompleted = localStorage.getItem("fitlog-completed");

    return storedCompleted ? JSON.parse(storedCompleted) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completedIds)
    );
  }, [completedIds]);

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!context) return null;

  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = context;

  /* ---------------- Metrics ---------------- */

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  /* ---------------- Active Data ---------------- */

  const currentWorkouts =
    activeTab === "plan" ? plan : saved;

  /* ---------------- Sorting ---------------- */

  const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return a.rating - b.rating;
  });

  /* ---------------- Mark as Done ---------------- */

  const handleMarkAsDone = (id: number) => {
    const workout = plan.find((item) => item.id === id);

    if (!workout) return;

    const alreadyCompleted = completedIds.includes(id);

    if (alreadyCompleted) {
      setCompletedIds((prev) =>
        prev.filter((item) => item !== id)
      );

      toast("Workout marked as not done.");
      return;
    }

    setCompletedIds((prev) => [...prev, id]);

    toast.success(`${workout.name} marked as done!`);
  };

  /* ---------------- Remove ---------------- */

  const handleRemove = (id: number) => {
    const workout =
      activeTab === "plan"
        ? plan.find((item) => item.id === id)
        : saved.find((item) => item.id === id);

    if (!workout) return;

    if (activeTab === "plan") {
      removeFromPlan(id);

      toast.success(
        `${workout.name} removed from your plan.`
      );
    } else {
      removeFromSaved(id);

      toast.success(
        `${workout.name} removed from saved.`
      );
    }

    setCompletedIds((prev) =>
      prev.filter((item) => item !== id)
    );
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <section>
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* ================= METRICS ================= */}

        <section className="mt-8 grid grid-cols-1 border border-white/10 bg-[#111318] sm:grid-cols-3">

          {/* Exercises */}
          <div className="border-b border-white/10 px-6 py-7 sm:border-b-0 sm:border-r">
            <p className="text-sm text-gray-500">
              Exercises
            </p>

            <p className="mt-2 text-4xl font-black text-[#ccff00]">
              {plan.length}
            </p>
          </div>

          {/* Minutes */}
          <div className="border-b border-white/10 px-6 py-7 sm:border-b-0 sm:border-r">
            <p className="text-sm text-gray-500">
              Minutes
            </p>

            <p className="mt-2 text-4xl font-black">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="px-6 py-7">
            <p className="text-sm text-gray-500">
              Calories
            </p>

            <p className="mt-2 text-4xl font-black">
              {totalCalories}
            </p>
          </div>

        </section>

        {/* ================= TABS + SORT ================= */}

        <section className="mt-8 flex flex-col gap-5 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Tabs */}
          <div className="flex w-fit rounded-xl bg-[#15171d] p-1">

            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${activeTab === "plan"
                ? "bg-[#242832] text-white"
                : "text-gray-500 hover:text-white"
                }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${activeTab === "saved"
                ? "bg-[#242832] text-white"
                : "text-gray-500 hover:text-white"
                }`}
            >
              Saved
            </button>

          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as SortOption)
                }
                aria-label="Sort workouts by"
                className="appearance-none rounded-xl border border-white/10 bg-[#15171d] py-2.5 pl-4 pr-10 text-sm font-semibold text-white outline-none transition hover:border-white/20 focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

        </section>

        {/* ================= WORKOUT LIST ================= */}

        <section className="mt-6">

          {loading ? (
            /* Loading State */
            <div className="flex min-h-90 items-center justify-center">
              <p className="text-sm text-gray-500">
                Loading workouts…
              </p>
            </div>
          ) : sortedWorkouts.length === 0 ? (
            /* Empty State */
            <div className="flex min-h-90 flex-col items-center justify-center text-center">

              <h2 className="text-2xl font-black uppercase">
                NOTHING HERE YET
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-6 rounded-xl bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black transition hover:opacity-90"
              >
                Go to workouts
              </Link>

            </div>
          ) : (
            <div className="space-y-4">

              {sortedWorkouts.map((workout) => {

                const isCompleted =
                  completedIds.includes(workout.id);

                return (
                  <article
                    key={workout.id}
                    className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111318] transition hover:border-white/20 md:flex-row md:items-center ${isCompleted ? "opacity-60" : ""
                      }`}
                  >

                    {/* Image */}
                    <div className="relative h-52 w-full shrink-0 md:h-28 md:w-40 lg:w-44">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Workout Info */}
                    <div className="flex flex-1 flex-col justify-center p-5">

                      <h2
                        className={`text-lg font-black uppercase ${isCompleted
                          ? "line-through"
                          : ""
                          }`}
                      >
                        {workout.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {workout.equipment}
                      </p>

                      {/* Stats */}
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-400">

                        <span className="flex items-center gap-1.5">
                          <Clock
                            size={15}
                            className="text-[#ccff00]"
                          />
                          {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Flame
                            size={15}
                            className="text-[#ccff00]"
                          />
                          {workout.caloriesBurned} kcal
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Star
                            size={15}
                            className="text-[#ccff00]"
                          />
                          {workout.rating}
                        </span>

                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 p-5 md:ml-auto">

                      {/* View Details */}
                      <Link
                        href={`/workouts/${workout.id}`}
                        className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold transition hover:bg-white/10"
                      >
                        View Details
                      </Link>

                      {/* Mark as Done */}
                      {activeTab === "plan" && (
                        <button
                          onClick={() =>
                            handleMarkAsDone(workout.id)
                          }
                          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition ${isCompleted
                            ? "bg-white/10 text-[#ccff00]"
                            : "bg-[#ccff00] text-black hover:opacity-90"
                            }`}
                        >
                          <Check size={15} />

                          {isCompleted
                            ? "Done"
                            : "Mark as Done"}
                        </button>
                      )}

                      {/* Remove */}
                      <button
                        onClick={() =>
                          handleRemove(workout.id)
                        }
                        aria-label={`Remove ${workout.name}`}
                        className="text-gray-500 transition hover:text-white"
                      >
                        <X size={20} />
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </section>

      </div>
    </main>
  );
};

export default MyPlan;

