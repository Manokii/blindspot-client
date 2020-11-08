import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const us = makeStyles((theme) => ({
    root: {
        height: "100%",
        width: "100%",
        flex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(30%, 1fr))",

        "& .link": {
            display: "flex",
            margin: "auto",
            height: "100%",
            width: "100%",
        },
    },
}));

const data = [
    { title: "Info Box", path: "/live/infobox" },
    { title: "Match Widgets", path: "/live/matchwidgets" },
    { title: "Ingame", path: "/live/ingame?noSidebar" },
    { title: "MatchUp", path: "/live/matchup?noSidebar" },
];

const Live = ({ history }) => {
    const classes = us();

    return (
        <div className={classes.root}>
            {data.map((link) => (
                <Button
                    className="link"
                    onClick={() => history.push(link.path)}>
                    {link.title}
                </Button>
            ))}
        </div>
    );
};

export default withRouter(Live);
