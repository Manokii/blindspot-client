import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const q = makeStyles((theme) => ({
    root: {
        height: "100%",
        width: "100%",
        padding: theme.spacing(5),
        whiteSpace: "pre-wrap",
    },
}));

const Downstage2 = () => {
    const {
        downstage2 = {
            msg: "Loading...",
            bgColor: "#282a36",
            txtColor: "#f8f8f2",
            customFontSize: 54,
        },
    } = useSelector((state) => state.live);
    const c = q();
    return (
        <div
            className={c.root}
            style={{
                color: downstage2.txtColor,
                backgroundColor: downstage2.bgColor,
                fontSize: downstage2.customFontSize,
            }}>
            {downstage2.msg}
        </div>
    );
};

export default Downstage2;
