import React, { useContext, useState, useEffect } from "react";
import { wsContext } from "../WebsocketProvider";
import { makeStyles, TextField, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useSelector } from "react-redux";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    color: {
        margin: theme.spacing(2, 0, 0, 0),
        // borderRadius: 10,
        flex: 1,
        "& .MuiInputBase-input": {
            margin: 0,
            height: 50,
            cursor: "pointer",
        },
    },

    preview: {
        flex: 1,
        display: "flex",
        margin: theme.spacing(2, 0),
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
    },
}));

const ControlDownstageMonitor = () => {
    const c = q();
    const ws = useContext(wsContext);
    const [state, set] = useState({
        msg: "",
        bgColor: "#282a36",
        txtColor: "#f8f8f2",
        customFontSize: 54,
    });

    const setState = ({ target: { value, name, type } }) => {
        set({
            ...state,
            [name]: type !== "number" ? value : value < 0 ? 0 : parseInt(value),
        });
    };

    const { downstage } = useSelector((state) => state.live);

    useEffect(() => {
        if (!downstage) return;
        set(downstage);
    }, [downstage]);

    const apply = () => {
        ws.set_live_settings({ downstage: state });
    };

    return (
        <div className={c.root}>
            <TextField
                variant="filled"
                value={state.msg}
                onChange={setState}
                name="msg"
                label={
                    <span style={{ color: "rgba(255,255,255,.5)" }}>
                        Message
                    </span>
                }
                multiline
                rows={3}
                rowsMax={10}
            />

            <div className="" style={{ display: "flex" }}>
                <TextField
                    // variant="filled"
                    value={state.bgColor}
                    onChange={setState}
                    name="bgColor"
                    type="color"
                    label={
                        <span style={{ color: "rgba(255,255,255,.5)" }}>
                            Background Color
                        </span>
                    }
                    className={c.color}
                    // disableUnderline
                    autoFocus
                    InputProps={{ disableUnderline: true }}
                />
                <TextField
                    // variant="filled"
                    value={state.txtColor}
                    onChange={setState}
                    name="txtColor"
                    type="color"
                    label={
                        <span style={{ color: "rgba(255,255,255,.5)" }}>
                            Text Color
                        </span>
                    }
                    className={c.color}
                    // disableUnderline
                    autoFocus
                    InputProps={{ disableUnderline: true }}
                />
            </div>
            <TextField
                variant="filled"
                value={state.customFontSize}
                onChange={setState}
                name="customFontSize"
                type="number"
                label={
                    <span style={{ color: "rgba(255,255,255,.5)" }}>
                        FontSize
                    </span>
                }
            />

            <div
                className={c.preview}
                style={{
                    color: state.txtColor,
                    backgroundColor: state.bgColor,
                    fontSize: state.customFontSize,
                }}>
                {state.msg}
            </div>

            <Button
                onClick={apply}
                startIcon={<SendIcon />}
                variant="contained">
                Send
            </Button>
        </div>
    );
};

export default ControlDownstageMonitor;
