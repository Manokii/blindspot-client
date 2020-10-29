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
import { withRouter } from "react-router-dom";

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
    noTournament: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
    },
}));

const ControlGiveaways = ({ history }) => {
    const c = q();
    const ws = useContext(wsContext);
    const { giveaways } = useSelector((state) => state.live);
    const [state, set] = useState({
        giveaways: [],
        selectedIndex: 0,
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

    return Boolean(gg.length) ? (
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
    ) : (
        <div className={c.noTournament}>
            <Typography variant="caption" color="initial">
                No Tournament Found
            </Typography>
            <Button
                onClick={() => history.push("/giveaways")}
                variant="outlined"
                size="small">
                Set Giveaways
            </Button>
        </div>
    );
};

export default withRouter(ControlGiveaways);
