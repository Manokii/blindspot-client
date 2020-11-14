import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import border from "../../assets/veto-rect.png";
import borderlt from "../../assets/veto-rect-lt.png";
import mapTexture from "../../assets/map.png";
import { useSelector } from "react-redux";
import { Transition } from "react-spring/renderprops";
// import banned from "../../assets/banned.png";
import xspray from "../../assets/xspray.png";

const q = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& .headline": {
            // fontFamily: "Sivar",
            color: "#fff",
        },
        "& .box": {
            width: 895,
            height: 126,
            // backgroundImage: `url(${border})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            padding: theme.spacing(0, 2),
            // justifyContent: "space-between",
            "& .map": {
                margin: theme.spacing(0, 2),
                WebkitBackfaceVisibility: "hidden",
                height: 133,
                width: 254,
                backgroundColor: "rgba(13, 10, 32, .95)",
                boxShadow: "-2px 4px 8px rgba(0,0,0,.4)",
                color: "black",
                // padding: theme.spacing(1),
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
                    paddingBottom: 6,
                    textAlign: "center",
                    color: 'rgba(255,255,255,.9)'
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
                    transform:
                        "rotate(20deg) translate(-10px, -20px)",
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
                    // backgroundImage: `url(${xspray})`,
                    // transform: "rotate(20deg) translate(-10px, -20px)",
                    // opacity: 0.4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    "& .logo": {
                        height: 90,
                        width: 90,
                        borderRadius: 10,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",

                        filter: "drop-shadow(0px 10px 5px rgba(0,0,0,0.5))",
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
                / /gi,
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
                variant="h3"
                className="headline"
                style={{ color: onLowerThirds ? "white" : "" }}>
                {onLowerThirds ? `${aShortname} VS ${bShortname}` : state} -{" "}
                {bestOf[maps?.bestOf]}
            </Typography>
            <div
                className="box"
                style={{
                    padding: onLowerThirds ? `0px`: ''
                }}>
                <Transition
                    items={maps.veto}
                    keys={(v, i) => i}
                    from={{
                        opacity: 0,
                        transform: "translateY(20px)",
                    }}
                    enter={{
                        opacity: 1,
                        transform: "translateY(0px)",
                    }}
                    leave={{
                        opacity: 0,
                        transform: "translateY(20px)",
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
                                style={{margin: onLowerThirds ? '0px 32px 0px 0px': '0px 16px'}}
                                className="map">
                                <div
                                    className="img"
                                    style={{
                                        backgroundImage: `url(${getMapImg(
                                            veto.map
                                        )})`,
                                        filter: veto.type === 'ban' ? 'grayscale(100%) brightness(50%)' : veto.winner ?  'brightness(25%)': '',
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
                                            "rotate(20deg) translate(-10px, -20px)",
                                    }}
                                    enter={{
                                        opacity: 1,
                                        transform:
                                            "rotate(20deg) translate(-10px, -20px)",
                                    }}
                                    leave={{
                                        opacity: 0,
                                        transform:
                                            "rotate(20deg) translate(-10px, -20px)",
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
                                            "translate(0px, -20px)",
                                    }}
                                    enter={{
                                        opacity: 1,
                                        transform:
                                            "translate(0px, -20px)",
                                    }}
                                    leave={{
                                        opacity: 0,
                                        transform:
                                            "translate(0px, -20px)",
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
