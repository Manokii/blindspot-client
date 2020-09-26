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

    const setLive = (key) => () => {
        set((o) => ({ ...o, [key]: { ...o[key], live: !o[key].live } }));
    };

    const apply = () => {
        Object.keys(form).forEach((key) => {
            if (form[key] === live[key]) return;
            ws.set_live_settings({ [key]: form[key] });
        });
        // ws.set_live_settings(form);
    };

    const setState = (key) => ({ currentTarget: { value, name, type } }) => {
        set((o) => ({
            ...o,
            [key]: {
                ...o[key],
                [name]:
                    type !== "number" ? value : value < 0 ? 0 : parseInt(value),
            },
        }));
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
                    name="head"
                    value={form.popup_text.head}
                    onChange={setState("popup_text")}
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
                    name="body"
                    value={form.popup_text.body}
                    onChange={setState("popup_text")}
                />

                <Button
                    variant="contained"
                    color={form.popup_text.live ? "secondary" : "default"}
                    onClick={setLive("popup_text")}>
                    {form.popup_text.live ? "Hide" : "Go Live"}
                </Button>
            </Paper>

            <Paper elevation={2} className="section timer">
                <Typography variant="h6">timer</Typography>
                <TextField
                    variant="filled"
                    value={form.countdown.secs}
                    onChange={setState("countdown")}
                    type="number"
                    name="secs"
                    label={
                        <font style={{ color: "rgba(255,255,255,.5)" }}>
                            Timer
                        </font>
                    }></TextField>
                <Button
                    variant="contained"
                    color={form.countdown.live ? "secondary" : "default"}
                    onClick={setLive("countdown")}>
                    {form.countdown.live ? "Hide" : "Go Live"}
                </Button>
            </Paper>

            <Paper elevation={2} className="section timer">
                <Typography variant="h6">Music</Typography>
                <TextField
                    variant="filled"
                    value={form.music.title}
                    onChange={setState("music")}
                    name="title"
                    label={
                        <font style={{ color: "rgba(255,255,255,.5)" }}>
                            Title
                        </font>
                    }></TextField>
                <TextField
                    variant="filled"
                    value={form.music.artist}
                    onChange={setState("music")}
                    name="artist"
                    label={
                        <font style={{ color: "rgba(255,255,255,.5)" }}>
                            Artist
                        </font>
                    }></TextField>
                <Button
                    variant="contained"
                    color={form.music.live ? "secondary" : "default"}
                    onClick={setLive("music")}>
                    {form.music.live ? "Hide" : "Go Live"}
                </Button>
            </Paper>

            <Paper elevation={2} className="section sponsors">
                <Typography variant="h6">Sponsors</Typography>

                <Button
                    variant="contained"
                    color={form.popup_sponsor.live ? "secondary" : "default"}
                    onClick={setLive("popup_sponsor")}>
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
                        ? "Now Livew"
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
