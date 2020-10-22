import React, { useContext, useState } from "react";
import { makeStyles, Typography, TextField, Button } from "@material-ui/core";
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
            a: new Array(5)
                .fill({ name: "", id: 0, isTeamCaptain: false, agent: "" })
                .map((p, i) => ({
                    name: `Player ${i + 1}`,
                    id: i + 1,
                    isTeamCaptain: false,
                    agent: "",
                })),
            b: new Array(5)
                .fill({ name: "", id: 0, isTeamCaptain: false, agent: "" })
                .map((p, i) => ({
                    name: `Player ${i + 1}`,
                    id: i + 1,
                    isTeamCaptain: false,
                    agent: "",
                })),

            imgOnly: true,
            showLogoAsBG: true,
            showIngame: false,
        },
    });

    const changeTeamName = (team) => ({ currentTarget: { value } }) => {
        set({
            ...state,
            match_current: {
                ...state.match_current,
                EntityParticipantA:
                    team === "a"
                        ? {
                              ...state.match_current.EntityParticipantA,
                              Profile: {
                                  ...state.match_current.EntityParticipantA
                                      .Profile,
                                  Nickname: value,
                                  DisplayName: value,
                              },
                          }
                        : state.match_current.EntityParticipantA,
                EntityParticipantB:
                    team === "b"
                        ? {
                              ...state.match_current.EntityParticipantB,
                              Profile: {
                                  ...state.match_current.EntityParticipantB
                                      .Profile,
                                  Nickname: value,
                                  DisplayName: value,
                              },
                          }
                        : state.match_current.EntityParticipantB,
            },
        });
    };

    const changePlayer = ({ team, player }) => ({
        currentTarget: { value },
    }) => {
        set({
            ...state,
            match_current_player_agents: {
                a:
                    team === "a"
                        ? [
                              ...state.match_current_player_agents.a.map((p) =>
                                  p !== player ? p : { ...p, name: value }
                              ),
                          ]
                        : state.match_current_player_agents.a,
                b:
                    team === "b"
                        ? [
                              ...state.match_current_player_agents.b.map((p) =>
                                  p !== player ? p : { ...p, name: value }
                              ),
                          ]
                        : state.match_current_player_agents.b,
            },
        });
    };

    const save = () => {
        ws.set_live_settings(state);
    };

    return (
        <div className={classes.manualInput}>
            <div className="wrapper">
                <Typography variant="button">Team A</Typography>
                <div className="section">
                    <TextField
                        size="small"
                        variant="filled"
                        label="Team Name"
                        value={
                            state.match_current.EntityParticipantA.Profile
                                .DisplayName
                        }
                        onChange={changeTeamName("a")}
                    />

                    <div className="section players">
                        {state.match_current_player_agents.a.map(
                            (player, i) => (
                                <TextField
                                    key={i}
                                    className="player"
                                    size="small"
                                    variant="filled"
                                    label={`Player ${i + 1} Name`}
                                    value={player.name}
                                    onChange={changePlayer({
                                        team: "a",
                                        player,
                                    })}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <Typography variant="button">Team B</Typography>
                <div className="section">
                    <TextField
                        size="small"
                        variant="filled"
                        label="Team Name"
                        value={
                            state.match_current.EntityParticipantB.Profile
                                .DisplayName
                        }
                        onChange={changeTeamName("b")}
                    />

                    <div className="section players">
                        {state.match_current_player_agents.b.map(
                            (player, i) => (
                                <TextField
                                    key={i}
                                    className="player"
                                    size="small"
                                    variant="filled"
                                    label={`Player ${i + 1} Name`}
                                    value={player.name}
                                    onChange={changePlayer({
                                        team: "b",
                                        player,
                                    })}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
            <Button color="primary" variant="contained" onClick={save}>
                Save
            </Button>
        </div>
    );
};

export default ControlManualInput;
