import socketIOClient from "socket.io-client";
const ENDPOINT = "HEROKU URL"; // need to add heroku url
export const socket = socketIOClient(ENDPOINT);
