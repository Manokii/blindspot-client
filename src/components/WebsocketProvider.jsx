import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import {
    setLiveSettings,
    addLiveMatchWidget,
    removeLiveMatchWidget,
} from "../redux/Actions";
import io from "socket.io-client";

export const wsContext = createContext(null);

const host = process.env.REACT_APP_WEBSOCKETHOST || 'localhost:3100'

const WebsocketProvider = ({ children }) => {
    let socket;
    let ws;
    const dispatch = useDispatch();

    // prettier-ignore
    if (!socket) {
        socket = io.connect(`${host}/live`)
        socket.on("set_live_settings", (settings) => dispatch(setLiveSettings(settings)))
        socket.on('add_match_widget', (match) => dispatch(addLiveMatchWidget(match)))
        socket.on('remove_match_widget', (tournamentId) => dispatch(removeLiveMatchWidget(tournamentId)))
        socket.emit('get_live_settngs')
        ws = {
            socket,
            set_live_settings: (settings) => socket.emit('set_live_settings', settings),
            add_match_widget: (match) => socket.emit('add_match_widget', match),
            remove_match_widget: (tournamentId) => socket.emit('remove_match_widget', tournamentId)
        };
    }
    return <wsContext.Provider value={ws}>{children}</wsContext.Provider>;
};

export default WebsocketProvider;
