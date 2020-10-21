import React, { useContext, useState, useEffect } from "react";
import {
    makeStyles,
    Typography,
    TextField,
    Button,
    Paper,
    FormControlLabel,
    Switch,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import SaveIcon from "@material-ui/icons/Save";

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
        match_current_player_agents,
        inverse,
    } = live;
    const [form, set] = useState({
        popup_text: {
            head: "Did you know?",
            body: "",
            live: false,
        },
        popup_sponsor: {
            live: false,
            showAd: false,
            ad: "globe",
        },
        countdown: {
            secs: 600,
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
        if (!match_current_player_agents) return;
        set((f) => ({
            ...f,
            match_current_player_agents: match_current_player_agents,
        }));
    }, [match_current_player_agents]);

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

    const setState = (key) => ({ target: { value, name, type } }) => {
        set((o) => ({
            ...o,
            [key]: {
                ...o[key],
                [name]:
                    type !== "number" ? value : value < 0 ? 0 : parseInt(value),
            },
        }));
    };

    const setChecked = (key) => ({
        currentTarget: { checked, name, type },
    }) => {
        set((o) => ({
            ...o,
            [key]: {
                ...o[key],
                [name]: checked,
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

            {/* =============================== SPONSORS =============================== */}

            <Paper elevation={2} className="section sponsors">
                <Typography variant="h6">Sponsors</Typography>

                <FormControlLabel
                    control={
                        <Switch
                            checked={form.popup_sponsor.showAd}
                            onChange={setChecked("popup_sponsor")}
                            name="showAd"
                        />
                    }
                    label="Show Ad"
                />

                {form.popup_sponsor.showAd && (
                    <FormControl variant="filled">
                        <InputLabel id="select-label">Select Ad</InputLabel>
                        <Select
                            labelId="select-label"
                            id="ad"
                            value={form.popup_sponsor.ad}
                            onChange={setState("popup_sponsor")}
                            name="ad">
                            <MenuItem value={"globe"}>Globe</MenuItem>
                            <MenuItem value={"legion"}>Legion | Intel</MenuItem>
                            <MenuItem value={"xsplit"}>XSplit</MenuItem>
                            <MenuItem value={"music"}>$auceboss</MenuItem>
                        </Select>
                    </FormControl>
                )}

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

            <Button
                variant="contained"
                color={inverse ? "secondary" : "primary"}
                startIcon={<SwapHorizIcon />}
                onClick={() => ws.set_live_settings({ inverse: !inverse })}>
                Swap Sides
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={apply}
                startIcon={<SaveIcon />}>
                APPLY to Popups
            </Button>
        </div>
    );
};

export default ControlPopUps;
