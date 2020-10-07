import React, { useState, useEffect, useContext } from "react";
import {
    Button,
    makeStyles,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",

        "& .container": {
            display: "flex",
            flexDirection: "column",
            maxHeight: 330,
            overflowY: "auto",
            padding: theme.spacing(2),

            "&:hover": {
                "&::-webkit-scrollbar": {
                    "&-thumb": {
                        backgroundColor: "rgba(255,255,255,.5)",
                    },
                },
            },

            "&::-webkit-scrollbar": {
                width: 10,

                "&-thumb": {
                    borderRadius: 5,
                    backgroundColor: "rgba(255,255,255,.1)",
                    border: "2px solid #2f3e46",
                    transition: "all 300ms ease-in-out",
                },
            },
        },

        "& .select": {
            margin: theme.spacing(2, 0),
        },

        "& .scores": {
            display: "flex",
            flexDirection: "column",
            margin: theme.spacing(0, 0, 2, 0),
        },

        "& .section": {
            margin: theme.spacing(1, 0),
            backgroundColor: "transparent",
        },
        "& .btns": {
            padding: theme.spacing(2),
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: theme.spacing(1),
            display: "flex",
            flexDirection: "column",
            margin: theme.spacing(2),
        },
    },
}));

const ControlPreviousMatches = () => {
    const c = q();
    const ws = useContext(wsContext);
    const live = useSelector((state) => state.live);
    const { previous_matches = [], match_widgets: matches = [] } = live;
    const [series, set] = useState([]);

    useEffect(() => {
        if (live.previous_matches?.length === 0) return set([]);
        set(live?.previous_matches || []);
    }, [live]);

    const addGame = (e) => {
        set((state) => [
            ...state,
            {
                headline: "",
                matchId: "",
                a: { score: 0 },
                b: { score: 0 },
                live: false,
            },
        ]);
    };

    const clear = (e) => {
        set([]);
    };

    const apply = (e) => {
        ws.set_live_settings({ previous_matches: series });
    };

    const setAScore = (index) => ({ currentTarget: { value } }) => {
        set((state) => [
            ...state.map((v, i) =>
                i !== index
                    ? v
                    : { ...v, a: { ...v.a, score: value < 0 ? 0 : value } }
            ),
        ]);
    };
    const setBScore = (index) => ({ currentTarget: { value } }) => {
        set((state) => [
            ...state.map((v, i) =>
                i !== index
                    ? v
                    : { ...v, b: { ...v.b, score: value < 0 ? 0 : value } }
            ),
        ]);
    };

    const goLive = (index) => (e) => {
        set((state) => [
            ...state.map((v, i) => (i !== index ? v : { ...v, live: !v.live })),
        ]);
    };

    const deleteGame = (index) => (e) => {
        set((state) => [...state.filter((v, i) => i !== index)]);
    };

    const goLiveAll = (e) => {
        set((state) => [...state.map((v) => ({ ...v, live: true }))]);
    };

    const goOfflineAll = (e) => {
        set((state) => [...state.map((v) => ({ ...v, live: false }))]);
    };

    const setHeadline = (index) => ({ currentTarget: { value } }) => {
        set((state) => [
            ...state.map((v, i) =>
                i !== index ? v : { ...v, headline: value }
            ),
        ]);
    };

    const selectMatch = (index) => ({ target: { value } }) => {
        set((state) => [
            ...state.map((v, i) =>
                i !== index ? v : { ...v, matchId: parseInt(value) }
            ),
        ]);
    };

    const findMatch = (id) => {
        const match = matches.find((m) => m.TournamentMatchId === parseInt(id));
        return `${match?.EntityParticipantA?.Profile?.DisplayName} VS ${match?.EntityParticipantB?.Profile?.DisplayName}`;
    };
    return (
        <div className={c.root}>
            <div className="container">
                {series.map((game, i) => (
                    <Paper key={i} elevation={2} className="section">
                        <TextField
                            variant="filled"
                            value={game.headline}
                            onChange={setHeadline(i)}
                            label={
                                <font style={{ color: "rgba(255,255,255,.5)" }}>
                                    Headline Text
                                </font>
                            }
                        />

                        <FormControl
                            size="small"
                            variant="outlined"
                            className="select">
                            <InputLabel
                                style={{ color: "rgba(255,255,255,.5)" }}
                                id="match-select-outlined-label">
                                Match
                            </InputLabel>
                            <Select
                                labelId="match-select-outlined-label"
                                label="Match"
                                value={game.matchId}
                                onChange={selectMatch(i)}>
                                {matches.map(({ TournamentMatchId }) => (
                                    <MenuItem
                                        key={TournamentMatchId}
                                        value={TournamentMatchId}>
                                        {findMatch(TournamentMatchId)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div className="scores">
                            <TextField
                                disabled={!game.matchId}
                                variant="filled"
                                value={game.a.score}
                                onChange={setAScore(i)}
                                type="number"
                                label={
                                    <font
                                        style={{
                                            color: "rgba(255,255,255,.5)",
                                        }}>
                                        Left Team Score
                                    </font>
                                }
                            />
                            <TextField
                                disabled={!game.matchId}
                                variant="filled"
                                value={game.b.score}
                                onChange={setBScore(i)}
                                type="number"
                                label={
                                    <font
                                        style={{
                                            color: "rgba(255,255,255,.5)",
                                        }}>
                                        Right Team Score
                                    </font>
                                }
                            />
                        </div>
                        <Button
                            onClick={goLive(i)}
                            variant="outlined"
                            color={game.live ? "secondary" : "default"}
                            startIcon={
                                game.live ? <CheckCircleIcon /> : <CancelIcon />
                            }>
                            {game.live ? "Now Live" : "Offline"}
                        </Button>

                        <Button
                            onClick={deleteGame(i)}
                            variant="outlined"
                            color="secondary"
                            startIcon={<DeleteForeverIcon />}>
                            Delete
                        </Button>
                    </Paper>
                ))}
            </div>

            <Button
                onClick={addGame}
                color="default"
                variant="contained"
                startIcon={<AddCircleIcon />}>
                Add Game
            </Button>

            <Button
                disabled={
                    series === previous_matches ||
                    series.some((g) => !g.matchId)
                }
                onClick={apply}
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}>
                Apply
            </Button>
            <div className="btns">
                <Button
                    onClick={goLiveAll}
                    disabled={series.every((g) => g.live)}
                    color="primary"
                    variant="contained"
                    startIcon={<VideocamIcon />}>
                    Go Live All
                </Button>
                <Button
                    onClick={goOfflineAll}
                    disabled={series.every((g) => !g.live)}
                    color="secondary"
                    variant="contained"
                    startIcon={<VideocamOffIcon />}>
                    Go Offline All
                </Button>
            </div>
            <Button
                style={{ marginTop: 20 }}
                onClick={clear}
                color="secondary"
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}>
                Clear All
            </Button>
        </div>
    );
};

export default ControlPreviousMatches;
