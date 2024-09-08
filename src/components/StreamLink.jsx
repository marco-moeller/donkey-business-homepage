import { FaTwitch } from "react-icons/fa";
import Admin from "../admin/Admin";
import DeleteStreamButtonAdmin from "../admin/DeleteStreamButtonAdmin";
import Tooltip from "./Tooltip/Tooltip";

function StreamLink({ stream }) {
  return (
    <div className="stream--link">
      <Tooltip text="Watch on Twitch">
        <a href={"https://www.twitch.tv/" + stream.url} target="_blank">
          <FaTwitch /> {stream.name}{" "}
        </a>
      </Tooltip>
      <Admin>
        {" "}
        <DeleteStreamButtonAdmin iD={stream.id} />
      </Admin>
    </div>
  );
}

export default StreamLink;
