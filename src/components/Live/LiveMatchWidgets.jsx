import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useSelector } from "react-redux";

const us = makeStyles((theme) => ({
    root: {
        width: 1920,
        height: 1080,
        overflow: "hidden",
        position: "relative",
        display: "flex",
    },
    headline: {
        position: "absolute",
        right: 0,
        width: 385,
        maxHeight: 836,
        marginTop: 50,
        height: 75,
        fontFamily: "Tungsten",
        letterSpacing: 2,
        color: "white",
        textAlign: "center",
        textTransform: "uppercase",
    },
    box: {
        position: "absolute",
        right: 0,
        width: 385,
        maxHeight: 750,
        top: 150,
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: 30,
        overflow: "hidden",
        justifyItems: "center",
    },
    item: {
        "&:last-of-type": {
            borderBottom: "none",
        },

        backgroundColor: "rgba(12, 21, 44, 0.9)",
        borderRadius: 10,
        width: 325,
        height: 162,
        // backgroundColor: "#0C142A",
        // border: "4px solid #EF4958",
        color: "white",
        display: "flex",
        flexDirection: "column",
        paddingBottom: theme.spacing(5),

        "& .scores": {
            display: "flex",
            opacity: 0.75,
            paddingBottom: theme.spacing(2),
            "& .score": {
                fontFamily: "Gotham Pro",
                flex: 1,
                display: "flex",
            },

            "& .a": {
                justifyContent: "flex-end",
            },

            "& .dash": {
                padding: theme.spacing(0, 2),
                display: "flex",
            },
        },

        "& .top": {
            display: "flex",
            height: 120,
            width: 325,
            justifyContent: "space-between",
            alignItems: "center",
            "& .team": {
                display: "flex",
                height: 120,
                width: 120,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transform: "scale(0.7)",

                borderRadius: "10px",

                fontFamily: "Tungsten",
                fontSize: "5rem",
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
            },
            "& .vs": {
                fontFamily: "Tungsten",
            },
        },
    },
}));

const LiveMatchWidgets = () => {
    const classes = us();
    const { match_widgets } = useSelector((state) => state.live);
    const [showHeadline, set] = useState(false);

    useEffect(() => {
        if (!match_widgets?.length) return set(false);
        set(true);
    }, [match_widgets]);

    const addLogo = (url) => {
        if (url) return { backgroundImage: `url(${url})` };
        return {
            backgroundColor: "#EF4958",
            color: "#0C142A",
        };
    };

    const checkIfLogoExists = (teamProfile, side) => {
        try {
            let src = require(`../../assets/${teamProfile?.Nickname.toLowerCase()}.png`);
            console.log(src);
            return src.replace(" ", "_");
        } catch (err) {
            return teamProfile?.LogoUrl;
        }
    };

    const getAcronym = (word) => {
        let matches = word.match(/\b(\w)/g).join("");
        return matches.toUpperCase();
    };

    return (
        <div className={classes.root}>
            {showHeadline && (
                <Typography variant="h2" className={classes.headline}>
                    Matches
                </Typography>
            )}
            <TransitionGroup className={classes.box}>
                {match_widgets.map(
                    ({
                        TournamentMatchExtendedStateId: state,
                        EntityParticipantA: a,
                        EntityParticipantB: b,
                        RoundLevelTypeId: bracket,
                        RoundNumber: roundNumber,
                        MatchNumber: matchNumber,
                        ScheduledStartDateTime: startTime,
                        TournamentMatchId: id,
                    }) =>
                        // prettier-ignore
                        <CSSTransition key={id} classNames="match" className={classes.item}  timeout={1000}>
                            <div>
                                <div className="top">
                                    <div className="team a" style={addLogo(checkIfLogoExists(a.Profile))}>{!a.Profile.LogoUrl && getAcronym(a.Profile.DisplayName)}</div>
                                    <Typography variant="h3" className="vs">VS</Typography> 
                                    <div className="team a" style={addLogo(checkIfLogoExists(b.Profile))}>{!b.Profile.LogoUrl && getAcronym(b.Profile.DisplayName)}</div>
                                </div>

                                <div className="scores">
                                    <Typography variant="h5" className="score a">{a.Score}</Typography>
                                    <Typography variant="h5" className="dash">—</Typography>
                                    <Typography variant="h5" className="score b">{b.Score}</Typography>
                                </div>
                            </div>
                        </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default LiveMatchWidgets;
