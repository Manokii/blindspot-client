import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Paper from "../../assets/paper_texture2.jpg";
import { Spring, Transition } from "react-spring/renderprops";
import { config } from "react-spring";
import agents from "../../assets/agents.json";

const useStyles = makeStyles((theme) => ({
    roundWinner: {
        width: 1920,
        height: 1080,

        "& .container": {
            // backgroundColor: "white",
            height: "100%",
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(5),

            "& .bg": {
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "white",

                padding: theme.spacing(5),
                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundImage: `url(${Paper})`,
                    opacity: 0.5,
                    mixBlendMode: "multiply",
                    zIndex: 4,
                },

                "& .border": {
                    height: "100%",
                    border: "5px solid rgba(0,0,0,1)",
                },
            },

            "& .content": {
                flex: 1,
                display: "flex",
                position: "relative",
                // alignItems: "flex-end",
                justifyContent: "center",
                // overflow: "hidden",
                zIndex: 10,
                "& .players": {
                    position: "absolute",
                    bottom: 50,
                    display: "flex",
                    height: "55%",
                    perspective: "0px",
                    perspectiveOrigin: "center",
                    transform: "translateY(-40px)",
                    // filter: "drop-shadow(0px 10px 0px #ff4656)",
                    "& .player": {
                        // border: "1px solid black",
                        width: 250,
                        // margin: "0px 20px",
                        "&:nth-of-type(3)": {
                            transform: "translateZ(500px)",
                            zIndex: 99,
                        },
                        "&:nth-of-type(2)": {
                            transform: "translateZ(300px)",
                            zIndex: 88,
                            // filter: "brightness(90%)",
                        },
                        "&:nth-of-type(4)": {
                            transform: "translateZ(300px)",
                            zIndex: 88,
                            // filter: "brightness(90%)",
                        },
                        "&:nth-of-type(1)": {
                            transform: "translateZ(100px)",
                            zIndex: 77,
                            // filter: "brightness(70%)",
                        },

                        "&:nth-of-type(5)": {
                            transform: "translateZ(100px)",
                            zIndex: 77,
                            // filter: "brightness(70%)",
                        },
                    },

                    "& .agent": {
                        height: "100%",
                        width: "100%",
                        backgroundPosition: "bottom center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% auto",
                        transform: "scale(1.9)",
                    },
                },

                "& .team-logo": {
                    position: "absolute",
                    top: "5%",
                    height: 400,
                    width: 400,
                    backfaceVisibility: "hidden",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    filter: "drop-shadow(0px 10px 10px rgba(0,0,0,.5))",
                },

                "& .details": {
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    bottom: 50,
                    alignItems: "center",

                    filter: "drop-shadow(0px 10px 5px rgba(0,0,0,.5))",
                    "& .headline": {
                        padding: theme.spacing(2, 5),
                        backgroundColor: theme.palette.secondary.main,
                        zIndex: 55,
                    },
                    "& .subtext": {
                        overflow: "visible",
                        zIndex: 56,
                        marginTop: theme.spacing(1),
                        padding: theme.spacing(1, 3),
                        backgroundColor: theme.palette.primary.main,
                    },
                },
            },
        },
    },
}));

