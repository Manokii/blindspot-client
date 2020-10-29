import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import clsx from "clsx";

const q = makeStyles((theme) => ({
    root: {
        width: 1920,
        height: 1080,
        position: "relative",
        display: "flex",
        justifyContent: "center",

        "& .bar": {
            marginTop: 72,
            marginLeft: 2,
            height: 36,
            width: 405,
            display: "flex",

            "& .a": {
                marginRight: 17.5,
                flexDirection: "row-reverse",

                "& .score": {
                    transform: "skewX(22deg) translate(-5px, -1px)",
                    flexDirection: "row-reverse",
                },

                "& .logo": { transform: "translate(-3px)" },
            },
            "& .b": {
                marginLeft: 17.5,

                "& .score": {
                    transform: "skewX(-22deg)  translate(7px, -1px)",
                },
                "& .logo": { transform: "translate(3px)" },
            },

            "& .team": {
                height: "100%",
                flex: 1,
                display: "flex",
                alignItems: "center",

                "& .logo": {
                    height: 36,
                    width: 36,
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

                "& .shortname": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 98,
                    color: "#0b1319",
                    height: "100%",
                },

                "& .score": {
                    width: 40,
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    "& .score-bar": {
                        backfaceVisibility: "hidden",
                        height: 25,
                        width: 8,
                        // border: "1px solid rgba(0,0,0,.6)",
                        boxShadow: "inset 0 0 3px #000",
                        backgroundColor: "#ededed",
                        margin: "0px 2px",
                    },

                    "& .win": {
                        backgroundColor: "rgb(189,112,3)",
                        background:
                            "linear-gradient(0deg, rgba(189,112,3,1) 0%, rgba(255,252,0,1) 100%)",
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
            let src = require(`../../assets/${profile?.Nickname.toLowerCase().replace(/ /gi, '_')}.png`);
            console.log(src);
            return src;
        } catch (err) {
            return profile?.LogoUrl;
        }
    };
    return (
        <div class={c.root}>
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
                    <Typography variant="h5" className="shortname">{!inverse ? aShortname : bShortname}</Typography>
                    <div className="logo" style={{backgroundImage: `url(${gitTeamLogo(!inverse ? a.Profile : b.Profile)})`}}>{!gitTeamLogo(!inverse ? a.Profile : b.Profile) && (!inverse ? aShortname : bShortname)}</div>
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
                    <Typography variant="h5" className="shortname">{inverse ? aShortname : bShortname}</Typography>
                    <div className="logo" style={{backgroundImage: `url(${gitTeamLogo(inverse ? a.Profile : b.Profile)})`}}>{!gitTeamLogo(inverse ? a.Profile : b.Profile) && (inverse ? aShortname : bShortname)}</div>
                </div>
            </div>
        </div>
    );
};

export default LiveScore;
