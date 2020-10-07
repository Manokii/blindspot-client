import React from "react";
import { withRouter } from "react-router-dom";
import {
    Drawer,
    makeStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import VideocamIcon from "@material-ui/icons/Videocam";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RedeemIcon from "@material-ui/icons/Redeem";

import Mogul from "./Mogul";
import qs from "qs";

const drawerWidth = 230;
const useStyles = makeStyles((theme) => ({
    root: {
        width: drawerWidth,
        height: "100%",
        display: (props) => (props.noSidebar ? "none" : "flex"),
    },

    drawerPaper: {
        width: drawerWidth,
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(1),
    },

    List: { flex: 1 },
}));

const links = [
    { title: "Tournament", path: "/tournament", icon: <AccountTreeIcon /> },
    { title: "Control", path: "/control", icon: <DashboardIcon /> },
    { title: "Giveaways", path: "/giveaways", icon: <RedeemIcon /> },
    { title: "Live", path: "/live", icon: <VideocamIcon /> },
];

const Navigation = ({ location: { search }, history }) => {
    const classes = useStyles(qs.parse(search, { ignoreQueryPrefix: true }));

    const gotoPath = (path) => history.push(path);

    return (
        <Drawer
            variant="permanent"
            className={classes.root}
            classes={{ paper: classes.drawerPaper }}>
            <List className={classes.List}>
                {links.map(({ title, path, icon }, index) => (
                    <ListItem
                        dense
                        button
                        key={index}
                        onClick={() => gotoPath(path)}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItem>
                ))}
            </List>
            <Mogul />
        </Drawer>
    );
};

export default withRouter(Navigation);
