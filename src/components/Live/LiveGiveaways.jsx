import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import mainPaper from "../../assets/paper_texture2.jpg";
import { useSelector } from "react-redux";
import { Transition } from "react-spring/renderprops";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: theme.spacing(2),

        "& .headline": {
            position: "relative",
            padding: theme.spacing(1, 2),
            backgroundColor: "white",
            borderLeft: `3px solid ${theme.palette.secondary.main}`,
            "&::after": {
                content: '""',
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                backgroundSize: "cover",
                backgroundImage: `url(${mainPaper})`,
                mixBlendMode: "multiply",
                opacity: 0.4,
            },
        },

        "& .giveaways": {
            display: "flex",
            flexWrap: "wrap-reverse",

            "& .product": {
                backgroundColor: "white",
                margin: theme.spacing(1, 1, 0, 0),
                display: "flex",
                alignItems: "center",
                padding: theme.spacing(1, 2),
                position: "relative",
                borderRadius: 5,
                // overflow: "hidden",
                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    backgroundSize: "cover",
                    opacity: 0.5,
                    backgroundImage: `url(${mainPaper})`,
                    backgroundPosition: "center",
                    mixBlendMode: "multiply",
                },
                "& .details": {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    "& .img-container": {
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        "& .img": {
                            height: 100,
                            filter: "drop-shadow(0px 10px 5px rgba(0,0,0,.5))",
                        },
                    },
                },

                "& .winners-wrap": {
                    height: "100%",
                    padding: theme.spacing(2),
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: theme.spacing(2),
                    flex: 1,

                    "& .winners": {
                        display: "flex",
                        flexDirection: "column",
                        "& .winner": {
                            fontSize: "0.9rem",
                            // marginRight: theme.spacing(2),
                        },
                    },
                },
            },
        },
    },
}));
const KDRGiveaways = ({ onLowerThirds }) => {
    const c = q();
    const { giveaways = [] } = useSelector((state) => state.live);
    return (
        <div className={c.root}>
            <Transition
                items={Boolean(giveaways.filter((g) => g.live).length)}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
                delay={1000}>
                {(item) =>
                    item &&
                    ((props) => (
                        <div style={props} className="headline">
                            <Typography
                                variant="h4"
                                color="primary"
                                style={{ fontWeight: "bold" }}>
                                Giveaways
                            </Typography>
                        </div>
                    ))
                }
            </Transition>

            {/* </Transition>
            {Boolean(giveaways.filter((g) => g.live).length) && (
               
            )} */}

            <Transition
                items={giveaways.filter((g) => g.live)}
                keys={(items, i) => i}
                from={{ maxHeight: 0, opacity: 0 }}
                enter={{ maxHeight: 400, opacity: 1 }}
                leave={{ maxHeight: 0, opacity: 0 }}
                trail={300}>
                {(g) => (props) => (
                    <div style={props} className="giveaways">
                        <Transition
                            items={g.prizes}
                            keys={(items, i) => i}
                            from={{ opacity: 0, transform: "translateY(20px)" }}
                            enter={{
                                opacity: 1,
                                transform: "translateY(0px)",
                            }}
                            leave={{
                                opacity: 0,
                                transform: "translateY(20px)",
                            }}
                            trail={300}>
                            {({
                                product,
                                amount,
                                imgUrl,
                                winners = [],
                                showWinners,
                            }) => (props) => (
                                <div style={props} className="product">
                                    <div className="details">
                                        <div className="img-container">
                                            <img
                                                src={imgUrl}
                                                alt={product}
                                                className="img"
                                            />
                                        </div>
                                        <Typography
                                            variant="h5"
                                            className="name"
                                            color="primary">
                                            <span
                                                style={{
                                                    color: "royalblue",
                                                    textTransform: "lowercase",
                                                    fontVariant: "small-caps",
                                                }}>
                                                {amount}x{" "}
                                            </span>
                                            {product}
                                        </Typography>
                                    </div>

                                    {showWinners && (
                                        <div className="winners-wrap">
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                                style={{ opacity: 0.8 }}>
                                                winner{amount > 1 ? "s" : ""}
                                            </Typography>

                                            <div className="winners">
                                                {winners.map((w) => (
                                                    <Typography
                                                        className="winner"
                                                        variant="caption"
                                                        color="primary">
                                                        {w}
                                                    </Typography>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Transition>
                    </div>
                )}
            </Transition>

            {/* {giveaways
                .filter((g) => g.live)
                .map((g) => (
                    <div className="giveaways">
                        <Transition
                            items={g.prizes}
                            keys={(items, i) => i}
                            from={{ opacity: 0, transform: "translateY(20px)" }}
                            enter={{
                                opacity: 1,
                                transform: "translateY(0px)",
                            }}
                            leave={{
                                opacity: 0,
                                transform: "translateY(20px)",
                            }}
                            trail={300}>
                            {({
                                product,
                                amount,
                                imgUrl,
                                winners = [],
                                showWinners,
                            }) => (props) => (
                                <div style={props} className="product">
                                    <div className="details">
                                        <img
                                            src={imgUrl}
                                            alt={product}
                                            className="img"
                                        />
                                        <Typography
                                            variant="h5"
                                            className="name"
                                            color="primary">
                                            <span
                                                style={{
                                                    color: "royalblue",
                                                    textTransform: "lowercase",
                                                    fontVariant: "small-caps",
                                                }}>
                                                {amount}x{" "}
                                            </span>
                                            {product}
                                        </Typography>
                                    </div>

                                    {showWinners && (
                                        <div className="winners-wrap">
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                                style={{ opacity: 0.8 }}>
                                                winner{amount > 1 ? "s" : ""}
                                            </Typography>

                                            <div className="winners">
                                                {winners.map((w) => (
                                                    <Typography
                                                        className="winner"
                                                        variant="caption"
                                                        color="primary">
                                                        {w}
                                                    </Typography>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Transition>
                    </div>
                ))} */}
        </div>
    );
};

export default KDRGiveaways;
