import React, { useContext } from "react";
import { wsContext } from "./WebsocketProvider";
import { useSelector } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import axios from "axios";
import isDev from "../isDev";

import "./cssAnimations.css";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, 200px)`,
        gridGap: `1ch`,
        justifyContent: "center",
    },
    match: {
        color: theme.palette.secondary.main,
        border: "1px solid rgba(0,0,0,.3)",
        borderRadius: 5,
        padding: theme.spacing(2, 2, 0, 2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        "& .options": {
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            display: "flex",
            backgroundColor: "#EF4958",
            opacity: 0,
            "& .option": {
                color: "#0C142A",
                flex: 1,
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                fontFamily: "Valorant",
                textAlign: "center",
                "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
            },
        },
        "&:hover": {
            "& .options": {
                opacity: 1,
            },
        },
        "& .scores": {
            display: "flex",
            justifyContent: "center",
            marginTop: theme.spacing(1),
            "& .valorantFont": {
                fontFamily: "Valorant",
                fontSize: 18,
            },
            "& .dash": { margin: theme.spacing(0, 1) },
            "& .score": { flex: 1 },
        },

        "& .teams": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& .vs": {
                fontFamily: "Anton",
                margin: theme.spacing(0, 2),
            },
            "& .logo": {
                height: 55,
                width: 55,
                borderRadius: 5,
                // border: "1px solid rgba(0,0,0,.1)",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Valorant",
                fontSize: 15,
                fontWeight: "bold",
            },
        },
    },
}));

const MatchesWidget = ({ options }) => {
    const ws = useContext(wsContext);
    const classes = useStyles();
    const {
        match_widgets: matches,
        match_current: current,
        match_current_player_agents: playerAgents,
    } = useSelector((state) => state.live);

    const getAcronym = (word) => {
        let matches = word.match(/\b(\w)/g).join("");
        return matches;
    };

    const addLogo = (url) => {
        if (url) return { backgroundImage: `url(${url})` };
        return {
            backgroundColor: "#EF4958",
            color: "#0C142A",
            borderRadius: "5px",
            transform: "scale(0.9)",
        };
    };

    const setCurrentMatch = (id) => {
        ws.set_live_settings({ is_current_match_polling: false });
        const cors = `${window.location.hostname}:8080/`;
        const headers = {
            "arena-api-key": "C434EDE3-2E7E-4B9D-A070-58B2CF94846D",
            "arena-login-token": "fd1e9e0d-3c25-4ccd-b6b5-9b70be315e18",
        };
        // prettier-ignore
        axios.get(`http://${isDev() ? cors : ''}polling.mogul.gg/api/tournament/match/${id}/?LastUpdatedDateTime=`, {headers})
            .then(({ data:{Response: match_current} }) => {

                const {TeamAPlayers, TeamBPlayers} = match_current
                ws.set_live_settings({
                    match_current, 
                    match_current_player_agents: {
                        ...playerAgents,
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
                    }
                })
                console.log(match_current)
            });
    };

    return (
        <div>
            <TransitionGroup className={classes.root}>
                {matches.map(
                    // prettier-ignore
                    ({
                    TournamentMatchExtendedStateId: state,
                    EntityParticipantA: a,
                    EntityParticipantB: b,
                    RoundLevelTypeId: bracket,
                    RoundNumber: roundNumber,
                    MatchNumber: matchNumber,
                    ScheduledStartDateTime: startTime,
                    TournamentMatchId: id
                }, index) => (
                    <CSSTransition key={id} timeout={1000} classNames="match">
                        <div key={index} className={classes.match} style={{border: current?.TournamentMatchId === id ? '2px solid black': ''}} >
                            <div className="teams">
                                <div className="logo" style={addLogo(a.Profile.LogoUrl)}>{!a.Profile.LogoUrl ? getAcronym(a.Profile.DisplayName) : ''}</div>
                                <Typography className="vs">VS</Typography>
                                <div className="logo" style={addLogo(b.Profile.LogoUrl)}>{!b.Profile.LogoUrl ? getAcronym(b.Profile.DisplayName) : ''}</div>
                            </div>
                            <div className="scores">
                                <div style={{textAlign: 'right'}} className="score valorantFont">{a.Score}</div>
                                <Typography className="dash valorantFont">-</Typography>
                                <div className="score valorantFont">{b.Score}</div>
                            </div>
                            {options.allowControl && <div className="options">
                                <div className="option" onClick={() => setCurrentMatch(id)}>Select this match</div>
                                <div className="option" onClick={() => ws.remove_match_widget(id)}><DeleteOutlineIcon /></div>
                            </div>}
                        </div>
                    </CSSTransition>
                )
                )}
            </TransitionGroup>
        </div>
    );
};

export default MatchesWidget;
