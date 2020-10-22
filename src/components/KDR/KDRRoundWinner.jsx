import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    roundWinner: {
        width: 1920,
        height: 1080,
    },
}));

const KDRRoundWinner = () => {
    const classes = useStyles();
    return <div className={classes.roundWinner}>test</div>;
};

export default KDRRoundWinner;
