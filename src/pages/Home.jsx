import Hero from "../components/Hero";
import PlayerStreams from "../components/PlayerStreams";
import UpcomingMatches from "../components/UpcomingMatches";

function Home() {
  return (
    <>
      <Hero />

      <main>
        {" "}
        <div className="sidebar">
          <PlayerStreams />
          <UpcomingMatches />
        </div>
      </main>
    </>
  );
}

export default Home;
