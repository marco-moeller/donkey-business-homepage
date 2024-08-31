import { useEffect } from "react";
import { TwitchPlayer } from "react-twitch-embed";

function Stream() {
  return (
    <main className="stream">
      <TwitchPlayer channel="donkeybusiness" autoplay="true" height={600} />
    </main>
  );
}

export default Stream;
