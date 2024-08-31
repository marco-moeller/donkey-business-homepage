import { useEffect, useState } from "react";
import sample from "../assets/banner_video_2.mp4";
import { TwitchPlayer } from "react-twitch-embed";
import PlayerStreams from "./PlayerStreams";
import { getOnlineStatus } from "../utility/streamFunctions";
import UpcomingMatches from "./UpcomingMatches";

const STREAM_NAME = "donkeybusiness";

function Hero() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = async () => {
      setIsOnline(await getOnlineStatus(STREAM_NAME));
    };
    updateOnlineStatus();
  }, []);

  return (
    <div className="hero">
      {isOnline && (
        <div className="video--container">
          <TwitchPlayer
            channel={STREAM_NAME}
            autoplay="true"
            height={600}
            className="foreground"
          />
        </div>
      )}

      {!isOnline && (
        <div className="video--container">
          <video loop muted autoPlay className="hero--video">
            <source src={sample} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}

export default Hero;
