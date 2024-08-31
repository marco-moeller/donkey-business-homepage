import { deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { database, matchesRef, streamsRef, teamRef } from "./firebase";

export const getStreamsFromDatabase = async () => {
  try {
    let streamsList = [];
    const snapshot = await getDocs(streamsRef);
    snapshot.docs.forEach((doc) => streamsList.push(doc.data()));
    return streamsList;
  } catch (error) {
    console.log(error);
  }
};

export const addStreamToDatabase = async (stream) => {
  try {
    await setDoc(doc(streamsRef, stream.id), stream);
  } catch (error) {
    console.log(error);
  }
};

export const deleteStreamFromDatabase = async (streamID) => {
  try {
    await deleteDoc(doc(database, "streams", streamID));
  } catch (error) {
    console.log(error);
  }
};

export const getMatchesFromDatabase = async () => {
  try {
    let matchesList = [];
    const snapshot = await getDocs(matchesRef);
    snapshot.docs.forEach((doc) => matchesList.push(doc.data()));
    return matchesList;
  } catch (error) {
    console.log(error);
  }
};

export const addMatchToDatabase = async (match) => {
  try {
    await setDoc(doc(matchesRef, match.id), match);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMatchFromDatabase = async (matchID) => {
  try {
    await deleteDoc(doc(database, "matches", matchID));
  } catch (error) {
    console.log(error);
  }
};

export const getTeamFromDatabase = async () => {
  try {
    let teamList = [];
    const snapshot = await getDocs(teamRef);
    snapshot.docs.forEach((doc) => teamList.push(doc.data()));
    return teamList;
  } catch (error) {
    console.log(error);
  }
};

export const addPlayerToDatabase = async (player) => {
  try {
    await setDoc(doc(teamRef, player.id), player);
  } catch (error) {
    console.log(error);
  }
};

export const deletePlayerFromDatabase = async (playerID) => {
  try {
    await deleteDoc(doc(database, "team", playerID));
  } catch (error) {
    console.log(error);
  }
};
