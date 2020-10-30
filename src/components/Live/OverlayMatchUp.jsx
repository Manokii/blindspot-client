import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import agents from "../../assets/agents.json";
import { Transition } from "react-spring/renderprops";

const us = makeStyles((theme) => ({
    matchup: {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& .a": {
            "& .headline": {
                flexDirection: "row-reverse",
                "& .logo": {
                    marginLeft: theme.spacing(2),
                    filter: "drop-shadow(-5px 5px 5px rgba(0,0,0,0.5))",
                },
            },
        },

        "& .b": {
            "& .headline": {
                flexDirection: "row",
                "& .logo": {
                    marginRight: theme.spacing(2),
                    filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.5))",
                },
            },
        },

        "& .team": {
            width: 1125,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            padding: theme.spacing(3, 3, 1, 3),
            margin: theme.spacing(0, 2),
            "& .texture": {
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                mixBlendMode: "multiply",
                backgroundSize: "cover",
                zIndex: 3,
            },

            "& .headline": {
                display: "flex",
                alignItems: "center",
                "& .logo": {
                    height: 75,
                    width: 75,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    transform: "translateY(-5px)",
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
                "& .team-name": {
                    fontFamily: "Neuterous",
                    textAlign: "center",
                    color: "#fff",
                    padding: theme.spacing(2, 0),
                    letterSpacing: 2,
                    zIndex: 2,
                },
            },

            "& .cards": {
                display: "flex",
                justifyContent: "space-between",
                "& .card": {
                    height: 258,
                    width: 200,
                    transition: "background-image 1000ms ease-in-out",
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    border: `2px solid ${theme.palette.secondary.main}`,
                    backgroundColor: "#0b1f37",
                    // backgroundColor: theme.palette.secondary.main,
                    // backgroundSize: "350%",
                    // backgroundPosition: "center top",
                    // backgroundPosition: "47% -5%",
                    // backgroundSize: "375%",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                    transitionProperty: "background-image",
                    transition: "0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    // backgroundImage: `url(${defaultAgent})`,
                    "& .agent": {
                        height: 258,
                        width: 200,
                        backgroundColor: "#0b1f37",
                        backgroundPosition: "47% -5%",
                        backgroundSize: "375%",
                        backgroundRepeat: "no-repeat",
                        overflow: "hidden",
                        transitionProperty: "background-image",
                        transition: "0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    },

                    "& .webm": {
                        height: "275%",
                        width: "auto",
                        transform: "translate(-40%, -12%)",
                    },
                    // "& .webm": {
                    //     height: "125%",
                    //     width: "auto",
                    //     transform: "translate(-25%, -10%)",
                    // },
                },
            },

            "& .names": {
                display: "flex",
                justifyContent: "space-between",
                "& .name": {
                    display: "flex",
                    backgroundColor: theme.palette.secondary.main,
                    width: 200,
                    height: 40,
                    textAlign: "center",
                    fontFamily: "Anton",
                    textTransform: "uppercase",
                    justifyContent: "center",
                    alignItems: "center",
                    color: theme.palette.primary.main,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                },
            },
        },
    },
    logowrap: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1,
        overflow: "hidden",
        opacity: 0.3,
        // mixBlendMode: "multiply",

        "& .logo": {
            position: "absolute",
            width: "100%",
            paddingTop: "100%",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        },

        "& .b": {
            bottom: "-10%",
            right: "-15%",
            transform: "rotate(-25deg)",
        },
        "& .a": {
            bottom: "-10%",
            left: "-15%",
            transform: "rotate(25deg)",
        },
    },
}));

