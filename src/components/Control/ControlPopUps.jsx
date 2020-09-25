import React, { useContext, useState, useEffect } from "react";
import {
    makeStyles,
    Typography,
    TextField,
    Button,
    Paper,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";

const q = makeStyles((t) => ({
    root: {
        [t.breakpoints.up("sm")]: {
            gridTemplateColumns: "1fr 1fr",
        },
        display: "grid",
        gridTemplateColumns: "1fr",
        flexDirection: "column",
        gridGap: 16,

        "& .section": {
            // margin: t.spacing(2, 0),
            backgroundColor: "#1e96fc",
            display: "flex",
            flexDirection: "column",

            "& button": {
                justifySelf: "flex-end",
            },
        },
    },
}));

const ControlPopUps = () => {
    const c = q();
    const ws = useContext(wsContext);

    const live = useSelector((state) => state.live);
    const {
        popup_text,
        popup_sponsor,
        countdown,
        music,
        match_current_player_agents,
    } = live;
    const [form, set] = useState({
        popup_text: {
            head: "Did you know?",
            body: "",
            live: false,
        },
        popup_sponsor: {
            live: false,
        },
        countdown: {
            secs: 600,
            live: false,
        },

        music: {
            title: "",
            artist: "",
            live: false,
        },

        match_current_player_agents: {
            a: [],
            b: [],
            imgOnly: false,
            showLogoAsBG: false,
            showIngame: false,
        },
    });

    // ======================= useEffect() ======================= //

    useEffect(() => {
        if (!popup_text) return;
        set((f) => ({ ...f, popup_text: popup_text }));
    }, [popup_text]);

    useEffect(() => {
        if (!popup_sponsor) return;
        set((f) => ({ ...f, popup_sponsor: popup_sponsor }));
    }, [popup_sponsor]);

    useEffect(() => {
        if (!countdown) return;
        set((f) => ({ ...f, countdown: countdown }));
    }, [countdown]);

    useEffect(() => {
        if (!music) return;
        set((f) => ({ ...f, music: music }));
    }, [music]);

    useEffect(() => {
        if (!match_current_player_agents) return;
        set((f) => ({
            ...f,
            match_current_player_agents: match_current_player_agents,
        }));
    }, [match_current_player_agents]);

    // ======================= POPUP TEXT ======================= //

    const popup_text_head = ({ currentTarget: { value } }) => {
        set((o) => ({ ...o, popup_text: { ...o.popup_text, head: value } }));
    };

    const popup_text_body = ({ currentTarget: { value } }) => {
        set((o) => ({ ...o, popup_text: { ...o.popup_text, body: value } }));
    };

    const popup_text_live = (e) => {
        set((state) => ({
            ...state,
            popup_text: { ...state.popup_text, live: !state.popup_text.live },
        }));
    };

    // ======================= POPUP SPONSOR ======================= //

    const popup_sponsor_live = (e) => {
        set((state) => ({
            ...state,
            popup_sponsor: {
                ...state.popup_sponsor,
                live: !state.popup_sponsor.live,
            },
        }));
    };

    // ======================= COUNTDOWN ======================= //

    const countdown_value = ({ currentTarget: { value } }) => {
        set((o) => ({
            ...o,
            countdown: { ...o.countdown, secs: parseInt(value) },
        }));
    };

    const countdown_live = (e) => {
        set((state) => ({
            ...state,
            countdown: { ...state.countdown, live: !state.countdown.live },
        }));
    };

    // ======================= Music ======================= //

    const music_title = ({ currentTarget: { value } }) => {
        set((o) => ({ ...o, music: { ...o.music, title: value } }));
    };
    const music_artist = ({ currentTarget: { value } }) => {
        set((o) => ({ ...o, music: { ...o.music, artist: value } }));
    };
    const music_live = (e) => {
        set((o) => ({ ...o, music: { ...o.music, live: !o.music.live } }));
    };

    // ======================= Music ======================= //
    const player_agents_live = (e) => {
        set((o) => ({
            ...o,
            match_current_player_agents: {
                ...o.match_current_player_agents,
                showIngame: !o.match_current_player_agents.showIngame,
            },
        }));
    };

    const apply = () => {
        ws.set_live_settings(form);
    };

    // ===================== JSX ========================= //
    return (
        <div className={c.root}>
            <Paper elevation={2} className="basic section">
                <Typography variant="h6">Text Popup</Typography>
                <TextField
                    color="secondary"
                    label={
                        <font style={{ color: "rgba(255,255,255,.5)" }}>
                            Headline
                        </font>
                    }
                    variant="filled"
                    size="small"
                    value={form.popup_text.head}
                    onChange={popup_text_head}
                />

                <TextField
                    color="secondary"
                    label={
                        <font style={{ color: "rgba(255,255,255,.5)" }}>
                            Body
                        </font>
                    }
                    variant="filled"
                    size="small"
                    multiline
                    rows={3}
                    rowsMax={10}
                    value={form.popup_text.body}
                    onChange={popup_text_body}
                />

                <Button
                    variant="contained"
                    color={form.popup_text.live ? "secondary" : "default"}
                    onClick={popup_text_live}>
                    {form.popup_text.live ? "Hide" : "Go Live"}
                </Button>
            </Paper>

            <Paper elevation={2} className="section timer">
                <Typography variant="h6">timer</Typography>
                <TextField
                    variant="filled"
                    value={form.countdown.secs}
                    onChange={countdown_value}
                    type="number"
                    label={
                        <font style={{ color: "rgba(255,255,255,.5)" }}>
                            Timer
                        </font>
                    }></TextField>
                <Button
                    variant="contained"
                    color={form.countdown.live ? "secondary" : "default"}
                    onClick={countdown_live}>
                    {form.countdown.live ? "Hide" : "Go Live"}
                </Button>
            </Paper>

            <Paper elevation={2} className="section timer">
                <Typography variant="h6">Music</Typography>
                <TextField
                    variant="filled"
                    value={form.music.title}
                    onChange={music_title}
                    label={
                        <font style={{ color: "rgba(255,255,255,.5)" }}>
                            Title
                        </font>
                    }></TextField>
                <TextField
                    variant="filled"
                    value={form.music.artist}
                    onChange={music_artist}
                    label={
                        <font style={{ color: "rgba(255,255,255,.5)" }}>
                            Artist
                        </font>
                    }></TextField>
                <Button
                    variant="contained"
                    color={form.music.live ? "secondary" : "default"}
                    onClick={music_live}>
                    {form.music.live ? "Hide" : "Go Live"}
                </Button>
            </Paper>

            <Paper elevation={2} className="section sponsors">
                <Typography variant="h6">Sponsors</Typography>

                <Button
                    variant="contained"
                    color={form.popup_sponsor.live ? "secondary" : "default"}
                    onClick={popup_sponsor_live}>
                    {form.popup_sponsor.live ? "Hide" : "Go Live"}
                </Button>
            </Paper>

            <Paper elevation={5} className="section">
                <Typography variant="h6">Player Agents</Typography>
                <Button
                    variant="contained"
                    color={
                        form.match_current_player_agents.showIngame
                            ? "secondary"
                            : "default"
                    }
                    onClick={player_agents_live}>
                    {form.match_current_player_agents.showIngame
                        ? "Hide"
                        : "Go Live"}
                </Button>
            </Paper>

            <Button variant="contained" color="primary" onClick={apply}>
                APPLY to Popups
            </Button>
        </div>
    );
};

export default ControlPopUps;
