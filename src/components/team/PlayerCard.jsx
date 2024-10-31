import { useState } from "react";
import DeleteButton from "../../admin/DeleteButton";
import SuperAdmin from "../../admin/SuperAdmin";
import {
  addPlayerArchiveToDatabase,
  deletePlayerFromDatabase
} from "../../database/databaseOperations";
import { nanoid } from "nanoid";
import RadarChart from "./RadarChart";
import "./flippingCard.css";

const NO_TEAM_PIC = "noTeamPic2.png";
const KEY = nanoid();

function PlayerCard({ player }) {
  const [flipped, setFlipped] = useState(false);

  const handleDeleteClick = async (player) => {
    await deletePlayerFromDatabase(player.id);
    await addPlayerArchiveToDatabase(player);
  };

  return (
    <div className="player--container " key={KEY}>
      <div
        className={`flipping-card ${flipped ? "flipped" : ""}`}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div className="front">
          <img
            src={player.name.toLowerCase() + ".png"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = NO_TEAM_PIC;
            }}
            alt="player pic"
            className="player--team--img"
          />
        </div>
        <div className="back">
          <RadarChart dataset={player?.data} />
        </div>
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
