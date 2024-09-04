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
import DeleteStreamButtonAdmin from "../admin/DeleteStreamButtonAdmin";
import AddPlayerStreamAdmin from "../admin/AddPlayerStreamAdmin";
import Admin from "../admin/Admin";
import Pagination from "./Pagination";

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
      streams.forEach(async (stream) => {
        if (await getOnlineStatus(stream.url)) {
          setOnlineStreams((prevState) => [...prevState, stream]);
        } else {
          setOfflineStreams((prevState) => [...prevState, stream]);
        }
      });
    };
    updateOnlineStreams();
    return () => {
      setOnlineStreams([]);
      setOfflineStreams([]);
    };
  }, [streams]);

  return (
    <>
      <section className="player--streams">
        <Admin>
          <AddPlayerStreamAdmin />
        </Admin>
        <h3>Player Streams</h3>
        {onlineStreams.length === 0 && (
          <p className="match--link">No Streams Online</p>
        )}
        {onlineStreams.map((stream) => (
          <div className="stream--link" key={nanoid()}>
            <a href={"https://www.twitch.tv/" + stream.url} target="_blank">
              <FaTwitch /> {stream.name}
            </a>
            <Admin>
              {" "}
              <DeleteStreamButtonAdmin iD={stream.id} />
            </Admin>
          </div>
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
                    <div className="stream--link" key={nanoid()}>
                      <a
                        href={"https://www.twitch.tv/" + stream.url}
                        target="_blank"
                      >
                        <FaTwitch /> {stream.name}
                      </a>
                      <Admin>
                        {" "}
                        <DeleteStreamButtonAdmin iD={stream.id} />
                      </Admin>
                    </div>
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
