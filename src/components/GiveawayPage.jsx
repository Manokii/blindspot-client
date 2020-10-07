import React, { useState, useContext, useEffect } from "react";
import {
    makeStyles,
    TextField,
    Button,
    Typography,
    Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import ChipInput from "material-ui-chip-input";
import Chip from "@material-ui/core/Chip";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import { wsContext } from "./WebsocketProvider";
import { useSelector } from "react-redux";
// import { Save } from "@material-ui/icons";

const q = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        // display: "flex",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,

        overflow: "auto",

        "& .giveaways": {
            heigth: "100%",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gridGap: 20,
            padding: theme.spacing(3),
            overflow: "auto",
            "& .section": {
                display: "flex",
                flexDirection: "column",
            },
            "& .giveaway": {
                backgroundColor: "#26408B",

                padding: theme.spacing(3, 3, 1, 3),
                "& .prizes-wrap": {
                    marginTop: theme.spacing(2),
                    "& .prizes": {
                        margin: theme.spacing(1, 0),
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: 400,
                        overflow: "auto",
                        "& .prize": {
                            margin: theme.spacing(1, 2),
                        },
                    },
                },
            },
        },
    },
    fab: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        "& .icon": {
            marginRight: theme.spacing(1),
        },
    },
}));

// prettier-ignore
const GiveawayPage = () => {
    const c = q();
    const ws = useContext(wsContext);
    const [state, set] = useState({
        giveaways: [
          {
            prizes: [
              {
                product: 'GCash 500',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 3,
                winners: []
              },
              {
                product: 'Legion K500 Gaming Keyboard',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 1,
                winners: []
              },
              {
                product: 'XSplit License (3-months)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 5,
                winners: []
              }
            ],
            date: '2020-10-10T06:21:00.000Z',
            live: false
          },
          {
            prizes: [
              {
                product: 'GCash 500',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 3,
                winners: []
              },
              {
                product: 'Legion M500 Gaming Mouse',
                imgUrl: 'https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-m500-mouse-feature-01.png',
                amount: 1,
                winners: []
              },
              {
                product: 'XSplit License (3-months)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 5,
                winners: []
              }
            ],
            date: '2020-10-11T06:32:00.000Z',
            live: false
          },
          {
            prizes: [
              {
                product: 'GCash 500',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 3,
                winners: []
              },
              {
                product: 'Legion H300 Gaming Headset Gaming Headset',
                imgUrl: 'https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-h300-feature-03.png',
                amount: 1,
                winners: []
              },
              {
                product: 'XSplit License (3-months)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 5,
                winners: []
              }
            ],
            date: '2020-10-17T06:34:00.000Z',
            live: false
          },
          {
            prizes: [
              {
                product: 'GCash 500',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 3,
                winners: []
              },
              {
                product: 'Legion H300 Gaming Headset Gaming Headset',
                imgUrl: 'https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-h300-feature-03.png',
                amount: 1,
                winners: []
              },
              {
                product: 'XSplit License (1-month)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 10,
                winners: []
              }
            ],
            date: '2020-10-18T06:38:00.000Z',
            live: false
          },
          {
            prizes: [
              {
                product: 'GCash 500',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 3,
                winners: []
              },
              {
                product: 'Legion K500 Gaming Keyboard',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 1,
                winners: []
              },
              {
                product: 'Legion M500 Gaming Mouse',
                imgUrl: 'https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-m500-mouse-feature-01.png',
                amount: 1,
                winners: []
              },
              {
                product: 'XSplit License (1-month)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 10,
                winners: []
              },
              {
                product: 'XSplit License (3-months)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 5,
                winners: []
              }
            ],
            date: '2020-10-24T06:40:00.000Z',
            live: false
          },
          {
            prizes: [
              {
                product: 'GCash 500',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 3,
                winners: []
              },
              {
                product: 'Legion K500 Gaming Keyboard',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 2,
                winners: []
              },
              {
                product: 'Legion M500 Gaming Mouse',
                imgUrl: 'https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-m500-mouse-feature-01.png',
                amount: 2,
                winners: []
              },
              {
                product: 'Legion H300 Gaming Headset Gaming Headset',
                imgUrl: 'https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-h300-feature-03.png',
                amount: 2,
                winners: []
              },
              {
                product: 'XSplit License (1-month)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 10,
                winners: []
              },
              {
                product: 'XSplit License (3-months)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 5,
                winners: []
              }
            ],
            date: '2020-10-25T06:43:00.000Z',
            live: false
          },
          {
            prizes: [
              {
                product: 'GCash 500',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 3,
                winners: []
              },
              {
                product: 'Legion K500 Gaming Keyboard',
                imgUrl: 'https://i.imgur.com/kDw12Xx.png',
                amount: 1,
                winners: []
              },
              {
                product: 'Legion M500 Gaming Mouse',
                imgUrl: 'https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-legion-m500-mouse-feature-01.png',
                amount: 1,
                winners: []
              },
              {
                product: 'Legion H300 Gaming Headset Gaming Headset',
                imgUrl: 'https://static.lenovo.com/na/subseries/featured-images/lenovo-halo-page-h300-feature-03.png',
                amount: 1,
                winners: []
              },
              {
                product: 'XSplit License (1-month)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 10,
                winners: []
              },
              {
                product: 'XSplit License (3-months)',
                imgUrl: 'https://i.imgur.com/TRNCeML.png',
                amount: 5,
                winners: []
              }
            ],
            date: '2020-10-31T06:49:00.000Z',
            live: false
          }
        ]
      });

    const {giveaways} = useSelector((state) => state.live);

    useEffect(() => {
        if (giveaways) {
            set({ giveaways: giveaways })
        };
    }, [giveaways]);

    const addGiveaway = (e) => {
        set((o) => ({ ...o, giveaways: [ ...o.giveaways, { prizes: [{ product: "New Product", imgUrl: "", amount: 1, winners: [], }], date: Date.now(), live: false  }]}));
    };

    const removeGiveaway = (g) => (e) => {
        set((o) => ({ ...o, giveaways: [ ...o.giveaways.filter((gg) => gg !== g)]}));
    };

    const removePrize = (g, p) => (e) => {
        set((o) => ({ ...o, giveaways: [ ...o.giveaways.map((gg) => gg !== g ? gg : { ...g, prizes: [...g.prizes.filter((pp) => pp !== p)]})]}));
    };

    const addPrizeToGiveaway = (g) => (e) => {
        set((o) => ({ ...o, giveaways: [ ...o.giveaways.map((gg) => gg !== g ? gg : { ...g, prizes: [ ...g.prizes, { product: "New Product", imgUrl: "", amount: 1, winners: [] }]})]}));
    };

    const setDate = (g) => (date) => {
        set((o) => ({ ...o, giveaways: [ ...o.giveaways.map((gg) => gg !== g ? gg : { ...g, date: date })]}));
    };

    const setPrize = (g, p) => ({ currentTarget: { value, name, type } }) => {
        set((o) => ({ ...o, giveaways: [ ...o.giveaways.map((gg) => gg !== g ? gg : { ...g, prizes: [ ...g.prizes.map((pp) => pp !== p ? pp : { ...p, [name]: type !== "number" ? value : value < 1 ? 1 : parseInt(value)})]})]}));
    };

    const addWinner = (g, p) => (chip) => {
        set((o) => ({ ...o, giveaways: [ ...o.giveaways.map((gg) => gg !== g ? gg : { ...g, prizes: [ ...g.prizes.map((pp) => pp !== p ? pp : { ...p, winners: [...p.winners, chip]})]})]}));
    };

    const removeWinner = (g, p, c) => () => {
        set((o) => ({ ...o, giveaways: [ ...o.giveaways.map((gg) => gg !== g ? gg : { ...g, prizes: [ ...g.prizes.map((pp) => pp !== p ? pp : { ...p, winners: [ ...p.winners.filter((cc) => cc !== c)]})]})]}));
    };

    const save = () => {
        ws.set_live_settings(state);
    };

    return (
        <div className={c.root}>
            <div className="giveaways">
                {state.giveaways.map((g, i) => (
                    <Paper elevation={5} key={i} className="section giveaway">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MMMM dd, yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label={
                                    <span
                                        style={{
                                            color: "rgba(255,255,255,.5)",
                                        }}>
                                        Date
                                    </span>
                                }
                                value={g.date}
                                onChange={setDate(g)}
                                name="date"
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <div className="prizes-wrap">
                            <Typography variant="caption">Prizes</Typography>
                            <div className="prizes">
                                {g.prizes.map((p, j) => (
                                    <div key={j} className="section prize">
                                        <TextField
                                            variant="filled"
                                            value={p.product}
                                            name="product"
                                            label={
                                                <span
                                                    style={{
                                                        color:
                                                            "rgba(255,255,255,.5)",
                                                    }}>
                                                    Product Name
                                                </span>
                                            }
                                            onChange={setPrize(g, p)}
                                        />
                                        <TextField
                                            variant="filled"
                                            value={p.imgUrl}
                                            name="imgUrl"
                                            label={
                                                <span
                                                    style={{
                                                        color:
                                                            "rgba(255,255,255,.5)",
                                                    }}>
                                                    Image URL
                                                </span>
                                            }
                                            onChange={setPrize(g, p)}
                                        />
                                        <TextField
                                            variant="filled"
                                            value={p.amount}
                                            name="amount"
                                            type="number"
                                            onChange={setPrize(g, p)}
                                            label={
                                                <span
                                                    style={{
                                                        color:
                                                            "rgba(255,255,255,.5)",
                                                    }}>
                                                    Amount
                                                </span>
                                            }
                                        />
                                        <ChipInput
                                            value={p.winners}
                                            onAdd={addWinner(g, p)}
                                            label={
                                                <span
                                                    style={{
                                                        color:
                                                            "rgba(255,255,255,.5)",
                                                    }}>
                                                    Winners
                                                </span>
                                            }
                                            variant="filled"
                                            color="primary"
                                            size="small"
                                            chipRenderer={({ value }, i) => (
                                                <Chip
                                                    key={i}
                                                    label={value}
                                                    color="primary"
                                                    size="small"
                                                    style={{
                                                        margin: "0px 3px",
                                                    }}
                                                    onDelete={removeWinner(
                                                        g,
                                                        p,
                                                        value
                                                    )}
                                                />
                                            )}
                                        />
                                        <Button
                                            variant="text"
                                            onClick={removePrize(g, p)}
                                            color="secondary"
                                            size="small"
                                            startIcon={
                                                <RemoveCircleOutlineIcon />
                                            }>
                                            Remove Prize
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="outlined"
                                    onClick={addPrizeToGiveaway(g)}
                                    color="default"
                                    size="small"
                                    style={{ margin: 16 }}
                                    startIcon={<AddIcon />}>
                                    Add Prize
                                </Button>
                            </div>
                        </div>

                        <Button
                            variant="text"
                            onClick={removeGiveaway(g)}
                            color="secondary"
                            size="small"
                            startIcon={<RemoveCircleIcon />}>
                            Remove Giveaway
                        </Button>
                    </Paper>
                ))}
                <Button
                    variant="outlined"
                    onClick={addGiveaway}
                    color="default"
                    size="large"
                    startIcon={<AddIcon />}>
                    Add Giveaway
                </Button>
            </div>

            <Fab
                variant="extended"
                className={c.fab}
                onClick={save}
                color="primary">
                <SaveIcon className="icon" />
                Save
            </Fab>
        </div>
    );
};

export default GiveawayPage;
