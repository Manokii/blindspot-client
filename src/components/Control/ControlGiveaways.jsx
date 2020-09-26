import React, { useState } from "react";
import { makeStyles, Button, Typography, Paper } from "@material-ui/core";

const q = makeStyles((theme) => ({
    root: {},
}));

const ControlGiveaways = () => {
    const c = q();
    const [state, set] = useState({
        giveaways: [
            {
                prizes: [
                    {
                        product: "Default Product",
                        imgUrl: "",
                        amount: 5,
                        winners: [],
                    },
                ],
                date: Date.now(),
                live: false,
            },
        ],
    });

    return <div className={c.root}></div>;
};

export default ControlGiveaways;
