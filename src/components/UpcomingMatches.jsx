import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { getMatchesFromDatabase } from "../database/databaseOperations";
import { onSnapshot } from "firebase/firestore";
import { matchesRef } from "../database/firebase";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import useVisibilityToggle from "../hooks/useVisibilityToggle";
import UpcomingMatch from "./UpcomingMatch";
import AddUpcomingMatchAdmin from "../admin/AddUpcomingMatchAdmin";
import Admin from "../admin/Admin";

function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);

  const { isShowing, toggle } = useVisibilityToggle();

  useEffect(() => {
    const getMatches = async () => {
      onSnapshot(matchesRef, async () => {
        setMatches(await getMatchesFromDatabase());
      });
    };

    getMatches();
    return () => setMatches([]);
  }, []);

  useEffect(() => {
    if (matches.length === 0) {
      return;
    }

    const updateUpcomingMatches = () => {
      matches.forEach((match) => {
        if (
          new Date(match.date) < new Date().setHours(0, 0, 0, 0) ||
          match.status === "past"
        ) {
          setPastMatches((prevState) => [...prevState, match]);
        } else {
          setUpcomingMatches((prevState) => [...prevState, match]);
        }
      });
    };
    updateUpcomingMatches();
    return () => {
      setUpcomingMatches([]);
      setPastMatches([]);
    };
  }, [matches]);

  return (
    <section className="ticker">
      <Admin>
        <AddUpcomingMatchAdmin />
      </Admin>
      <h3>upcoming matches</h3>
      {upcomingMatches.length === 0 && <p>No Upcoming Matches</p>}
      {upcomingMatches
        .sort(
          (a, b) =>
            new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time)
        )
        .map((match) => (
          <UpcomingMatch match={match} key={nanoid()} />
        ))}

      {pastMatches.length > 0 && (
        <>
          {!isShowing && (
            <h3 onClick={toggle}>
              Past Matches <FaAngleDown />
            </h3>
          )}
          {isShowing && (
            <>
              <h3 onClick={toggle}>
                Past Matches <FaAngleUp />
              </h3>
              {pastMatches
                .sort(
                  (a, b) =>
                    new Date(a.date + " " + a.time) -
                    new Date(b.date + " " + b.time)
                )
                .map((match) => (
                  <UpcomingMatch match={match} key={nanoid()} />
                ))}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default UpcomingMatches;