const LiveMatchUp = ({ history }) => {
    const c = us();
    const {
        match_current,
        inverse,
        match_current_player_agents = {
            a: new Array(5).map((item, i) => ({ id: i })),
            b: new Array(5).map((item, i) => ({ id: i })),
        },
    } = useSelector((state) => state.live);
    const { a, b, imgOnly, showLogoAsBG } = match_current_player_agents;
    const {
        EntityParticipantA: ateam,
        EntityParticipantB: bteam,
        aShortname = "TEAMA",
        bShortname = "TEAMB",
    } = match_current;

    const gitVideoStyleBitchiz = {
        viper: { transform: "translate(-36%, -12%)" },
        sage: { transform: "translate(-41%, -12%)" },
        phoenix: { transform: "translate(-41%, -9%) scale(1.1)" },
        brimstone: { transform: "translate(-39%, -13%)" },
        sova: { transform: "translate(-30%, -9%) scale(1.1)" },
        jett: { transform: "translate(-34%, -13%)" },
    };

    const gitImageStyleBitchiz = {
        viper: { backgroundPosition: "42% -3%", backgroundSize: "390%" },
        sage: { backgroundPosition: "55% -1%" },
        reyna: { backgroundPosition: "58% 15%", backgroundSize: "400%" },
        raze: { backgroundPosition: "47% 5%", backgroundSize: "365%" },
        phoenix: { backgroundPosition: "47% -5%", backgroundSize: "365%" },
        brimstone: { backgroundPosition: "50% 3%", backgroundSize: "365%" },
        sova: { backgroundPosition: "55% -4%", backgroundSize: "350%" },
        breach: { backgroundPosition: "47% -3%", backgroundSize: "375%" },
        jett: { backgroundPosition: "35% -1%", backgroundSize: "335%" },
        omen: { backgroundPosition: "50% -3%", backgroundSize: "350%" },
        killjoy: { backgroundPosition: "58% -4%", backgroundSize: "240%" },
        cypher: { backgroundPosition: "52% -3%", backgroundSize: "375%" },
    };

    const getAgentVideo = (id) => {
        try {
            let src = require(`../../assets/${agents[id]}.webm`);
            return src;
        } catch (err) {
            return null;
        }
    };

    const getAgentImage = (id) => {
        try {
            let src = require(`../../assets/${agents[id]}.png`);
            return src;
        } catch (err) {
            return null;
        }
    };

    const getTeamLogoBG = (name = "") => {
        try {
            // prettier-ignore
            let src = require(`../../assets/${name.trim().toLowerCase().replace(/ /gi, "_")}.png`);
            console.log(name);
            return src;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const gitTeamLogo = (profile) => {
        // prettier-ignore
        try {
            let src = require(`../../assets/${profile?.Nickname.trim().toLowerCase().replace(/ /gi, '_')}.png`);
            console.log(src);
            return src;
        } catch (err) {
            return profile?.LogoUrl;
        }
    };

    const gitPlayerPhoto = (name) => {
        try {
            let src = require(`../../assets/${name
                .trim()
                .toLowerCase()
                .replace(/ /gi, "_")}.png`);
            return src;
        } catch (err) {
            return "";
        }
    };

    return (
        <div className={c.matchup}>
            <div className="team a">
                {/* prettier-ignore */}
                <div className="headline">

                    {gitTeamLogo(ateam?.Profile) && 
                    
                    <div className="logo"
                        style={{ 
                            backgroundImage: `url(${gitTeamLogo(ateam?.Profile)})`,
                            backgroundColor: !gitTeamLogo(ateam?.Profile) && (inverse ? '#0b1f37' : '#ff4050')
                        }}>{!gitTeamLogo(ateam?.Profile) && aShortname}</div>
                    }
                    <Typography color="textSecondary" variant="h2" className="team-name">
                        {ateam?.Profile?.Nickname}
                    </Typography>
                </div>
                <div className="cards">
                    {a.map((player) => (
                        <div key={player.id} className="player">
                            <div
                                className="card"
                                style={{
                                    backgroundImage: `url(${gitPlayerPhoto(
                                        player.name
                                    )})`,
                                    backgroundColor: inverse
                                        ? "#0b1f37"
                                        : "#ff4050",
                                }}>
                                <Transition
                                    items={player.agent}
                                    from={{
                                        transform: "translateY(-100%)",
                                    }}
                                    enter={{
                                        transform: "translateY(0%)",
                                    }}>
                                    {(show) =>
                                        show &&
                                        ((props) => (
                                            <div
                                                className="agent"
                                                style={{
                                                    ...props,
                                                    backgroundImage: `url(${getAgentImage(
                                                        player.agent
                                                    )})`,
                                                    backgroundColor: inverse
                                                        ? "#0b1f37"
                                                        : "#ff4050",
                                                    ...(gitImageStyleBitchiz[
                                                        agents[player.agent]
                                                    ] || ""),
                                                }}></div>
                                        ))
                                    }
                                </Transition>
                                {/* {!imgOnly && (
                                    <video
                                        key={player.agent}
                                        loop
                                        autoPlay
                                        className="webm"
                                        style={
                                            gitVideoStyleBitchiz[
                                                agents[player.agent]
                                            ] || {}
                                        }>
                                        <source
                                            src={getAgentVideo(player?.agent)}
                                            type="video/webm"
                                        />
                                    </video>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="names">
                    {a.map((player) => (
                        <Typography
                            color="textSecondary"
                            key={player.id}
                            variant="h6"
                            className="name">
                            {player.name}
                        </Typography>
                    ))}
                </div>
            </div>

            <div className="team b">
                <div className="cards">
                    {b.map((player) => (
                        <div key={player.id} className="player">
                            <div
                                className="card"
                                style={{
                                    backgroundColor: !inverse
                                        ? "#0b1f37"
                                        : "#ff4050",
                                    backgroundImage: `url(${gitPlayerPhoto(
                                        player.name
                                    )})`,
                                }}>
                                <Transition
                                    items={player.agent}
                                    keys={player.agent}
                                    from={{
                                        transform: "translateY(-100%)",
                                    }}
                                    enter={{
                                        transform: "translateY(0%)",
                                    }}>
                                    {(show) =>
                                        show &&
                                        ((props) => (
                                            <div
                                                className="agent"
                                                style={{
                                                    ...props,
                                                    backgroundImage: `url(${getAgentImage(
                                                        player.agent
                                                    )})`,
                                                    backgroundColor: !inverse
                                                        ? "#0b1f37"
                                                        : "#ff4050",
                                                    ...(gitImageStyleBitchiz[
                                                        agents[player.agent]
                                                    ] || ""),
                                                }}></div>
                                        ))
                                    }
                                </Transition>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="names">
                    {b.map((player) => (
                        <Typography
                            color="textSecondary"
                            key={player.id}
                            variant="h6"
                            className="name">
                            {player.name}
                        </Typography>
                    ))}
                </div>

                <div className="headline">
                    {gitTeamLogo(bteam?.Profile) && (
                        <div
                            className="logo"
                            style={{
                                backgroundImage: `url(${gitTeamLogo(
                                    bteam?.Profile
                                )})`,
                                backgroundColor:
                                    !gitTeamLogo(ateam?.Profile) &&
                                    (inverse ? "#0b1f37" : "#ff4050"),
                            }}>
                            {!gitTeamLogo(bteam?.Profile) && bShortname}
                        </div>
                    )}
                    <Typography
                        color="textSecondary"
                        variant="h2"
                        className="team-name">
                        {bteam?.Profile?.Nickname}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default withRouter(LiveMatchUp);
