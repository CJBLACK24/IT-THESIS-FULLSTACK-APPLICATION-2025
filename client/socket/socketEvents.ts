// client/socket/socketEvents.ts

import { getSocket } from "./socket";


export const testSocket = (payload: any, off: boolean = false) => {
    const socket = getSocket();
    if (!socket) {
        console.log("Socket is not connected");
        return;
    }

    if (off) {
        // turn off listing to this events
        socket.off("testSocket", payload);   // payload is callback 
    } else if (typeof payload == 'function'){
        socket.on("testSocket", payload);    // payload as callback for this event 
    } else {
        socket.emit("testSocket", payload);  // sending payload as data
    }
};

export const updateProfile = (payload: any, off: boolean = false) => {
    const socket = getSocket();
    if (!socket) {
        console.log("Socket is not connected");
        return;
    }

    if (off) {
        // turn off listing to this events
        socket.off("updateProfile", payload);   // payload is callback 
    } else if (typeof payload == 'function'){
        socket.on("updateProfile", payload);    // payload as callback for this event 
    } else {
        socket.emit("updateProfile", payload);  // sending payload as data
    }
};