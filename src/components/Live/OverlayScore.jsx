import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import clsx from "clsx";
import topOverlay from "../../assets/top-overlay.png";

const q = makeStyles((theme) => ({
    root: {
        width: 1920,
        height: 1080,
        position: "relative",
        display: "flex",
        justifyContent: "center",

        "& .bar": {
            // marginTop: 72,
            // marginLeft: 2,
            height: 50,
            width: 1408,
            display: "flex",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundImage: `url(${topOverlay})`,
            "& .a": {
                marginRight: 32,
                flexDirection: "row-reverse",

                "& .score": {
                    transform: "skewX(25deg) translate(-10px, -2px)",
                    flexDirection: "row-reverse",
                },

                "& .shortname": {
                    justifyContent: "flex-start",
                    transform: "translateX(-20px)",
                },

                "& .logo-wrap": { transform: "translate(-55px)" },
            },
            "& .b": {
                marginLeft: 32,

                "& .shortname": {
                    justifyContent: "flex-end",

                    transform: "translateX(20px)",
                },

                "& .score": {
                    transform: "skewX(-25deg)  translate(10px, -2px)",
                },
                "& .logo-wrap": { transform: "translate(55px)" },
            },

            "& .team": {
                height: "100%",
                flex: 1,
                display: "flex",
                // alignItems: "center",

                "& .logo-wrap": {
                    height: 50,
                    width: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .logo": {
                        height: 48,
                        width: 100,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        // backgroundColor: "blue",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "bolder",
                        fontFamily: "Tungsten",
                        wordBreak: "break-all",
                        lineHeight: "1rem",
                        textAlign: "center",
                        borderRadius: 5,
                    },
                },

                "& .shortname": {
                    display: "flex",
                    alignItems: "center",
                    width: 350,
                    color: "#fff",
                    height: 30,
                    fontFamily: "Tungsten",
                    letterSpacing: "1pt",
                    fontSize: "1.5rem",
                },

                "& .score": {
                    width: 67,
                    height: 48,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .score-bar": {
                        backfaceVisibility: "hidden",
                        height: 29,
                        width: 10,
                        // border: "1px solid rgba(0,0,0,.6)",
                        // boxShadow: "inset 0 0 3px #000",
                        backgroundColor: "rgba(255,255,255,.3)",
                        margin: "0px 4px",
                    },

                    "& .win": {
                        backgroundColor: "#fff",
                        // background:
                        //     "linear-gradient(0deg, rgba(189,112,3,1) 0%, rgba(255,252,0,1) 100%)",
                    },
                },
            },
        },
    },
}));

const LiveScore = () => {
    const c = q();
    const {
        match_current: match = {},
        maps = { bestOf: "bo1" },
        inverse,
    } = useSelector((state) => state.live);

    const {
        EntityParticipantA: a = {
            Score: 0,
        },
        EntityParticipantB: b = {
            Score: 0,
        },
        aShortname = "TEAMA",
        bShortname = "TEAMB",
    } = match;

    const gitTeamLogo = (profile) => {
        // prettier-ignore
        try {
            let src = require(`../../assets/${profile?.Nickname.toLowerCase().replace(' ', '_')}.png`);
            console.log(src);
            return src;
        } catch (err) {
            return profile?.LogoUrl;
        }
    };
    return (
        <div className={c.root}>
            {/* prettier-ignore */}
            <div className="bar">
                <div className="team a">
                    <div className="score">
                        <div className={clsx("score-bar", {win: !inverse ? a.Score > 0 : b.Score > 0})}></div>
                        {maps.bestOf === "bo3" && <div className={clsx("score-bar", {win: !inverse ? a.Score > 1 : b.Score > 1 })}></div>}
                        {maps.bestOf === "bo5" && <>
                            <div className={clsx("score-bar", {win: !inverse ? a.Score > 1 : b.Score > 1 })}></div>
                            <div className={clsx("score-bar", {win: !inverse ? a.Score > 2 : b.Score > 2 })}></div>
                        </>}
                    </div>
                    <Typography variant="h5" className="shortname">{!inverse ? a?.Profile?.DisplayName : b?.Profile?.DisplayName}</Typography>
                    <div className="logo-wrap">
                        <div className="logo" style={{backgroundImage: `url(${gitTeamLogo(!inverse ? a.Profile : b.Profile)})`}}>{!gitTeamLogo(!inverse ? a.Profile : b.Profile) && (!inverse ? aShortname : bShortname)}</div>
                    </div>
                </div>

                <div className="team b">
                    <div className="score">
                    <div className={clsx("score-bar", {win: inverse ? a.Score > 0 : b.Score > 0})}></div>
                        {maps.bestOf === "bo3" && <div className={clsx("score-bar", {win: inverse ? a.Score > 1 : b.Score > 1 })}></div>}
                        {maps.bestOf === "bo5" && <>
                            <div className={clsx("score-bar", {win: inverse ? a.Score > 1 : b.Score > 1 })}></div>
                            <div className={clsx("score-bar", {win: inverse ? a.Score > 2 : b.Score > 2 })}></div>
                        </>}
                    </div>
                    <Typography variant="h5" className="shortname">{inverse ? a?.Profile?.DisplayName : b?.Profile?.DisplayName}</Typography>
                    <div className="logo-wrap">
                        <div className="logo" style={{backgroundImage: `url(${gitTeamLogo(inverse ? a.Profile : b.Profile)})`}}>{!gitTeamLogo(inverse ? a.Profile : b.Profile) && (inverse ? aShortname : bShortname)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveScore;