const KDRRoundWinner = () => {
    const classes = useStyles();
    const {
        round_winner = { side: "a" },
        match_current_player_agents = { a: [], b: [] },
        match_current
    } = useSelector((state) => state.live);

    const gitImageStyle = {
        viper: { transform: "scale(1.9) translateX(5%)" },
        sage: { transform: "scale(1.9) translateX(-2%)" },
        reyna: { transform: "scale(1.9) translate(-5%, -8%)" },
        raze: { transform: "scale(1.9) translateY(-5%)" },
        phoenix: { transform: "scale(1.9) translateX(3%)" },
        // brimstone: { backgroundPosition: "50% 3%" },
        sova: { transform: "scale(1.9) translateX( -5%)" },
        breach: { transform: "scale(1.9) translateX(3%)" },
        jett: { transform: "scale(1.9) translateX(10%)" },
        // omen: { backgroundPosition: "50% -5%" },
        killjoy: {
            transform: "scale(1.2) translate(-4%, 20%)",
            backgroundSize: "contain",
        },
    };
    const getAgentImage = (id) => {
        try {
            let src = require(`../../assets/${agents[id]}.png`);
            return src;
        } catch (err) {
            return null;
        }
    };

    const gitTeamLogo = (profile) => {
        // prettier-ignore
        try {
            let src = require(`../../assets/${profile?.Nickname.trim().toLowerCase().replace(/ /gi, '_')}.png`);
            return src;
        } catch (err) {
            return profile?.LogoUrl;
        }
    };

    return (
        <div className={classes.roundWinner}>
            <Transition
                items={Boolean(round_winner)}
                from={{ opacity: 0 }}
                enter={{
                    opacity: 1,
                    clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
                }}
                leave={{
                    opacity: 0,
                    clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
                }}>
                {(items) =>
                    items &&
                    ((props) => (
                        <div style={props} className="container">
                            <Spring
                                from={{
                                    opacity: 0,
                                    clipPath:
                                        "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
                                }}
                                to={{
                                    opacity: 1,
                                    clipPath:
                                        "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
                                }}
                                delay={4000}>
                                {(props) => (
                                    <div style={props} className="bg">
                                        <div className="border"></div>
                                    </div>
                                )}
                            </Spring>
                            <div className="content">
                                <Spring
                                    from={{
                                        transform: "translateY(-100px)",
                                        opacity: 0,
                                    }}
                                    to={{
                                        transform: "translateY(0px)",
                                        opacity: 1,
                                    }}
                                    config={config.slow}>
                                    {(props) => (
                                        <div
                                            className="team-logo"
                                            style={{
                                                ...props,
                                                backgroundImage: `url(${gitTeamLogo(
                                                    round_winner?.profile
                                                )})`,
                                            }}></div>
                                    )}
                                </Spring>

                                <Transition
                                    items={Boolean(round_winner)}
                                    from={{
                                        perspective: "0px",
                                        opacity: 0,
                                    }}
                                    enter={[
                                        {
                                            perspective: "1px",
                                            opacity: 1,
                                            config: config.fast,
                                        },
                                        {
                                            perspective: "1400px",
                                        },
                                    ]}
                                    leave={{ opacity: 0 }}
                                    config={{ friction: 300 }}
                                    delay={100}>
                                    {(items) =>
                                        items &&
                                        ((props) => (
                                            <div
                                                style={props}
                                                className="players">
                                                {round_winner &&
                                                    match_current_player_agents[
                                                        round_winner?.side
                                                    ].map((player, i) => (
                                                        <div className="player">
                                                            <div
                                                                className="agent"
                                                                style={{
                                                                    backgroundImage: `url(${getAgentImage(
                                                                        player.agent
                                                                    )})`,
                                                                    ...gitImageStyle[
                                                                        agents[
                                                                            player
                                                                                .agent
                                                                        ]
                                                                    ],
                                                                }}></div>
                                                            <div className="name">
                                                                {}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        ))
                                    }
                                </Transition>

                                {/* ============== Details ============== */}

                                <Spring
                                    from={{
                                        opacity: 0,
                                        clipPath:
                                            "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
                                    }}
                                    to={{
                                        opacity: 1,
                                        clipPath:
                                            "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
                                    }}
                                    delay={4000}>
                                    {(props) => (
                                        <div style={props} className="details">
                                            <Typography
                                                className="headline"
                                                variant="h1"
                                                color="initial">
                                                {round_winner?.profile
                                                    ?.DisplayName + " Win"}
                                            </Typography>
                                            <Typography
                                                className="subtext"
                                                variant="h4">{`VS ${
                                                round_winner?.loser?.DisplayName
                                            } — Game ${
                                                match_current
                                                    ?.EntityParticipantA
                                                    ?.Score +
                                                match_current
                                                    ?.EntityParticipantB?.Score
                                            } — ${
                                                round_winner?.map
                                            }`}</Typography>
                                        </div>
                                    )}
                                </Spring>
                            </div>
                        </div>
                    ))
                }
            </Transition>
        </div>
    );
};

export default KDRRoundWinner;
