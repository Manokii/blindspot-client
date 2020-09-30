import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import ControlCameraIcon from "@material-ui/icons/ControlCamera";
import { useSelector } from "react-redux";
import paper1 from "../../assets/paper1.jpg";

import { Transition } from "react-spring/renderprops";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "relative",
        alignItems: "flex-end",
        height: "100%",
        width: "100%",

        "& .container": {
            display: "flex",
        },

        "& .wrap": {
            display: "flex",
            flexDirection: "column",

            alignItems: "flex-start",
            "& .head": {
                display: "flex",
                // height: 65,
                // width: 65,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: theme.spacing(1, 2),
                borderLeft: `3px solid ${theme.palette.secondary.main}`,
                borderRight: `3px solid ${theme.palette.secondary.main}`,

                position: "relative",
                zIndex: 1,
                "&::after": {
                    content: '""',
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${paper1})`,
                    mixBlendMode: "multiply",
                    opacity: 0.5,
                },

                "& .icon": {
                    marginRight: theme.spacing(2),
                },
            },
            "& .body": {
                borderLeft: `3px solid ${theme.palette.secondary.main}`,
                borderRight: `3px solid ${theme.palette.secondary.main}`,
                marginTop: theme.spacing(1),
                backgroundColor: "white",
                display: "flex",
                padding: theme.spacing(2),
                position: "relative",
                zIndex: 1,

                "&::after": {
                    content: '""',
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${paper1})`,
                    mixBlendMode: "multiply",
                    opacity: 0.5,
                },

                "& .caster": {
                    marginRight: theme.spacing(2),
                    borderRight: "2px solid black",
                    paddingRight: theme.spacing(2),
                    "&:last-child": {
                        marginRight: 0,
                        paddingRight: 0,
                        borderRight: "none",
                    },
                },
            },
        },
    },
}));
const KDRTalents = ({ onLowerThirds }) => {
    const c = q();
    const live = useSelector((state) => state.live);

    const {
        talents = {
            casters: [],
            observers: [],
            live: false,
            liveOnLowerThirds: false,
        },
    } = live;
    return (
        <div
            className={c.root}
            style={{
                justifyContent: !onLowerThirds && "flex-end",
                padding: !onLowerThirds && "20px 30px",
            }}>
            <Transition
                items={talents.live}
                from={{
                    opacity: 0,
                    transform: onLowerThirds
                        ? "translateX(-30px)"
                        : "translateX(30px)",
                    clipPath: onLowerThirds
                        ? "polygon(0% 0%, 0% 0%, 0% 100% , 0% 100%)"
                        : "polygon(100% 0%, 100% 0, 100% 100%, 100% 100%)",
                }}
                enter={{
                    opacity: 1,
                    transform: "translateX(0px)",
                    clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0 100%)",
                }}
                leave={{
                    opacity: 0,
                    transform: onLowerThirds
                        ? "translateX(-30px)"
                        : "translateX(30px)",
                    clipPath: onLowerThirds
                        ? "polygon(0% 0%, 0% 0%, 0% 100% , 0% 100%)"
                        : "polygon(100% 0%, 100% 0, 100% 100%, 100% 100%)",
                }}>
                {(item) =>
                    item &&
                    ((props) => (
                        <div
                            className="container"
                            style={{
                                flexDirection: !onLowerThirds && "row-reverse",
                                ...props,
                            }}>
                            <div
                                className="wrap"
                                style={{
                                    alignItems: !onLowerThirds && "flex-end",
                                }}>
                                <div
                                    className="head"
                                    style={{
                                        borderLeft: !onLowerThirds && "none",
                                        borderRight: onLowerThirds && "none",
                                        flexDirection:
                                            !onLowerThirds && "row-reverse",
                                    }}>
                                    <HeadsetMicIcon
                                        color="primary"
                                        fontSize="large"
                                        className="icon"
                                        style={{
                                            marginRight:
                                                !onLowerThirds && "0px",
                                            marginLeft:
                                                !onLowerThirds && "16px",
                                        }}
                                    />
                                    <Typography variant="h4" color="primary">
                                        {onLowerThirds ? "Talents" : "Casters"}
                                    </Typography>
                                </div>
                                <div
                                    className="body"
                                    style={{
                                        borderLeft: !onLowerThirds && "none",

                                        borderRight: onLowerThirds && "none",
                                    }}>
                                    {talents.casters
                                        .filter((c) => c.live)
                                        .map(({ name, social, live }) => (
                                            <div className="caster">
                                                <Typography
                                                    variant="h5"
                                                    color="primary">
                                                    {name}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    color="primary">
                                                    {social}
                                                </Typography>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {!onLowerThirds && (
                                <div
                                    className="wrap"
                                    style={{
                                        marginRight: "16px",
                                        alignItems: "flex-end",
                                    }}>
                                    <div
                                        className="head"
                                        style={{
                                            borderLeft: "none",
                                            borderLeft: "none",
                                            flexDirection: "row-reverse",
                                        }}>
                                        <ControlCameraIcon
                                            color="primary"
                                            fontSize="large"
                                            className="icon"
                                            style={{
                                                marginRight: "0px",
                                                marginLeft: "16px",
                                            }}
                                        />
                                        <Typography
                                            variant="h4"
                                            color="primary">
                                            Obs
                                        </Typography>
                                    </div>
                                    <div
                                        className="body"
                                        style={{
                                            borderLeft: "none",
                                            minWidth: "100%",

                                            // justifyContent: "flex-end",
                                        }}>
                                        {talents.observers
                                            .filter((c) => c.live)
                                            .map(({ name, social, live }) => (
                                                <div className="caster">
                                                    <Typography
                                                        variant="h5"
                                                        color="primary">
                                                        {name}
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle2"
                                                        color="primary">
                                                        {social}
                                                    </Typography>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                }
            </Transition>
        </div>
    );
};

export default KDRTalents;
