import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Transition } from "react-spring/renderprops";
import { useSelector } from "react-redux";
import paper from "../../assets/paper1.jpg";
import tape2 from "../../assets/tape2.png";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        height: 1080,
        width: 1920,
        padding: 20,

        "& .match": {
            height: 125,
            width: 300,
            marginTop: theme.spacing(1),
            display: "flex",
            flexDirection: "column",

            "& .headline": {
                height: 56,
                padding: theme.spacing(1),
                textAlign: "center",
                // transform: "translateY(40%)",
                backgroundColor:theme.palette.secondary.main
            },

            "& .wrap": {
                display: "flex",
                padding: theme.spacing(2),
                justifyContent: "space-between",
                alignItems: "center",
                
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: 'rgba(13, 10, 32, .9)',
                "& .team": {
                    height: 80,
                    width: 80,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    flexShrink: 0,
                },

                "& .vs": {
                    fontFamily: "Tungsten",
                    color: "#fff",
                    fontSize: 35,
                    fontWeight: "bold",
                },
            },
        },
    },
}));

const LivePreviousMatches = () => {
    const { previous_matches = [], match_widgets: matches = [] } = useSelector(
        (state) => state.live
    );
    const c = q();

    const gitTeamA = (matchId) => {
        return matches.find(
            (match) => match.TournamentMatchId === parseInt(matchId)
        )?.EntityParticipantA;
    };

    const gitTeamB = (matchId) => {
        return matches.find(
            (match) => match.TournamentMatchId === parseInt(matchId)
        )?.EntityParticipantB;
    };

    const gitLogo = (profile) => {
        try {
            let src = require(`../../assets/${profile.DisplayName.toLowerCase().replace(
                " ",
                "_"
            )}.png`);
            return src;
        } catch (err) {
            return profile.LogoUrl;
        }
    };
    return (
        <div className={c.root}>
            <Transition
                items={previous_matches.filter((m) => m.live)}
                keys={(v, i) => i}
                from={{
                    opacity: 0,
                    height: 0,
                    transform: "translateX(40px)",
                }}
                enter={[
                    { height: 160 },
                    {
                        opacity: 1,
                        transform: "translateX(0px)",
                    },
                ]}
                leave={[
                    {
                        transform: "translateX(40px)",
                        opacity: 0,
                    },
                    { height: 0 },
                ]}
                trail={100}>
                {({
                    headline,
                    matchId: id,
                    a = { score: 0 },
                    b = { score: 0 },
                }) => (props) => (
                    <div style={props} className="match">
                        <Typography className="headline" variant="h4">
                            {headline ? headline : 'Match Result'}
                        </Typography>

                        <div className="wrap">
                            <div
                                className="team a"
                                style={{
                                    backgroundImage: `url(${gitLogo(
                                        gitTeamA(id).Profile
                                    )})`,
                                }}></div>
                            <div className="vs">
                                {a.score} - {b.score}
                            </div>
                            <div
                                className="team b"
                                style={{
                                    backgroundImage: `url(${gitLogo(
                                        gitTeamB(id).Profile
                                    )})`,
                                }}></div>
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    );
};

export default LivePreviousMatches;
