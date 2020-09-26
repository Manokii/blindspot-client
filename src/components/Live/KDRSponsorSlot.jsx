import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
// import paper from "../../assets/paper1.jpg";
import paper1 from "../../assets/paper_texture2.jpg";
import tape from "../../assets/tape2.png";
import globe from "../../assets/globe.png";
import legion_intel from "../../assets/legion.png";
import { useSelector } from "react-redux";
import { Transition } from "react-spring/renderprops";

// const gitRandomBackground = () => {
//     const rand = Math.floor(Math.random() * (5 - 1) + 1);
//     console.log(rand);
//     try {
//         const src = require(`../../assets/paper_texture${rand}.jpg`);
//         return src;
//     } catch (err) {
//         return "";
//     }
// };

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: 1080,
        width: 1920,
        position: "relative",
        flexDirection: "column-reverse",
        padding: "20px 30px",
        alignItems: "flex-start",
        "& .sponsor-slot": {
            position: "relative",
            "& .headline": {
                position: "relative",
                backgroundSize: "100% 100%",
                backgroundPositionX: "left",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${tape})`,
                padding: theme.spacing(2),
                transform: "translateY(25px)",
                zIndex: 10,

                "& .headline-text": {
                    transform: "translateY(-4px)",
                    textAlign: "center",
                },
            },

            "& .sponsors": {
                width: 470,
                height: 125,
                padding: theme.spacing(2, 1),
                display: "flex",
                alignItems: "center",
                position: "relative",
                backgroundColor: "#141414",
                zIndex: 1,
                "& .texture": {
                    position: "absolute",
                    display: "block",
                    height: 125,
                    width: 470,
                    top: 0,
                    left: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${paper1})`,
                    // backgroundColor: "red",
                    mixBlendMode: "multiply",
                    zIndex: 5,
                },
                "& .main": {
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    height: "100%",
                    width: "50%",
                    "& .caption": {
                        padding: theme.spacing(0, 0, 1, 2),
                        color: "#1d439c",
                    },

                    "& .globe": {
                        flex: 1,
                        backgroundSize: "80%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${globe})`,
                        // borderRight: "3px solid #1d439c",
                    },
                },

                "& .border": {
                    position: "relative",
                    zIndex: 2,
                    height: "80%",
                    width: 3,
                    // marginTop: 12,
                    opacity: 0.5,
                    backgroundColor: "#1d439c",
                },

                "& .secondary": {
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    flex: 1,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${legion_intel})`,
                },
            },
        },
    },
}));

const LiveSponsorSlot = () => {
    const c = q();
    const {
        popup_sponsor = { live: false },
        current_match_state = "",
        maps = { bestOf: "bo3" },
    } = useSelector((state) => state.live);

    return (
        <div className={c.root}>
            <Transition
                items={popup_sponsor.live}
                from={{ opacity: 0, transform: "scale(0.8)", height: 0 }}
                enter={[
                    { height: "auto" },
                    { opacity: 1, transform: "scale(1)" },
                ]}
                leave={[
                    { opacity: 0, transform: "scale(0.8)" },
                    { height: 0 },
                ]}>
                {(show) =>
                    show &&
                    ((props) => (
                        <div style={props} className="sponsor-slot">
                            <div className="headline">
                                <Typography
                                    className="headline-text"
                                    variant="h4">
                                    {current_match_state} -{" "}
                                    {maps.bestOf.toUpperCase()}
                                </Typography>
                            </div>
                            <div className="sponsors">
                                <div className="main">
                                    <div className="globe"></div>
                                </div>
                                <div className="border"></div>
                                <div className="secondary"></div>
                                <div className="texture"></div>
                            </div>
                        </div>
                    ))
                }
            </Transition>
            {/* test */}
        </div>
    );
};

export default LiveSponsorSlot;
