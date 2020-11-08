import React, { useContext, useState } from "react";
import {
    makeStyles,
    Typography,
    TextField,
    Button,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
} from "@material-ui/core";
import { wsContext } from "../WebsocketProvider";

const useStyles = makeStyles((theme) => ({
    manualInput: {
        display: "flex",
        flexDirection: "column",
        "& .wrapper": {
            display: "flex",
            flexDirection: "column",
            margin: theme.spacing(2),

            "& .players": {
                marginTop: theme.spacing(1),
                backgroundColor: "transparent",

                "& .player": {
                    margin: theme.spacing(0.5, 0),
                },
            },
        },
    },
}));

const ControlManualInput = () => {
    const classes = useStyles();
    const ws = useContext(wsContext);
    const [selected, select] = useState(0);
    const [selectedB, selectB] = useState(0);
    const [state, set] = useState({
        match_current: {
            TournamentMatchId: 0,
            EntityParticipantA: {
                Id: 0,
                Score: 0,
                Profile: {
                    Nickname: "Team A",
                    DisplayName: "Team A",
                    LogoUrl: null,
                },
            },
            EntityParticipantB: {
                Id: 0,
                Score: 0,
                Profile: {
                    Nickname: "Team B",
                    DisplayName: "Team B",
                    LogoUrl: null,
                },
            },
        },
        match_current_player_agents: {
            a: [],
            b: [],
            imgOnly: true,
            showLogoAsBG: true,
            showIngame: false,
        },
    });

    const teams = [
        {
            name: "Goin Bulilit",
            shortName: "GB",
            players: ["beats", "Borkum", "JG", "Kachow", "Nash"],
        },
        {
            name: "Jillians Angels",
            shortName: "JA",
            players: [
                "Calamitus",
                "Dispenser",
                "Jillian",
                "Yondaime",
                "YoungPork",
            ],
        },
        {
            name: "The Vashers",
            shortName: "TV",
            players: [
                "JessieVash",
                "JustinWeaver",
                "Lax",
                "SUPERMJ",
                "TONYBANKS",
            ],
        },
        {
            name: "Bren Esmurfs",
            shortName: "BE",
            players: ["Ching", "Luc1d", "Shang", "Rabbet", "Jawnilla"],
        },
        {
            name: "Wolfpack",
            shortName: "WOLF",
            players: ["cms", "Nexi", "Reika", "WhoMe", "Wrecker"],
        },
        {
            name: "KAKAJAYAHAPSTEP",
            shortName: "KKAHS",
            players: ["Dubstep", "Haps", "Ayaa", "Kaja", "Kaka"],
        },
        {
            name: "Bren & M",
            shortName: "BM",
            players: ["Burg", "Ejay", "Mikkasie", "Narpim", "Realist"],
        },
        {
            name: "Gibo & Friends",
            shortName: "G&F",
            players: ["Foods", "Gibo", "Tr1cks", "Trix", "Gado"],
        },
    ];

    const save = () => {
        ws.set_live_settings(state);
    };

    const handleChange = ({ target: { name, value } }) => {
        if (name === "a") {
            select(value);
        } else {
            selectB(value);
        }
        set({
            match_current: {
                ...state.match_current,
                [name === "a" ? "EntityParticipantA" : "EntityParticipantB"]: {
                    Id: 0,
                    Score: 0,
                    Profile: {
                        Nickname: teams[value].name,
                        DisplayName: teams[value].name,
                        LogoUrl: null,
                    },
                },
                [name === "a" ? "aShortname" : "bShortname"]: teams[value]
                    .shortName,
            },
            match_current_player_agents: {
                ...state.match_current_player_agents,
                [name]: teams[value].players.map((p, i) => ({
                    name: p,
                    id: i + 1,
                    isTeamCaptain: false,
                    agent: "",
                })),
            },
        });
    };
    return (
        <div className={classes.manualInput}>
            <div className="wrapper">
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-label">Team A</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selected}
                        name="a"
                        onChange={handleChange}>
                        {teams.map((team, i) => (
                            <MenuItem key={i} value={i}>
                                {team.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="wrapper">
                <Typography variant="button">Team B</Typography>

                <FormControl className={classes.formControl}>
                    <InputLabel id="select-label">Team A</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selectedB}
                        name="b"
                        onChange={handleChange}>
                        {teams.map((team, i) => (
                            <MenuItem key={i} value={i}>
                                {team.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <Button
                color="primary"
                variant="contained"
                onClick={save}
                disabled={
                    !state.match_current_player_agents.a.length &&
                    !state.match_current_player_agents.b.length
                }>
                Save
            </Button>
        </div>
    );
};

export default ControlManualInput;
