import { convertToMonthDay } from "../utility/dateFunctions";
import EditButtonAdmin from "../admin/EditButtonAdmin";
import useVisibilityToggle from "../hooks/useVisibilityToggle";
import Admin from "../admin/Admin";
import EditUpcomingMatchAdmin from "../admin/EditUpcomingMatchAdmin";
import { FaTwitch } from "react-icons/fa6";
import Tooltip from "./Tooltip/Tooltip";

function UpcomingMatch({ match }) {
  const { isShowing, toggle } = useVisibilityToggle();

  return (
    <div className="upcoming--match">
      {!isShowing && (
        <>
          <Tooltip text="Match Details">
            <a
              href={match.link === "" ? "#" : match.link}
              onClick={match.link === "" ? (e) => e.preventDefault : null}
              target={match.link === "" ? "" : "_blank"}
              className={
                match.link === "" ? "match--link no--link " : "match--link"
              }
            >
              <p>{convertToMonthDay(match.date)}</p>
              <p
                className={
                  match.status === "live" ? "live match--time" : "match--time"
                }
              >
                {match.status === "live" ? "LIVE" : match?.time}
              </p>
              <p className="team--1">{match.team1}</p>
              {(match.status === "live" || match.status === "past") && (
                <>
                  {" "}
                  <p className="versus">
                    {match?.score1} {" : "}
                    {match?.score2}
                  </p>
                </>
              )}
              {match.status === "upcoming" && (
                <>
                  <p className="versus">vs</p>
                </>
              )}
              <p className="team--2">{match.team2}</p>
            </a>
          </Tooltip>
          {match.stream !== "https://www.twitch.tv/" && (
            <Tooltip text="Watch on Twitch">
              <a href={match.stream} target="_blank" className="match--stream">
                <FaTwitch />
              </a>
            </Tooltip>
          )}
          {match.stream === "https://www.twitch.tv/" && (
            <div className="transparent">
              <FaTwitch className="transparent" />
            </div>
          )}
        </>
      )}
      <Admin>
        {isShowing && <EditUpcomingMatchAdmin match={match} toggle={toggle} />}

        {!isShowing && (
          <div className="admin--btns">
            <EditButtonAdmin action={toggle} />
          </div>
        )}
      </Admin>
    </div>
  );
}

export default UpcomingMatch;
