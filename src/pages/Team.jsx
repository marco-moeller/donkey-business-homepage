import { useEffect, useState } from "react";
import {
  deletePlayerFromDatabase,
  getTeamFromDatabase
} from "../database/databaseOperations";
import Admin from "../admin/Admin";
import AddPlayerToTeamAdmin from "../admin/AddPlayerToTeamAdmin";
import { teamRef } from "../database/firebase";
import { onSnapshot } from "firebase/firestore";
import DeleteButton from "../admin/DeleteButton";

function Team() {
  const [team, setTeam] = useState([]);

  const handleDeleteClick = (id) => {
    deletePlayerFromDatabase(id);
  };

  useEffect(() => {
    const getTeam = async () => {
      onSnapshot(teamRef, async () => {
        setTeam(await getTeamFromDatabase());
      });
    };

    getTeam();

    return () => setTeam([]);
  }, []);

  return (
    <main className="team">
      <h2>Warcraft 3 Team</h2>
      <div className="wc3--team">
        {team.map((player) => (
          <div className="player--container">
            <img
              src="noTeamPic.png"
              alt="player pic"
              className="player--team--img"
            />

            <h3>
              <img
                src={player.race + ".png"}
                alt="race"
                className="race--icon"
              />
              {player.name}
            </h3>
            <Admin>
              <DeleteButton action={() => handleDeleteClick(player.id)} />
            </Admin>
          </div>
        ))}
      </div>
      <Admin>
        <AddPlayerToTeamAdmin />
      </Admin>
    </main>
  );
}

export default Team;
