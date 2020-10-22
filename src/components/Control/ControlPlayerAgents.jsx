import React, { useContext, useState, useEffect } from "react";
import {
    makeStyles,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormControlLabel,
    Switch,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";
import agents from "../../assets/agents.json";
import axios from "axios";
import isDev from "../../isDev";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import Save from "@material-ui/icons/Save";
import SettingsIcon from "@material-ui/icons/Settings";

const us = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up("sm")]: {
            "& .wrap": {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: 20,
            },
        },
        "& .team": {
            margin: theme.spacing(4, 0),
            "& .player": {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                margin: theme.spacing(2, 0),

                "& .player-name": {},
            },
        },
    },

    reset: { width: "100%" },

    btn: {
        margin: theme.spacing(1, 0),
    },
}));

const ControlPlayerAgents = () => {
    const ws = useContext(wsContext);
    const { match_current, match_current_player_agents, inverse } = useSelector(
        (state) => state.live
    );
    // const {
    //     TeamAPlayers: a = [],
    //     TeamBPlayers: b = [],
    //     player_agents = {
    //         a: [],
    //         b: [],
    //     },
    // } = match_current;
    const c = us();

    const [form, set] = useState({
        a: [],
        b: [],
        imgOnly: true,
        showLogoAsBG: true,
        showIngame: false,
    });

    useEffect(() => {
        if (
            !match_current.TeamAPlayers?.length &&
            !match_current.TeamBPlayers?.length
        ) {
            return;
        }
        set({
            a: [
                ...match_current.TeamAPlayers.map((p) => ({
                    name: p.Nickname,
                    id: p.EntityPlayerId,
                    isTeamCaptain: p.isTeamCaptain || false,
                    agent: "",
                })),
            ],
            b: [
                ...match_current.TeamBPlayers.map((p) => ({
                    name: p.Nickname,
                    id: p.EntityPlayerId,
                    isTeamCaptain: p.isTeamCaptain || false,
                    agent: "",
                })),
            ],
        });
    }, [set, match_current]);

    useEffect(() => {
        if (!match_current_player_agents) return;
        set(match_current_player_agents);
    }, [match_current_player_agents]);

    const changeAPlayerName = (id) => ({ currentTarget: { value } }) =>
        set((v) => ({
            ...v,
            a: [...v.a.map((p) => (p.id === id ? { ...p, name: value } : p))],
        }));

    const changeBPlayerName = (id) => ({ currentTarget: { value } }) => {
        set((v) => ({
            ...v,
            b: [...v.b.map((p) => (p.id === id ? { ...p, name: value } : p))],
        }));
    };

    const selectAgentA = (id) => ({ target: { value } }) => {
        set((v) => ({
            ...v,
            a: [...v.a.map((p) => (p.id === id ? { ...p, agent: value } : p))],
        }));
    };
    const selectAgentB = (id) => ({ target: { value } }) => {
        set((v) => ({
            ...v,
            b: [...v.b.map((p) => (p.id === id ? { ...p, agent: value } : p))],
        }));
    };

    const reset = () => {
        const cors = `${window.location.hostname}:8080/`;
        const headers = {
            "arena-api-key": "C434EDE3-2E7E-4B9D-A070-58B2CF94846D",
            "arena-login-token": "fd1e9e0d-3c25-4ccd-b6b5-9b70be315e18",
        };

        // prettier-ignore
        axios.get(`http://${isDev() ? cors: ''}polling.mogul.gg/api/tournament/match/${match_current.TournamentMatchId}/?LastUpdatedDateTime=`,{ headers })
            .then(({data: {Response :{TeamAPlayers, TeamBPlayers}}}) => {
                set({
                    a: [
                        ...TeamAPlayers.map((p) => ({
                            name: p.Nickname,
                            id: p.EntityPlayerId,
                            isTeamCaptain: p.isTeamCaptain || false,
                            agent: "",
                        })),
                    ],
                    b: [
                        ...TeamBPlayers.map((p) => ({
                            name: p.Nickname,
                            id: p.EntityPlayerId,
                            isTeamCaptain: p.isTeamCaptain || false,
                            agent: "",
                        })),
                    ],
                    imgOnly: true,
                    showLogoAsBG: true,
                });
            });
    };

    const save = () => {
        ws.set_live_settings({ match_current_player_agents: form });
    };

    const toggleImgOnly = ({ target: { checked, name } }) => {
        set((v) => ({ ...v, [name]: checked }));
    };
    const toggleLogoAsBG = (e) => {
        set((v) => ({ ...v, showLogoAsBG: !v.showLogoAsBG }));
    };

    const fixNames = () => {
        const namesFixed = {
            ...form,
            a: [
                ...form.a.map((p) => ({
                    ...p,
                    name: p.name
                        .replace(/\w+\s(\w+)/gi, "$1")
                        .replace(/(\w+)\s?#.*/gi, "$1"),
                })),
            ],
            b: [
                ...form.b.map((p) => ({
                    ...p,
                    name: p.name
                        .replace(/\w+\s(\w+)/gi, "$1")
                        .replace(/(\w+)\s?#.*/gi, "$1"),
                })),
            ],
        };

        ws.set_live_settings({ match_current_player_agents: namesFixed });
    };

    return (
        <div className={c.root}>
            <Button variant="contained" className={c.reset} onClick={reset}>
                Refresh / Reset
            </Button>
            <div className="wrap">
                <div className="team a">
                    <Typography variant="h6">
                        {match_current.EntityParticipantA.Profile.Nickname}
                    </Typography>

                    {form.a.map((player, i) => (
                        <div key={player.id} className="player">
                            <TextField
                                className="player-name"
                                variant="filled"
                                size="small"
                                color="primary"
                                onChange={changeAPlayerName(player.id)}
                                label={
                                    <font
                                        style={{
                                            color: "rgba(255,255,255,0.5",
                                        }}>{`player ${i + 1}`}</font>
                                }
                                value={player.name}
                            />

                            <FormControl
                                size="small"
                                variant="filled"
                                className="select">
                                <InputLabel
                                    style={{ color: "rgba(255,255,255,.5)" }}
                                    id="select-filled-label">
                                    Agent
                                </InputLabel>
                                <Select
                                    labelId="select-filled-label"
                                    label="Agent"
                                    value={player.agent}
                                    onChange={selectAgentA(player.id)}>
                                    {Object.keys(agents).map((a) => (
                                        <MenuItem
                                            dense
                                            key={a}
                                            value={a}
                                            style={{
                                                display: form.a
                                                    .map((aa) => aa.agent)
                                                    .includes(a)
                                                    ? "none"
                                                    : "",
                                            }}>
                                            {agents[a]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    ))}
                </div>
                <div className="team b">
                    <Typography variant="h6">
                        {match_current.EntityParticipantB.Profile.Nickname}
                    </Typography>

                    {form.b.map((player, i) => (
                        <div key={player.id} className="player">
                            <TextField
                                className="player-name"
                                variant="filled"
                                size="small"
                                label={
                                    <font
                                        style={{
                                            color: "rgba(255,255,255,0.5",
                                        }}>{`player ${i + 1}`}</font>
                                }
                                onChange={changeBPlayerName(player.id)}
                                value={player.name}
                            />

                            <FormControl
                                size="small"
                                variant="filled"
                                className="select">
                                <InputLabel
                                    style={{ color: "rgba(255,255,255,.5)" }}
                                    id="select-filled-label">
                                    Agent
                                </InputLabel>
                                <Select
                                    labelId="select-filled-label"
                                    label="Agent"
                                    value={player.agent}
                                    onChange={selectAgentB(player.id)}>
                                    {Object.keys(agents).map((a) => (
                                        <MenuItem
                                            dense
                                            key={a}
                                            value={a}
                                            style={{
                                                display: form.b
                                                    .map((aa) => aa.agent)
                                                    .includes(a)
                                                    ? "none"
                                                    : "",
                                            }}>
                                            {agents[a]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    ))}
                </div>
            </div>

            <FormControlLabel
                control={
                    <Switch
                        checked={Boolean(form.imgOnly)}
                        onChange={toggleImgOnly}
                        color="secondary"
                        name="imgOnly"
                    />
                }
                label="Use Image Only?"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={form.showLogoAsBG}
                        onChange={toggleLogoAsBG}
                        color="secondary"
                    />
                }
                label="Show logo as background image?"
            />

            <Button
                className={c.btn}
                style={{ width: "100%" }}
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={fixNames}>
                Fix the names
            </Button>

            <Button
                className={c.btn}
                variant="contained"
                size="small"
                startIcon={<SwapHorizIcon />}
                style={{ width: "100%" }}
                color={inverse ? "secondary" : "primary"}
                onClick={() => ws.set_live_settings({ inverse: !inverse })}>
                Swap Team Sides
            </Button>

            <Button
                className={c.btn}
                disabled={form === match_current_player_agents}
                style={{ width: "100%" }}
                variant="contained"
                startIcon={<Save />}
                onClick={save}>
                Save
            </Button>
        </div>
    );
};

export default ControlPlayerAgents;
