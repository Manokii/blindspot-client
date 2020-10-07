import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import matchTexture from "../../assets/lt_match_texture.png";
import mainbar from "../../assets/lt_bar_main.png";
import subbar from "../../assets/lt_bar_sub.png";
import globe from "../../assets/globe.png";
import { Transition } from "react-spring/renderprops";
import paper from "../../assets/paper1.jpg";
import albumCover from "../../assets/kdr-album-cover.jpg";
import LiveVeto from "./KDRVeto";
import logoLockup from "../../assets/logos.png";
import KDRtalents from "./KDRTalents";

import Ticker from "react-ticker";
import KDRGiveaways from "./KDRGiveaways";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column-reverse",
        width: "100%",
        height: "100%",
        // alignItems: "center",
        padding: `${theme.spacing(5)}px 4.296875%`,

        "& .main-bar": {
            display: "flex",
            height: 130,
            width: 1755,
            backgroundColor: "white",
            // border: "1px solid black",

            "& .matchup": {
                flexShrink: 0,
                position: "relative",
                height: "100%",
                minWidth: 358,
                width: 358,
                borderBottom: "4px solid #ff4656",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& .team": {
                    height: 82,
                    width: 82,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "2.5rem",
                    fontWeight: "bolder",
                    fontFamily: "Tungsten",
                    wordBreak: "break-all",
                    lineHeight: "2rem",
                    textAlign: "center",
                    filter: "drop-shadow(0px 10px 5px rgba(0,0,0,0.5))",
                },

                "& .vs": {
                    margin: theme.spacing(0, 3),
                    fontWeight: "bold",
                },

                "& .texture": {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    backgroundColor: "white",
                    backgroundSize: "cover",
                    backgroundImage: `url(${matchTexture})`,
                    mixBlendMode: "multiply",
                },
            },

            "& .longbar": {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                width: 986,

                "& .main": {
                    height: 76,
                    backgroundSize: "cover",
                    backgroundImage: `url(${mainbar})`,
                    display: "flex",
                    alignItems: "center",
                    padding: theme.spacing(1, 3),
                    color: "#111923",
                    fontFamily: "Antonio",

                    "& .content": {
                        transform: "translateY(2px)",
                        width: "100%",
                    },
                },
                "& .sub": {
                    height: 54,
                    overflowY: "hidden",
                    backgroundSize: "cover",
                    backgroundImage: `url(${subbar})`,
                    display: "flex",
                    alignItems: "center",
                    padding: theme.spacing(0, 3),
                    fontFamily: "Anton",
                    fontWeight: "lighter",

                    "& .content": {
                        fontSize: "1.7rem",
                        width: "100%",
                        fontWeight: "normal",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                    },
                },
            },

            "& .sponsors": {
                flexShrink: 0,
                position: "relative",
                minWidth: 411,
                width: 411,
                height: "100%",
                backgroundColor: "white",
                display: "flex",
                padding: theme.spacing(2),

                backgroundSize: "90%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${logoLockup})`,
                "& .main": {
                    width: "55%",
                    display: "flex",
                    flexDirection: "column",

                    // borderRight: "3px solid rgba(0,0,0,.3)",
                    "& .caption": {
                        color: "#111923",
                        fontSize: "1rem",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                    },

                    "& .globe": {
                        flex: 1,
                        backgroundSize: "80%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundImage: `url(${globe})`,
                    },
                },
                "& .texture": {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    backgroundColor: "white",
                    backgroundSize: "cover",
                    backgroundImage: `url(${paper})`,
                    mixBlendMode: "multiply",
                    transform: "scaleY(-1)",
                },
            },
        },
    },

    music: {
        marginTop: theme.spacing(2),
        display: "flex",
        "& .icon": {
            height: 100,
            width: 100,
            backgroundColor: "#Fff",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            backgroundImage: `url(${albumCover})`,
        },

        "& .bar": {
            // width: 500,
            display: "flex",
            flexDirection: "column",
            color: "#fff",
            justifyContent: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            // backgroundImage: `url(${subbar})`,
            padding: theme.spacing(0, 4),
            position: "relative",
            zIndex: 1,
            backgroundColor: "#141414",

            "&::after": {
                content: '""',
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                backgroundSize: "cover",
                backgroundImage: `url(${paper})`,
                mixBlendMode: "multiply",
            },
            "& .main": {
                // display: "flex",
                // alignItems: "center",
                // flexBasis: "60%",
                // color: theme.palette.primary.main,
            },

            "& .sub": {
                display: "flex",
                alignItems: "center",
                // flex: 1,
                fontSize: "1.2rem",
            },
        },
    },

    talents: { marginTop: theme.spacing(1.5) },
}));

