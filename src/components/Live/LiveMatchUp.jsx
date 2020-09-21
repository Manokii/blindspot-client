import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import textureA from "../../assets/TextureA.png";
import textureB from "../../assets/paper_texture4.jpg";
import tapeA1 from "../../assets/TapeA1.png";
import tapeA2 from "../../assets/TapeA2.png";
import tapeB1 from "../../assets/TapeB1.png";
import tapeB2 from "../../assets/TapeB2.png";
import agents from "../../assets/agents.json";

const us = makeStyles((theme) => ({
    matchup: {
        position: "relative",
        // width: 1980,
        // height: 1080,
        width: "100%", //
        height: "100%", //
        display: "flex",
        justifyContent: "center", //
        alignItems: "center", //
        // padding: theme.spacing(0, 5.5), //
        "& .a": {
            // left: 44,
            transform: "rotate(-2deg)",
            "& .texture": { backgroundImage: `url(${textureA})` },

            "& .tape1": {
                position: "absolute",
                height: 109,
                width: 283,
                top: -50,
                left: -50,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${tapeA1})`,
                zIndex: 4,
            },
            "& .tape2": {
                position: "absolute",
                height: 109,
                width: 283,
                bottom: -60,
                left: 380,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${tapeA2})`,
                zIndex: 4,
            },

            "& .headline": {
                flexDirection: "row-reverse",
                "& .logo": {
                    marginLeft: theme.spacing(2),
                },
            },
        },

        "& .b": {
            // left: 976,
            transform: "rotate(1deg)",
            "& .texture": { backgroundImage: `url(${textureB})` },

            "& .tape1": {
                position: "absolute",
                height: 106,
                width: 148,
                right: -40,
                top: -40,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${tapeB1})`,
                zIndex: 4,
            },
            "& .tape2": {
                position: "absolute",
                height: 64,
                width: 131,
                left: -37,
                bottom: -40,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${tapeB2})`,
                zIndex: 4,
            },
            "& .cards": {
                "& .card": {
                    // transform: "scaleX(-1)",
                },
            },

            "& .headline": {
                flexDirection: "row",
                "& .logo": {
                    marginRight: theme.spacing(2),
                },
            },
        },

        "& .team": {
            // position: "absolute",
            height: 601,
            width: 901,
            // top: 237,

            backgroundColor: "#d4d4d4",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            padding: theme.spacing(3, 3, 1, 3),
            margin: theme.spacing(0, 2),

            boxShadow: "-5px 5px 20px rgba(0,0,0,.2)",

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

                transform: "translateY(-5px)",
                zIndex: 2,
                // marginBottom: theme.spacing(2),
                "& .logo": {
                    height: 75,
                    width: 75,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",

                    transform: "translateY(-5px)",
                    // border: "2px solid black",
                    // borderRadius: 10,
                    // backgroundColor: "rgba(0,0,0,.2)",
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
                    fontFamily: "Sivar",
                    textAlign: "center",
                    paddingBottom: theme.spacing(1),
                    // fontWeight: "bolder",
                    letterSpacing: 2,
                    zIndex: 2,
                    paddingTop: 2,
                },
            },

            "& .cards": {
                display: "flex",
                justifyContent: "space-between",
                zIndex: 2,
                "& .card": {
                    height: 401,
                    width: 158,
                    backgroundColor: "#101a23",
                    // backgroundColor: theme.palette.secondary.main,
                    backgroundSize: "350%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center top",
                    overflow: "hidden",

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
                height: 75,
                justifyContent: "space-between",
                zIndex: 2,
                "& .name": {
                    width: 158,
                    textAlign: "center",
                    fontFamily: "Anton",
                    textTransform: "uppercase",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
        opacity: 0.15,

        "& .logo": {
            position: "absolute",
            width: "100%",
            paddingTop: "100%",
            backgroundSize: "contain",
            backgroundRepeat: "norepeat",
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
        viper: { backgroundPosition: "42% -5%", backgroundSize: "390%" },
        sage: { backgroundPosition: "55% -2%" },
        reyna: { backgroundPosition: "58% 22%", backgroundSize: "400%" },
        raze: { backgroundPosition: "47% 9%", backgroundSize: "365%" },
        phoenix: { backgroundPosition: "47% -5%", backgroundSize: "365%" },
        brimstone: { backgroundPosition: "50% 3%", backgroundSize: "365%" },
        sova: { backgroundPosition: "55% -5%", backgroundSize: "350%" },
        breach: { backgroundPosition: "47% -5%", backgroundSize: "375%" },
        jett: { backgroundPosition: "35% 2%", backgroundSize: "375%" },
        omen: { backgroundPosition: "50% -5%", backgroundSize: "350%" },
        killjoy: { backgroundPosition: "60% -5%", backgroundSize: "240%" },
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

    const getTeamLogoBG = (name) => {
        try {
            let src = require(`../../assets/${name.toLowerCase()}.png`);
            return src.replace(" ", "_");
        } catch (err) {
            return null;
        }
    };

    const gitTeamLogo = (profile) => {
        // prettier-ignore
        try {
            let src = require(`../../assets/${profile?.Nickname.toLowerCase()}.png`).replace(' ', '_');
            console.log(src);
            return src;
        } catch (err) {
            return profile?.LogoUrl;
        }
    };

    return (
        <div className={c.matchup}>
            <div className="team a">
                {/* prettier-ignore */}
                <div className="headline">
                    <div className="logo"
                        style={{ 
                            backgroundImage: `url(${gitTeamLogo(ateam?.Profile)})`,
                            backgroundColor: !gitTeamLogo(ateam?.Profile) && (inverse ? '#101a23' : '#ff4656')
                        }}>{!gitTeamLogo(ateam?.Profile) && aShortname}</div>
                    <Typography color="textSecondary" variant="h3" className="team-name">
                        {ateam?.Profile?.Nickname}
                    </Typography>
                </div>
                <div className="cards">
                    {a.map((player) => (
                        <div key={player.id} className="player">
                            {/* prettier-ignore */}
                            <div className="card"
                                style={{
                                    backgroundImage:
                                        player.agent && !getAgentVideo(player.agent)
                                            ? `url(${getAgentImage(player.agent)})`
                                            : imgOnly && player.agent
                                            ? `url(${getAgentImage(player.agent)})`
                                            : "",
                                    backgroundColor: inverse ? '#101a23' :  '#ff4656',
                                    ...gitImageStyleBitchiz[agents[player.agent]] || ''
                                }}>
                                {!imgOnly && (
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
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="names">
                    {a.map((player) => (
                        <Typography
                            color="textSecondary"
                            key={player.id}
                            variant="h4"
                            className="name">
                            {player.name}
                        </Typography>
                    ))}
                </div>

                {/* prettier-ignore */}
                <div className={c.logowrap}>
                    <div className="logo a"
                        style={{
                            backgroundImage: showLogoAsBG ? `url(${getTeamLogoBG(ateam?.Profile?.Nickname)})` : '',
                            
                            backgroundColor: !gitTeamLogo(ateam?.Profile) && (inverse ? '#ff4656' : '#101a23')
                        }}></div>
                </div>
                <div className="texture"></div>
                <div className="tape1"></div>
                {/* <div className="tape2"></div> */}
            </div>

            <div className="team b">
                {/* prettier-ignore */}

                <div className="headline">
                    <div className="logo"
                        style={{ backgroundImage: `url(${gitTeamLogo(bteam?.Profile)})`,
                        }}>{!gitTeamLogo(bteam?.Profile) && bShortname}</div>
                    <Typography color="textSecondary"  variant="h3" className="team-name">
                        {bteam?.Profile?.Nickname}
                    </Typography>
                </div>

                <div className="cards">
                    {b.map((player) => (
                        <div key={player.id} className="player">
                            {/* prettier-ignore */}
                            <div className="card"
                                style={{
                                    backgroundImage:
                                        player.agent && !getAgentVideo(player.agent)
                                            ? `url(${getAgentImage(player.agent)})`
                                            : imgOnly && player.agent
                                            ? `url(${getAgentImage(player.agent)})`
                                            : "",
                                    backgroundColor: inverse ? '#ff4656' : '#101a23',
                                    ...gitImageStyleBitchiz[agents[player.agent]] || ''
                                }}>
                                {!imgOnly && (
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
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="names">
                    {b.map((player) => (
                        <Typography
                            color="textSecondary"
                            key={player.id}
                            variant="h4"
                            className="name">
                            {player.name}
                        </Typography>
                    ))}
                </div>

                {/* prettier-ignore */}
                <div className={c.logowrap}>
                    <div className="logo b"
                        style={{
                            backgroundImage: showLogoAsBG ? `url(${getTeamLogoBG(bteam?.Profile?.Nickname)})` : '',
                        }}></div>
                </div>

                <div className="texture"></div>
                <div className="tape1"></div>
                <div className="tape2"></div>
            </div>
        </div>
    );
};

export default withRouter(LiveMatchUp);
