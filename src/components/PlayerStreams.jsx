import { FaTwitch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getOnlineStatus } from "../utility/streamFunctions";
import { getStreamsFromDatabase } from "../database/databaseOperations";
import { nanoid } from "nanoid";
import { onSnapshot } from "firebase/firestore";
import { streamsRef } from "../database/firebase";
import useVisibilityToggle from "../hooks/useVisibilityToggle";
import AddPlayerStreamAdmin from "../admin/AddPlayerStreamAdmin";
import Admin from "../admin/Admin";
import Pagination from "./Pagination";
import StreamLink from "./StreamLink";

function PlayerStreams() {
  const [onlineStreams, setOnlineStreams] = useState([]);
  const [offlineStreams, setOfflineStreams] = useState([]);
  const [streams, setStreams] = useState([]);
  const { isShowing, toggle } = useVisibilityToggle();

  useEffect(() => {
    const getStreams = async () => {
      onSnapshot(streamsRef, async () => {
        setStreams(await getStreamsFromDatabase());
      });
    };

    getStreams();

    return () => setStreams([]);
  }, []);

  useEffect(() => {
    if (streams.length === 0) {
      return;
    }

    const updateOnlineStreams = async () => {
      const results = await Promise.all(
        streams.map(async (stream) => {
          const isOnline = await getOnlineStatus(stream.url);
          return { stream, isOnline };
        })
      );
      setOnlineStreams(
        results.filter(({ isOnline }) => isOnline).map(({ stream }) => stream)
      );
      setOfflineStreams(
        results.filter(({ isOnline }) => !isOnline).map(({ stream }) => stream)
      );
    };
    updateOnlineStreams();
  }, [streams]);

  return (
    <>
      <section className="player--streams">
        <Admin>
          <AddPlayerStreamAdmin />
        </Admin>
        <h3>Player Streams</h3>
        {onlineStreams.length === 0 && <p>No Streams Online</p>}
        {onlineStreams.map((stream) => (
          <StreamLink stream={stream} key={nanoid()} />
        ))}
        {offlineStreams.length > 0 && (
          <>
            {!isShowing && (
              <h3 onClick={toggle} className="pointer">
                Offline <FaAngleDown />
              </h3>
            )}
            {isShowing && (
              <>
                <h3 onClick={toggle} className="pointer">
                  Offline <FaAngleUp />
                </h3>
                <Pagination itemsPerPage={10}>
                  {offlineStreams.map((stream) => (
                    <StreamLink stream={stream} key={nanoid()} />
                  ))}
                </Pagination>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default PlayerStreams;
