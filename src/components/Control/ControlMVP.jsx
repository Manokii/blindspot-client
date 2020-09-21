import React, { useState, useContext, useEffect } from "react";
import {
    makeStyles,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";
import SaveIcon from "@material-ui/icons/Save";
const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",

        "& .fields": {
            display: "flex",
            flexDirection: "column",
            margin: theme.spacing(2, 0),
        },
    },
}));

const ControlMVP = () => {
    const c = q();
    const {
        mvp = {
            name: "",
            agent: "",
            team: "",
            kills: 0,
            assists: 0,
            deaths: 0,
            rating: 0,
        },
    } = useSelector((state) => state.live);
    const [state, set] = useState(mvp);
    const ws = useContext(wsContext);

    useEffect(() => {
        if (!mvp) return;
        set(mvp);
    }, [mvp]);

    const apply = () => {
        ws.set_live_settings({ mvp: state });
    };

    const setState = ({ target: { name, value, type } }) => {
        set({
            ...state,
            [name]: type !== "number" ? value : value < 0 ? 0 : parseInt(value),
        });
        console.log(state);
    };
    return (
        <div className={c.root}>
            <div className="fields">
                <TextField
                    variant="filled"
                    label={
                        <span style={{ color: "rgba(255,255,255,.5)" }}>
                            Name
                        </span>
                    }
                    value={state.name}
                    onChange={setState}
                    name="name"
                />
                <TextField
                    variant="filled"
                    label={
                        <span style={{ color: "rgba(255,255,255,.5)" }}>
                            Team
                        </span>
                    }
                    value={state.team}
                    onChange={setState}
                    name="team"
                />
                {/* <TextField
                    variant="filled"
                    label={
                        <span style={{ color: "rgba(255,255,255,.5)" }}>
                            Agent
                        </span>
                    }
                    value={state.agent}
                    onChange={setState}
                    name="agent"
                /> */}
                <FormControl>
                    <InputLabel
                        id="agent-select-label"
                        style={{ color: "rgba(255,255,255,.5)" }}>
                        Agent
                    </InputLabel>
                    <Select
                        variant="filled"
                        labelId="agent-select-label"
                        id="agent-select"
                        value={mvp.agent}
                        name="agent"
                        onChange={setState}>
                        <MenuItem value={"sage"}>Sage</MenuItem>
                        <MenuItem value={"omen"}>Omen</MenuItem>
                        <MenuItem value={"jett"}>Jett</MenuItem>
                        <MenuItem value={"killjoy"}>Killjoy</MenuItem>
                        <MenuItem value={"reyna"}>Reyna</MenuItem>
                        <MenuItem value={"raze"}>Raze</MenuItem>
                        <MenuItem value={"phoenix"}>Phoenix</MenuItem>
                        <MenuItem value={"cypher"}>Cypher</MenuItem>
                        <MenuItem value={"brimstone"}>Brimstone</MenuItem>
                        <MenuItem value={"sova"}>Sova</MenuItem>
                        <MenuItem value={"breach"}>Breach</MenuItem>
                        <MenuItem value={"viper"}>Viper</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="filled"
                    label={
                        <span style={{ color: "rgba(255,255,255,.5)" }}>
                            Kills
                        </span>
                    }
                    type="number"
                    value={state.kills}
                    name="kills"
                    onChange={setState}
                />
                <TextField
                    variant="filled"
                    label={
                        <span style={{ color: "rgba(255,255,255,.5)" }}>
                            Assists
                        </span>
                    }
                    type="number"
                    value={state.assists}
                    name="assists"
                    onChange={setState}
                />
                <TextField
                    variant="filled"
                    label={
                        <span style={{ color: "rgba(255,255,255,.5)" }}>
                            Deaths
                        </span>
                    }
                    type="number"
                    value={state.deaths}
                    name="deaths"
                    onChange={setState}
                />
                <TextField
                    variant="filled"
                    label={
                        <span style={{ color: "rgba(255,255,255,.5)" }}>
                            Rating
                        </span>
                    }
                    type="number"
                    value={state.rating}
                    name="rating"
                    onChange={setState}
                />
            </div>

            <Button onClick={apply} startIcon={<SaveIcon />}>
                Save MVP
            </Button>
        </div>
    );
};

export default ControlMVP;
