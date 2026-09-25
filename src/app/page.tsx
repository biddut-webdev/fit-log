import getAllFit from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import Banner from "@/components/Banner";

const Home = async () => {
  const AllData = await getAllFit();

  return (
    <>
      <Banner />


      <main
        id="library"
        className="container mx-auto max-w-7xl px-4 py-16"
      >
        {/* Library Heading */}
        <div className="mb-10">
          <p className="text-4xl font-bold">
            THE LIBRARY
          </p>

          <p className="text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AllData.map((fit) => (
            <WorkoutCard key={fit.id} fit={fit} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;