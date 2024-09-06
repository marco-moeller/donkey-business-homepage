function About() {
  return (
    <main className="about">
      <h2>About us</h2>
      <section>
        <img src="team.jpg" alt="team" />
        <div>
          <p>
            We at Donkey Business are an exceptional and closely-knit team of
            friends who have joined forces within the realm of Warcraft III,
            although our bond extends far beyond the game. What unites us is a
            shared passion for adventure, strategy, and a relentless pursuit of
            victory.
          </p>
          <p>
            We compete in clan wars and tournaments, enjoying both the thrill of
            competition and the camaraderie that comes with it. Together, we're
            always striving to improve and continue growing as a team, while
            having fun in the world of Warcraft III.
          </p>
          <p>
            Join our{" "}
            <a
              href="https://discord.gg/mDHQRuxu"
              target="_blank"
              className="bold"
            >
              Discord
            </a>{" "}
            or catch some of the action on{" "}
            <a
              href="https://www.twitch.tv/donkeybusiness"
              target="_blank"
              className="bold"
            >
              Stream
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
