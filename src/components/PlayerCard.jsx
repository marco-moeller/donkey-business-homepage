import { useState } from "react";
import DeleteButton from "../admin/DeleteButton";
import SuperAdmin from "../admin/SuperAdmin";
import {
  addPlayerArchiveToDatabase,
  deletePlayerFromDatabase
} from "../database/databaseOperations";
import { nanoid } from "nanoid";

const NO_TEAM_PIC = "noTeamPic2.png";
const CHART = "chart2.png";

function PlayerCard({ player }) {
  const [imgSource, setImgSource] = useState(
    player.name.toLowerCase() + ".png"
  );

  const handleDeleteClick = async (player) => {
    await deletePlayerFromDatabase(player.id);
    await addPlayerArchiveToDatabase(player);
  };

  return (
    <div className="player--container " key={nanoid()}>
      <div
        className="flip-container"
        onMouseEnter={() =>
          setTimeout(() => {
            setImgSource(CHART);
          }, 200)
        }
        onMouseLeave={() =>
          setTimeout(() => {
            setImgSource(player.name.toLowerCase() + ".png");
          }, 200)
        }
      >
        <img
          src={imgSource}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = NO_TEAM_PIC;
          }}
          alt="player pic"
          className="player--team--img flip-image "
        />
        <div className="triangle" />
        <img src={player.race + ".png"} alt="race" className="race--icon" />
      </div>
      <div className="player--race--name">
        <h3>{player.name}</h3>
      </div>
      <SuperAdmin>
        <DeleteButton action={() => handleDeleteClick(player)} />
      </SuperAdmin>
    </div>
  );
}

export default PlayerCard;
