export const getOnlineStatus = async (name) => {
  try {
    const result = await fetch(`https://www.twitch.tv/${name}`);
    const isOnline = (await result.text()).includes("isLiveBroadcast");

    return isOnline;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};
