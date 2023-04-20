import { io } from "socket.io-client";
import { URL } from "./UrlApi";

export const socket = io("https://api-derco-production.up.railway.app");
