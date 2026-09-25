
const Loading = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0b0b0b] text-white">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />

        <p className="mt-4 text-sm font-semibold text-gray-500">
          Loading workouts…
        </p>
      </div>
    </main>
  );
};

export default Loading;

