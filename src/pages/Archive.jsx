import { useEffect, useState } from "react";
import {
  matchesArchiveRef,
  streamsArchiveRef,
  teamArchiveRef
} from "../database/firebase";
import UpcomingMatch from "../components/UpcomingMatch";
import { nanoid } from "nanoid";
import Admin from "../admin/Admin";
import {
  addMatchToDatabase,
  addPlayerToDatabase,
  addStreamToDatabase,
  deleteMatchArchiveFromDatabase,
  deletePlayerArchiveFromDatabase,
  deleteStreamArchiveFromDatabase,
  getMatchesArchiveFromDatabase,
  getStreamsArchiveFromDatabase,
  getTeamArchiveFromDatabase
} from "../database/databaseOperations";
import { onSnapshot } from "firebase/firestore";
import StreamLink from "../components/StreamLink";
import RestoreButtonAdmin from "../admin/RestoreButtonAdmin";

function Archive() {
  const [matches, setMatches] = useState([]);
  const [team, setTeam] = useState([]);
  const [streams, setStreams] = useState([]);

  const restoreMatch = async (match) => {
    await addMatchToDatabase(match);
    await deleteMatchArchiveFromDatabase(match.id);
  };

  const restorePlayer = async (player) => {
    await addPlayerToDatabase(player);
    await deletePlayerArchiveFromDatabase(player.id);
  };

  const restoreStream = async (stream) => {
    await addStreamToDatabase(stream);
    await deleteStreamArchiveFromDatabase(stream.id);
  };

  useEffect(() => {
    const getMatches = async () => {
      onSnapshot(matchesArchiveRef, async () => {
        setMatches(await getMatchesArchiveFromDatabase());
      });
    };

    getMatches();
    return () => setMatches([]);
  }, []);

  useEffect(() => {
    const getTeam = async () => {
      onSnapshot(teamArchiveRef, async () => {
        setTeam(await getTeamArchiveFromDatabase());
      });
    };

    getTeam();
    return () => setTeam([]);
  }, []);

  useEffect(() => {
    const getStreams = async () => {
      onSnapshot(streamsArchiveRef, async () => {
        setStreams(await getStreamsArchiveFromDatabase());
      });
    };

    getStreams();
    return () => setStreams([]);
  }, []);

  return (
    <Admin>
      <main className="archive">
        <h2>Archive</h2>
        <h3>Matches</h3>
        {matches?.map((match) => (
          <>
            <UpcomingMatch match={match} key={nanoid()} />
            <RestoreButtonAdmin action={() => restoreMatch(match)} />
          </>
        ))}
        <h3>Team</h3>
        {team?.map((player) => (
          <div className="player--container">
            <img
              src="noTeamPic.png"
              alt="player pic"
              className="player--team--img"
            />
            <div className="player--race--name">
              <img
                src={player.race + ".png"}
                alt="race"
                className="race--icon"
              />
              <h3>{player.name}</h3>
            </div>
            <RestoreButtonAdmin action={() => restorePlayer(player)} />
          </div>
        ))}
        <h3>Streams</h3>
        {streams?.map((stream) => (
          <>
            <StreamLink stream={stream} key={nanoid()} />
            <RestoreButtonAdmin action={() => restoreStream(stream)} />
          </>
        ))}
      </main>
    </Admin>
  );
}

export default Archive;
