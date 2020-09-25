import React, { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";

const q = makeStyles((theme) => ({
    root: {},
}));

const ControlGiveaways = () => {
    const c = q();
    const [state, set] = useState({
        giveaways: [
            {
                prizes: [{ product: "", imgUrl: "", amount: 5 }],
                date: Date.now(),
            },
        ],
    });
    return <div className={c.root}>test</div>;
};

export default ControlGiveaways;
