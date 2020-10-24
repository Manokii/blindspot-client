import React, { useEffect, useState, useContext } from "react";
import {
    makeStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Paper,
    Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import moment from "moment";
import { wsContext } from "../WebsocketProvider";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },

    prizes: {
        display: "flex",
        flexWrap: "wrap-reverse",
        "& .prize": {
            margin: theme.spacing(2, 2, 0, 0),
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",

            "& .img": {
                width: "100%",
                height: "auto",
            },
        },
    },
}));

const ControlGiveaways = () => {
    const c = q();
    const ws = useContext(wsContext);
    const { giveaways } = useSelector((state) => state.live);
    const [state, set] = useState({
        giveaways: [
            {
                prizes: [
                    {
                        product: "GCash 500",
                        imgUrl:
                            "https://s3.amazonaws.com/apple-platypus-production/assets/attachments/5df2/2077/6f75/3236/bbd7/9a1e/original/GCash_Horizontal_-_Full_Blue_%28Transparent%29.png",
                        amount: 3,
                        winners: [],
                    },
                    {
                        product: "Legion K500 Gaming Keyboard",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-k500-keyboard-feature-05.png",
                        amount: 1,
                        winners: [],
                    },
                    {
                        product: "XSplit License (3-months)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 5,
                        winners: [],
                    },
                ],
                date: "2020-10-10T06:21:00.000Z",
                live: false,
            },
            {
                prizes: [
                    {
                        product: "GCash 500",
                        imgUrl:
                            "https://s3.amazonaws.com/apple-platypus-production/assets/attachments/5df2/2077/6f75/3236/bbd7/9a1e/original/GCash_Horizontal_-_Full_Blue_%28Transparent%29.png",
                        amount: 3,
                        winners: [],
                    },
                    {
                        product: "Legion M500 Gaming Mouse",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-m500-mouse-feature-01.png",
                        amount: 1,
                        winners: [],
                    },
                    {
                        product: "XSplit License (3-months)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 5,
                        winners: [],
                    },
                ],
                date: "2020-10-11T06:32:00.000Z",
                live: false,
            },
            {
                prizes: [
                    {
                        product: "GCash 500",
                        imgUrl:
                            "https://s3.amazonaws.com/apple-platypus-production/assets/attachments/5df2/2077/6f75/3236/bbd7/9a1e/original/GCash_Horizontal_-_Full_Blue_%28Transparent%29.png",
                        amount: 3,
                        winners: [],
                    },
                    {
                        product: "Legion H300 Gaming Headset",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-h300-feature-03.png",
                        amount: 1,
                        winners: [],
                    },
                    {
                        product: "XSplit License (3-months)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 5,
                        winners: [],
                    },
                ],
                date: "2020-10-17T06:34:00.000Z",
                live: false,
            },
            {
                prizes: [
                    {
                        product: "GCash 500",
                        imgUrl:
                            "https://s3.amazonaws.com/apple-platypus-production/assets/attachments/5df2/2077/6f75/3236/bbd7/9a1e/original/GCash_Horizontal_-_Full_Blue_%28Transparent%29.png",
                        amount: 3,
                        winners: [],
                    },
                    {
                        product: "Legion H300 Gaming Headset",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-h300-feature-03.png",
                        amount: 1,
                        winners: [],
                    },
                    {
                        product: "XSplit License (1-month)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 10,
                        winners: [],
                    },
                ],
                date: "2020-10-18T06:38:00.000Z",
                live: false,
            },
            {
                prizes: [
                    {
                        product: "GCash 500",
                        imgUrl:
                            "https://s3.amazonaws.com/apple-platypus-production/assets/attachments/5df2/2077/6f75/3236/bbd7/9a1e/original/GCash_Horizontal_-_Full_Blue_%28Transparent%29.png",
                        amount: 3,
                        winners: [],
                    },
                    {
                        product: "Legion K500 Gaming Keyboard",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-k500-keyboard-feature-05.png",
                        amount: 1,
                        winners: [],
                    },
                    {
                        product: "Legion M500 Gaming Mouse",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-m500-mouse-feature-01.png",
                        amount: 1,
                        winners: [],
                    },
                    {
                        product: "XSplit License (1-month)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 10,
                        winners: [],
                    },
                    {
                        product: "XSplit License (3-months)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 5,
                        winners: [],
                    },
                ],
                date: "2020-10-24T06:40:00.000Z",
                live: false,
            },
            {
                prizes: [
                    {
                        product: "GCash 500",
                        imgUrl:
                            "https://s3.amazonaws.com/apple-platypus-production/assets/attachments/5df2/2077/6f75/3236/bbd7/9a1e/original/GCash_Horizontal_-_Full_Blue_%28Transparent%29.png",
                        amount: 3,
                        winners: [],
                    },
                    {
                        product: "Legion K500 Gaming Keyboard",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-k500-keyboard-feature-05.png",
                        amount: 2,
                        winners: [],
                    },
                    {
                        product: "Legion M500 Gaming Mouse",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-m500-mouse-feature-01.png",
                        amount: 2,
                        winners: [],
                    },
                    {
                        product: "Legion H300 Gaming Headset",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-h300-feature-03.png",
                        amount: 2,
                        winners: [],
                    },
                    {
                        product: "XSplit License (1-month)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 10,
                        winners: [],
                    },
                    {
                        product: "XSplit License (3-months)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 5,
                        winners: [],
                    },
                ],
                date: "2020-10-25T06:43:00.000Z",
                live: false,
            },
            {
                prizes: [
                    {
                        product: "GCash 500",
                        imgUrl:
                            "https://s3.amazonaws.com/apple-platypus-production/assets/attachments/5df2/2077/6f75/3236/bbd7/9a1e/original/GCash_Horizontal_-_Full_Blue_%28Transparent%29.png",
                        amount: 3,
                        winners: [],
                    },
                    {
                        product: "Legion K500 Gaming Keyboard",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-k500-keyboard-feature-05.png",
                        amount: 1,
                        winners: [],
                    },
                    {
                        product: "Legion M500 Gaming Mouse",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-m500-mouse-feature-01.png",
                        amount: 1,
                        winners: [],
                    },
                    {
                        product: "Legion H300 Gaming Headset",
                        imgUrl:
                            "https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-h300-feature-03.png",
                        amount: 1,
                        winners: [],
                    },
                    {
                        product: "XSplit License (1-month)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 10,
                        winners: [],
                    },
                    {
                        product: "XSplit License (3-months)",
                        imgUrl: "https://i.imgur.com/66H7bHE.png",
                        amount: 5,
                        winners: [],
                    },
                ],
                date: "2020-10-31T06:49:00.000Z",
                live: false,
            },
        ],
        selectedIndex: 4,
    });

    const { giveaways: gg, selectedIndex: ii } = state;
    useEffect(() => {
        if (giveaways) {
            set((o) => ({ ...o, giveaways }));
        }
    }, [giveaways]);

    const selectDate = ({ target: { value, name } }) => {
        set((o) => ({ ...o, [name]: parseInt(value) }));
    };

    const toggleLive = (e) => {
        ws.set_live_settings({
            giveaways: [
                ...gg.map((g, i) => (i !== ii ? g : { ...g, live: !g.live })),
            ],
        });
    };

    const toggleWinners = (p) => (e) => {
        ws.set_live_settings({
            giveaways: [
                ...gg.map((g, i) =>
                    i !== ii
                        ? g
                        : {
                              ...g,
                              prizes: [
                                  ...g.prizes.map((pp) =>
                                      pp !== p
                                          ? pp
                                          : {
                                                ...pp,
                                                showWinners: !pp.showWinners,
                                            }
                                  ),
                              ],
                          }
                ),
            ],
        });
    };

    return (
        <div className={c.root}>
            <FormControl variant="filled">
                <InputLabel
                    id="date-select"
                    style={{ color: "rgba(255,255,255,.5)" }}>
                    Date
                </InputLabel>
                <Select
                    labelId="date-select"
                    id="demo-simple-select-filled"
                    value={state.selectedIndex}
                    onChange={selectDate}
                    name="selectedIndex">
                    {state.giveaways.map((g, i) => (
                        <MenuItem value={i} key={i}>
                            {moment(g.date).format("MMMM DD, YYYY - dddd")}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className={c.prizes}>
                {gg[ii].prizes.map((p, index) => (
                    <Paper key={index} elevation={3} className="prize section">
                        <div className="name">
                            x{p.amount} {p.product}
                        </div>
                        <img className="img" src={p.imgUrl} alt={p.product} />
                        {Boolean(p.winners.length) && (
                            <div className="winners-wrap">
                                <Typography variant="caption">
                                    Winners
                                </Typography>
                                <ul className="winners">
                                    {p.winners.map((w) => (
                                        <li>{w}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Button
                            onClick={toggleWinners(p)}
                            variant="outlined"
                            color={p.showWinners ? "secondary" : "default"}
                            startIcon={
                                p.showWinners ? (
                                    <CheckCircleIcon />
                                ) : (
                                    <HighlightOffIcon />
                                )
                            }>
                            {p.showWinners ? "Live: Winners" : "Show Winners"}
                        </Button>
                    </Paper>
                ))}
            </div>

            <Button
                variant="contained"
                onClick={toggleLive}
                color={gg[ii].live ? "secondary" : "default"}
                startIcon={
                    gg[ii].live ? <CheckCircleIcon /> : <HighlightOffIcon />
                }>
                {gg[ii].live ? "Live: Prizes" : "Show Prizes"}
            </Button>
        </div>
    );
};

export default ControlGiveaways;
