import { useEffect, useState } from "react";
import { getTeamFromDatabase } from "../database/databaseOperations";
import AddPlayerToTeamAdmin from "../admin/AddPlayerToTeamAdmin";
import { teamRef } from "../database/firebase";
import { onSnapshot } from "firebase/firestore";
import SuperAdmin from "../admin/SuperAdmin";
import PlayerCard from "../components/team/PlayerCard";
import { nanoid } from "nanoid";

function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const getTeam = async () => {
      onSnapshot(teamRef, async () => {
        const team = await getTeamFromDatabase();
        setTeam(
          team.sort(
            (playerA, playerB) =>
              playerB.data.reduce((a, b) => Number(a) + Number(b)) -
              playerA.data.reduce((a, b) => Number(a) + Number(b))
          )
        );
      });
    };

    getTeam();

    return () => setTeam([]);
  }, []);

  return (
    <main className="team">
      <h2>Warcraft 3 Team</h2>
      <div className="wc3--team">
        {team
          .filter((player) => player.race === "human")
          .map((player) => (
            <PlayerCard player={player} key={nanoid()} />
          ))}
      </div>
      <div className="wc3--team">
        {team
          .filter((player) => player.race === "orc")
          .map((player) => (
            <PlayerCard player={player} key={nanoid()} />
          ))}
      </div>
      <div className="wc3--team">
        {team
          .filter((player) => player.race === "undead")
          .map((player) => (
            <PlayerCard player={player} key={nanoid()} />
          ))}
      </div>
      <div className="wc3--team">
        {team
          .filter((player) => player.race === "nightelf")
          .map((player) => (
            <PlayerCard player={player} key={nanoid()} />
          ))}
      </div>
      <div className="wc3--team">
        {team
          .filter((player) => player.race === "random")
          .map((player) => (
            <PlayerCard player={player} key={nanoid()} />
          ))}
      </div>
      <SuperAdmin>
        <AddPlayerToTeamAdmin />
      </SuperAdmin>
    </main>
  );
}

export default Team;
