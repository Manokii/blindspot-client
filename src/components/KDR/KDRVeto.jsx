import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import border from "../../assets/veto-rect.png";
import borderlt from "../../assets/veto-rect-lt.png";
import mapTexture from "../../assets/map.png";
import { useSelector } from "react-redux";
import { Transition } from "react-spring/renderprops";
import banned from "../../assets/banned.png";
import xspray from "../../assets/xspray.png";

const q = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& .headline": {
            fontFamily: "Sivar",
            color: "#1f1f1f",
        },
        "& .box": {
            width: 895,
            height: 126,
            backgroundImage: `url(${border})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            padding: theme.spacing(0, 2),
            // justifyContent: "space-between",

            "& .wrap": {
                "&:nth-child(0)": {
                    "& .map": {
                        transform:
                            "rotate(-5.58218deg) translate(-8.39836px, -3.88861px)",
                    },
                },
                "&:nth-child(1)": {
                    "& .map": {
                        transform:
                            "rotate(-2.09882deg) translate(7.25141px, 5.40826px)",
                    },
                },
                "&:nth-child(2)": {
                    "& .map": {
                        transform:
                            "rotate(3.68383deg) translate(-0.199985px, -9.41075px)",
                    },
                },
            },
            "& .map": {
                margin: theme.spacing(0, 2),
                WebkitBackfaceVisibility: "hidden",
                height: 133,
                width: 254,
                backgroundImage: `url(${mapTexture})`,
                backgroundColor: "rgba(0,0,0,.3)",
                boxShadow: "-2px 4px 8px rgba(0,0,0,.4)",
                color: "black",
                padding: theme.spacing(1),
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 300ms ease-in-out",
                position: "relative",

                "& .img": {
                    width: "100%",
                    height: 90,
                    // border: "2px solid black",
                    backgroundSize: "cover",
                    backgroundColor: "grey",
                },

                "& .map-name": {
                    paddingTop: theme.spacing(1),
                    textAlign: "center",
                },

                "& .banned": {
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${banned})`,
                    transform:
                        "rotate(20deg) scale(1.3) translate(-10px, -20px)",
                    // opacity: 0.4,
                },

                "& .winner": {
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${xspray})`,
                    transform: "rotate(20deg) scale(2) translate(-10px, -20px)",
                    // opacity: 0.4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    "& .logo": {
                        height: 90,
                        width: 90,
                        borderRadius: 10,
                        transform:
                            "rotate(-20deg) scale(0.7) translate(10px, 5px)",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",

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
                    },
                },
            },
        },
    },
}));

const LiveVeto = ({ onLowerThirds = false }) => {
    const c = q(onLowerThirds);
    const bestOf = {
        bo1: "Best of 1",
        bo3: "Best of 3",
        bo5: "Best of 5",
    };
    const {
        maps = { bestOf: "bo3", veto: [] },
        current_match_state: state = "VETO",
        match_current: {
            EntityParticipantA: a,
            EntityParticipantB: b,
            aShortname = "TEAMA",
            bShortname = "TEAMB",
        },
    } = useSelector((state) => state.live);

    const getMapImg = (map) => {
        try {
            let src = require(`../../assets/${map}.png`);
            return src;
        } catch (err) {
            return "";
        }
    };

    const getWinnerImage = (profile = {}) => {
        try {
            let src = require(`../../assets/${profile?.Nickname.replace(
                " ",
                "_"
            ).toLowerCase()}.png`);
            return src;
        } catch (err) {
            return profile.LogoUrl;
        }
    };

    const gitShortnameByTeamId = (id) => {
        if (a.Id === id) return aShortname;
        if (b.Id === id) return bShortname;
    };

    const gitShortnameByTeamName = (name) => {
        if (a.Profile.DisplayName === name) return aShortname;
        if (b.Profile.DisplayName === name) return bShortname;
    };

    return (
        <div
            className={c.root}
            style={{
                justifyContent: onLowerThirds ? "flex-start" : "",
                alignItems: onLowerThirds ? "flex-start" : "",
            }}>
            <Typography
                variant="h2"
                className="headline"
                style={{ color: onLowerThirds ? "white" : "" }}>
                {onLowerThirds ? `${aShortname} VS ${bShortname}` : state} -{" "}
                {bestOf[maps?.bestOf]}
            </Typography>
            <div
                className="box"
                style={{
                    backgroundImage: onLowerThirds ? `url(${borderlt})` : "",
                }}>
                <Transition
                    items={maps.veto}
                    keys={(v, i) => i}
                    from={{
                        opacity: 0,
                        transform: "scale(2) translateY(0px)",
                    }}
                    enter={{
                        opacity: 1,
                        transform: "scale(1) translateY(0px)",
                    }}
                    leave={{
                        opacity: 0,
                        transform: "scale(1) translateY(20px)",
                    }}
                    trail={300}>
                    {(veto) => (props) => (
                        <div style={props} className="wrap">
                            <div
                                // style={{
                                //     transform: `rotate(${
                                //         Math.random() * 20 - 10
                                //     }deg) translate(${
                                //         Math.random() * 20 - 10
                                //     }px, ${Math.random() * 20 - 10}px)`,
                                // }}
                                className="map">
                                <div
                                    className="img"
                                    style={{
                                        backgroundImage: `url(${getMapImg(
                                            veto.map
                                        )})`,
                                    }}></div>
                                {/* prettier-ignore */}
                                <Typography variant="h5" className="map-name">
                            {gitShortnameByTeamName(veto.team) || veto.shortname}
                            <span style={{color: 'grey'}}>{veto.team !== "mogulsystem" && " — "}</span>
                            <span style={{ color: veto.type === "ban" ? "#ff4656" : "royalblue"}}>
                                {veto.team !== "mogulsystem" && veto.type}
                            </span>
                            <span style={{color: 'grey'}}>{" — "}</span>
                            {veto.map}
                        </Typography>

                                <Transition
                                    items={veto.type === "ban" ? true : false}
                                    from={{
                                        opacity: 0,
                                        transform:
                                            "rotate(20deg) scale(2) translate(-10px, -20px)",
                                    }}
                                    enter={{
                                        opacity: 1,
                                        transform:
                                            "rotate(20deg) scale(1.3) translate(-10px, -20px)",
                                    }}
                                    leave={{
                                        opacity: 0,
                                        transform:
                                            "rotate(20deg) scale(2) translate(-10px, -20px)",
                                    }}
                                    config={{ delay: 300 }}>
                                    {(show) =>
                                        show &&
                                        ((props) => (
                                            <div
                                                style={props}
                                                className="banned"></div>
                                        ))
                                    }
                                </Transition>
                                <Transition
                                    items={veto.winner}
                                    from={{
                                        opacity: 0,
                                        transform:
                                            "rotate(20deg) scale(4) translate(-10px, 0px)",
                                    }}
                                    enter={{
                                        opacity: 1,
                                        transform:
                                            "rotate(20deg) scale(2) translate(-10px, 0px)",
                                    }}
                                    leave={{
                                        opacity: 0,
                                        transform:
                                            "rotate(20deg) scale(3) translate(-10px, 0px)",
                                    }}
                                    config={{ delay: 300 }}>
                                    {(show) =>
                                        show &&
                                        ((props) => (
                                            <div
                                                style={props}
                                                className="winner">
                                                <div
                                                    className="logo"
                                                    style={{
                                                        backgroundImage: `url(${getWinnerImage(
                                                            veto.winner.Profile
                                                        )})`,
                                                    }}>
                                                    {!getWinnerImage(
                                                        veto.winner.Profile
                                                    ) &&
                                                        gitShortnameByTeamId(
                                                            veto.winner.Id
                                                        )}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Transition>
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        </div>
    );
};

export default LiveVeto;