const LiveLowerThirds = () => {
    const c = q();
    const {
        lower_thirds = { headline: "", subtext: "", live: false },
        match_current = {},
        music = { title: "", artist: "", live: false },
        maps = {
            bestOf: "",
            liveOnLowerThirds: false,
            veto: [],
        },
        giveaways = [],
        talents = { casters: [], observers: [] },
    } = useSelector((state) => state.live);
    const {
        EntityParticipantA: a = {},
        EntityParticipantB: b = {},
        aShortname = "TEAMA",
        bShortname = "TEAMB",
    } = match_current;

    const logoCheck = (t = {}) => {
        try {
            let src = require(`../../assets/${t.Nickname.trim()
                .toLowerCase()
                .replace(/ /gi, "_")}.png`);
            return src;
        } catch (err) {
            console.log(err);
            return t.LogoUrl;
        }
    };
    return (
        <div className={c.root}>
            <Transition
                items={lower_thirds.live}
                from={{
                    opacity: 0,
                    clipPath: `polygon(0% 0%, 20.16901% 0%, 20.16901% 100%,0% 100%)`,
                    transform: "translateY(20px)",
                    height: 0,
                    marginTop: 0,
                }}
                enter={[
                    {
                        height: 130,
                        opacity: 1,
                        transform: "translateY(0px)",
                        marginTop: 16,
                    },
                    { clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` },
                ]}
                leave={[
                    {
                        opacity: 1,
                        clipPath: `polygon(0% 0%, 20.39886% 0%, 20.39886% 100%,0% 100%)`,
                        transform: "translateY(0px)",
                    },
                    { opacity: 0, transform: "translateY(20px)" },
                    { height: 0, marginTop: 0 },
                ]}>
                {(show) =>
                    show &&
                    ((props) => (
                        <div style={props} className="main-bar">
                            <div className="matchup">
                                <div
                                    className="team a"
                                    style={{
                                        backgroundImage: `url(${logoCheck(
                                            a.Profile
                                        )})`,
                                        backgroundColor:
                                            !logoCheck(a.Profile) && "#101a23",
                                        borderRadius:
                                            !logoCheck(a.Profile) && "10px",
                                        transform:
                                            !logoCheck(a.Profile) &&
                                            "scale(0.8)",
                                    }}>
                                    {!logoCheck(a.Profile) && aShortname}
                                </div>
                                <Typography
                                    variant="h3"
                                    className="vs"
                                    color="primary"
                                    style={{ fontFamily: "Sivar" }}>
                                    {a.Score} - {b.Score}
                                </Typography>
                                <div
                                    className="team b"
                                    style={{
                                        backgroundImage: `url(${logoCheck(
                                            b.Profile
                                        )})`,
                                        backgroundColor:
                                            !logoCheck(b.Profile) && "#101a23",
                                        borderRadius:
                                            !logoCheck(b.Profile) && "10px",
                                        transform:
                                            !logoCheck(b.Profile) &&
                                            "scale(0.8)",
                                    }}>
                                    {!logoCheck(b.Profile) && bShortname}
                                </div>
                                <div className="texture"></div>
                            </div>
                            <div className="longbar">
                                <div className="main">
                                    <Typography
                                        className="content"
                                        variant="h3">
                                        {lower_thirds.headline}
                                    </Typography>
                                </div>
                                <div className="sub">
                                    <div className="content">
                                        <Ticker>
                                            {() => (
                                                <>
                                                    <span
                                                        style={{
                                                            marginRight: 16,
                                                        }}>
                                                        {lower_thirds.subtext.replace(
                                                            /\n/gi,
                                                            " | "
                                                        )}
                                                    </span>
                                                </>
                                            )}
                                        </Ticker>
                                    </div>
                                </div>
                            </div>
                            <div className="sponsors">
                                <div className="texture"></div>
                            </div>
                        </div>
                    ))
                }
            </Transition>

            {/* <div className={c.giveaways}>
                <KDRGiveaways onLowerThirds={true} />
            </div> */}

            <Transition
                items={
                    Boolean(giveaways.filter((g) => g.live).length) &&
                    !maps.liveOnLowerThirds
                }
                from={{
                    maxHeight: 0,
                    opacity: 0,
                    clipPath: "polygon(-100% 0%, 0% 0%, 0% 100% , -100% 100%)",
                    transform: "translateY(20px)",
                }}
                enter={{
                    maxHeight: 400,
                    opacity: 1,
                    clipPath:
                        "polygon(-100% 0%, 100% 0%, 100% 100% , -100% 100%)",
                    transform: "translateY(0px)",
                }}
                leave={[
                    {
                        opacity: 0,
                        clipPath:
                            "polygon(-100% 0%, 0% 0%, 0% 100% , -100% 100%)",
                        transform: "translateY(0px)",
                    },
                    { maxHeight: 0 },
                ]}
                delay={1000}>
                {(show) =>
                    show &&
                    ((props) => (
                        <div style={props} className={c.talents}>
                            <KDRGiveaways onLowerThirds={true} />
                        </div>
                    ))
                }
            </Transition>

            <Transition
                items={music.live && !maps.liveOnLowerThirds}
                from={{
                    height: 0,
                    opacity: 0,
                    clipPath:
                        "polygon(0% 0%, 5.698% 0%, 5.698% 100% , 0% 100%)",
                    transform: "translateY(20px)",
                }}
                enter={[
                    { opacity: 0, height: "auto" },
                    { opacity: 1, transform: "translateY(0px)" },
                    {
                        clipPath:
                            "polygon(0% 0%, 34.188034% 0% , 34.188034% 100%, 0  100%)",
                    },
                ]}
                leave={[
                    {
                        clipPath:
                            "polygon(0% 0%, 5.698% 0%, 5.698% 100% , 0% 100%)",
                    },
                    {
                        opacity: 0,
                        transform: "translatY(20px)",
                    },
                    {
                        marginTop: 0,
                        height: 0,
                    },
                ]}>
                {(show) =>
                    show &&
                    ((props) => (
                        <div style={props} className={c.music}>
                            <div className="icon"></div>
                            <div className="bar">
                                <Typography variant="h4" className="main">
                                    Now Playing: {music.title}
                                </Typography>
                                <Typography variant="subtitle1" className="sub">
                                    Artist: {music.artist}
                                </Typography>
                            </div>
                        </div>
                    ))
                }
            </Transition>

            <Transition
                items={talents.liveOnLowerThirds && !maps.liveOnLowerThirds}
                // keys
                from={{
                    height: 0,
                    opacity: 0,
                    clipPath: "polygon(-100% 0%, 0% 0%, 0% 100% , -100% 100%)",
                    transform: "translateY(20px)",
                }}
                enter={{
                    height: 150,
                    opacity: 1,
                    clipPath:
                        "polygon(-100% 0%, 100% 0%, 100% 100% , -100% 100%)",
                    transform: "translateY(0px)",
                }}
                leave={[
                    {
                        opacity: 0,
                        clipPath:
                            "polygon(-100% 0%, 0% 0%, 0% 100% , -100% 100%)",
                        transform: "translateY(0px)",
                    },
                    { height: 0 },
                ]}
                delay={1000}>
                {(show) =>
                    show &&
                    ((props) => (
                        <div style={props} className={c.talents}>
                            <KDRtalents onLowerThirds={true} />
                        </div>
                    ))
                }
            </Transition>

            <Transition
                items={maps.liveOnLowerThirds}
                // keys
                from={{
                    opacity: 0,
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 200% , 0% 200%)",
                    transform: "translateY(20px)",
                }}
                enter={{
                    opacity: 1,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 200% , 0% 200%)",
                    transform: "translateY(0px)",
                }}
                leave={{
                    opacity: 0,
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 200% , 0% 200%)",
                    transform: "translateY(0px)",
                }}>
                {(show) =>
                    show &&
                    ((props) => (
                        <div className={c.veto} style={props}>
                            <LiveVeto onLowerThirds={true} />
                        </div>
                    ))
                }
            </Transition>
        </div>
    );
};

export default LiveLowerThirds;
