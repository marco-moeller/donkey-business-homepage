import { convertToMonthDay } from "../utility/dateFunctions";
import DeleteMatchButtonAdmin from "../admin/DeleteMatchButtonAdmin";
import EditButtonAdmin from "../admin/EditButtonAdmin";
import ConfirmButtonAdmin from "../admin/ConfirmButtonAdmin";
import CancelButtonAdmin from "../admin/CancelButtonAdmin";
import useVisibilityToggle from "../hooks/useVisibilityToggle";
import { useState } from "react";
import Admin from "../admin/Admin";
import EditUpcomingMatchAdmin from "../admin/EditUpcomingMatchAdmin";

function UpcomingMatch({ match }) {
  const { isShowing, toggle } = useVisibilityToggle();

  return (
    <div className="upcoming--match">
      {!isShowing && (
        <a
          href={match.link === "" ? "javascript:void(0)" : match.link}
          target={match.link === "" ? "" : "_blank"}
          className={match.link === "" ? "no--link" : ""}
        >
          <p>{convertToMonthDay(match.date)}</p>
          <p>{match?.time}</p>
          <p>{match.team1}</p>
          {(match.status === "live" || match.status === "past") && (
            <>
              {" "}
              <p>{match?.score1}</p>
              <p>:</p>
              <p>{match?.score2}</p>
            </>
          )}
          {(match.status = "upcoming" && <p>vs</p>)}
          <p>{match.team2}</p>
        </a>
      )}
      <Admin>
        {isShowing && <EditUpcomingMatchAdmin match={match} toggle={toggle} />}
        <div className="admin--btns">
          {!isShowing && <EditButtonAdmin action={toggle} />}
        </div>
      </Admin>
    </div>
  );
}

export default UpcomingMatch;
