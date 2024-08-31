import { useEffect, useState } from "react";
import { getTeamFromDatabase } from "../database/databaseOperations";

function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const getTeam = async () => {
      setTeam(await getTeamFromDatabase());
    };
    getTeam();
  }, []);

  return (
    <main className="team">
      <h2>Warcraft III Team</h2>
      <div className="wc3--team">
        {team.map((player) => (
          <div className="player--container">
            <img
              src="noTeamPic.png"
              alt="player pic"
              className="player--team--img"
            />

            <h2>
              <img
                src={player.race + ".png"}
                alt="race"
                className="race--icon"
              />
              {player.name}
            </h2>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Team;
