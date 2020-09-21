import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import awin1 from "../../assets/awin1.png";
import bwin1 from "../../assets/bwin1.png";
import bo3 from "../../assets/bo3_bars.png";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: 1920,
        height: 1080,
        display: "flex",
        justifyContent: "center",

        "& .scores": {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",

            "& .bo3-bars": { backgroundImage: `url(${bo3})` },

            "& .score": {
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            },

            "& .a": { backgroundImage: `url(${awin1})` },
            "& .b": { backgroundImage: `url(${bwin1})` },
        },
        "& .topbar": {
            position: "absolute",
            top: 0,
            width: 1400,
            height: 50,
            display: "flex",

            "& .team": {
                flex: 1,
                display: "flex",

                "& .score": {
                    fontFamily: "Tungsten",
                    color: "white",
                    width: 60,
                    textAlign: "center",
                    margin: "auto 50px",
                    display: "flex",
                    justifyContent: "center",
                    transform: "translateY(-3px)",
                },

                "& .logo": {
                    height: 50,
                    width: 50,
                    margin: "0 50px",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    fontFamily: "Tungsten",
                    fontSize: "2.3rem",
                    // fontColor: ''
                    color: theme.palette.secondary.main,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

                "& .team-name": {
                    height: 40,
                    flex: 1,
                    fontFamily: "Tungsten",
                    textTransform: "uppercase",
                    transform: "translateY(-4px)",
                    overflow: "hidden",
                },
            },
            "& .a": {
                flexDirection: "row-reverse",
                "& .team-name": {
                    textAlign: "left",
                    margin: "0 50px 0 30px",
                },
            },
            "& .b": {
                flexDirection: "row",
                "& .team-name": {
                    textAlign: "right",
                    margin: "0 30px 0 50px",
                },
            },
        },
    },
}));

const LiveIngame = () => {
    const classes = useStyles();
    const live = useSelector((state) => state.live);
    const { match_current, inverse = false, maps } = live;

    const { EntityParticipantA: a, EntityParticipantB: b } = match_current;

    const LogoCheck = (teamProfile) => {
        try {
            let src = require(`../../assets/${teamProfile?.Nickname.toLowerCase()}.png`);
            console.log(src);
            return src.replace(" ", "_");
        } catch (err) {
            return teamProfile?.LogoUrl;
        }
    };

    const getAcronym = (word) => {
        const word2 = word.match(/\b(\w)/g).join("");
        return word2.toUpperCase();
    };

    return (
        <div className={classes.root}>
            <div className="topbar">
                <div className="team a">
                    <div className="score" variant="h3"></div>
                    <Typography
                        className="team-name"
                        style={{ color: "white" }}
                        variant="h4">
                        {inverse
                            ? b?.Profile.DisplayName
                            : a?.Profile.DisplayName}
                    </Typography>

                    <div
                        className="logo"
                        style={{
                            backgroundImage: `url(${LogoCheck(
                                inverse ? b?.Profile : a?.Profile
                            )})`,
                        }}>
                        {!inverse
                            ? !a?.Profile.LogoUrl &&
                              a?.Profile.DisplayName &&
                              getAcronym(a?.Profile?.DisplayName)
                            : !b?.Profile.LogoUrl &&
                              b?.Profile.DisplayName &&
                              getAcronym(b?.Profile?.DisplayName)}
                    </div>
                </div>
                <div className="team b">
                    <div className="score" variant="h3"></div>
                    <Typography
                        className="team-name"
                        style={{ color: "white" }}
                        variant="h4">
                        {inverse
                            ? a?.Profile.DisplayName
                            : b?.Profile.DisplayName}
                    </Typography>
                    <div
                        className="logo"
                        style={{
                            backgroundImage: `url(${LogoCheck(
                                inverse ? a?.Profile : b?.Profile
                            )})`,
                        }}>
                        {!inverse
                            ? !b?.Profile.LogoUrl &&
                              b?.Profile.DisplayName &&
                              getAcronym(b?.Profile?.DisplayName)
                            : !a?.Profile.LogoUrl &&
                              a?.Profile.DisplayName &&
                              getAcronym(a?.Profile?.DisplayName)}
                    </div>
                </div>
            </div>
            {maps?.bestOf === "bo3" && (
                <div className="scores">
                    <div className="bo3-bars score"></div>
                    {parseInt(a?.Score) > 0 &&
                        (!inverse ? (
                            <div className="score a"></div>
                        ) : (
                            <div className="score b"></div>
                        ))}
                    {parseInt(b?.Score) > 0 &&
                        (!inverse ? (
                            <div className="score b"></div>
                        ) : (
                            <div className="score a"></div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default LiveIngame;
