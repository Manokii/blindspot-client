import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";
import agents from "../../assets/agents.json";
import paper from "../../assets/paper1.jpg";
import { Trail, animated } from "react-spring/renderprops";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        width: 1920,
        height: 1080,

        "& .left": {
            "& .player": {
                flexDirection: "row-reverse",
                "& .name": { padding: theme.spacing(1, 0, 1, 3) },
            },
        },

        "& .right": {
            "& .player": {
                "& .name": {
                    padding: theme.spacing(1, 3, 1, 0),
                    textAlign: "right",
                },

                "& .agent": {
                    transform: "scaleX(-1)",

                    backgroundPosition: "left ",
                },
            },
        },

        "& .players": {
            margin: "420px 30px 0px 30px",

            // position: "relative",
            "& .player": {
                height: 60,
                width: 250,
                backgroundColor: "rgba(255,255,255,.9)",
                color: "black",
                display: "flex",
                alignItems: "center",
                margin: theme.spacing(1.5, 0),

                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${paper})`,

                "& .name": {
                    flex: 1,
                },

                "& .agent": {
                    height: 60,
                    width: 80,
                    backgroundColor: theme.palette.primary.main,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                },
            },
        },
    },
}));

const gitAgentHeadshot = (agentId) => {
    try {
        const src = require(`../../assets/${agents[agentId]}-concept-headshot.png`);
        return src;
    } catch (err) {
        return "";
    }
};

const LiveIngamePlayers = () => {
    const c = q();
    const {
        inverse,
        match_current_player_agents: players = {
            a: [],
            b: [],
            showIngame: false,
        },
    } = useSelector((state) => state.live);

    const { a, b } = players;
    return (
        <div className={c.root}>
            <div className="players left">
                <Trail
                    items={!inverse ? a : b}
                    keys={(player, i) => i}
                    from={{ opacity: 0, transform: "translateX(-120%)" }}
                    to={{
                        opacity: players.showIngame ? 1 : 0,
                        transform: players.showIngame
                            ? "translateX(0%)"
                            : "translateX(-120%)",
                    }}
                    config={{ mass: 1, tension: 500, friction: 40 }}>
                    {(player) => (props) => (
                        <animated.div style={props} className="player">
                            <Typography variant="h5" className="name">
                                {player.name}
                            </Typography>

                            <div
                                className="agent"
                                style={{
                                    backgroundImage: `url(${gitAgentHeadshot(
                                        player.agent
                                    )})`,
                                }}></div>
                        </animated.div>
                    )}
                </Trail>
            </div>
            <div className="players right">
                <Trail
                    items={inverse ? a : b}
                    keys={(player, i) => i}
                    from={{ opacity: 0, transform: "translateX(120%)" }}
                    to={{
                        opacity: players.showIngame ? 1 : 0,
                        transform: players.showIngame
                            ? "translateX(0%)"
                            : "translateX(120%)",
                    }}
                    config={{ mass: 1, tension: 500, friction: 40 }}>
                    {(player) => (props) => (
                        <div style={props} className="player">
                            <Typography variant="h5" className="name">
                                {player.name}
                            </Typography>
                            <div
                                className="agent"
                                style={{
                                    backgroundImage: `url(${gitAgentHeadshot(
                                        player.agent
                                    )})`,
                                }}></div>
                        </div>
                    )}
                </Trail>
            </div>
        </div>
    );
};

export default LiveIngamePlayers;
