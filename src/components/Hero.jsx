import { useEffect, useState } from "react";
import sample from "../assets/banner_video_4mb.mp4";
import { TwitchPlayer } from "react-twitch-embed";
import { getOnlineStatus } from "../utility/streamFunctions";
import { NavLink } from "react-router-dom";

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
          <div className="heading-overlay">
            <p>
              <NavLink to="/" className="heading">
                {" "}
                DONKEY <span className="orange">BUSINESS</span>
              </NavLink>
            </p>

            <img src="logo.png" alt="logo" className="logo" />
          </div>

          <video
            muted
            autoPlay
            loop
            className="hero--video"
            preload="none"
            poster="stream_bg2.jpg"
          >
            <source src={sample} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}

export default Hero;
