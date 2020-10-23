import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";
import { withRouter } from "react-router-dom";
import qs from "qs";

import {
    makeStyles,
    Fab,
    Menu,
    FormGroup,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Tooltip,
} from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import DeleteIcon from "@material-ui/icons/Delete";

const us = makeStyles((theme) => ({
    fabs: {
        position: "fixed",
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",

        "& .fab": {
            marginTop: theme.spacing(1),
        },
    },
    menu: {
        padding: theme.spacing(2),
        "&:focus": { outline: "none", border: "none" },
    },
}));

const FABs = ({ history, location: { search }, state, set }) => {
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    const c = us();
    const {
        inverse,
        lower_thirds = {
            headline: "KDR Series",
            subtext: "#Globe #LegionxIntel #XSplit #KDRseries #StepUpYourGame",
            live: false,
        },
        talents = {
            casters: [
                {
                    name: "Daks",
                    social: "@dakscasts",
                    live: true,
                },
                {
                    name: "Vyminal",
                    social: "@vyminal",
                    live: true,
                },
            ],
            observers: [
                {
                    name: "DodgeThiss",
                    social: "@dodgethiss_",
                    live: true,
                },
            ],
            liveOnLowerThirds: true,
            live: true,
        },
    } = useSelector((state) => state.live);
    const ws = useContext(wsContext);
    const [anchorElement, setAnchor] = useState(null);

    const openMenu = ({ currentTarget }) => {
        setAnchor(currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    const handleChange = ({ target: { name, checked } }) => {
        set({ ...state, [name]: checked });
    };

    const deleteRoundWinner = () => {
        ws.set_live_settings({ round_winner: null });
    };

    const changeAll = () => {
        if (!Object.values(state).every((v) => v === true)) {
            set({
                matches: true,
                manualInput: true,
                match: true,
                lowerThirds: true,
                talents: true,
                veto: true,
                playerAgents: true,
                popups: true,
                previousMatches: true,
                mvp: true,
                downstage: true,
                downstage2: true,
                giveaways: true,
                mogul: true,
            });
        } else {
            set({
                matches: false,
                manualInput: false,
                match: false,
                lowerThirds: false,
                talents: false,
                veto: false,
                playerAgents: false,
                popups: false,
                previousMatches: false,
                mvp: false,
                downstage: false,
                downstage2: false,
                giveaways: false,
                mogul: false,
            });
        }
    };

    return (
        <>
            <div className={c.fabs}>
                {!params.hideMenu && (
                    <Fab
                        className="fab"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={openMenu}>
                        <MenuBookIcon />
                    </Fab>
                )}

                <Tooltip
                    title={
                        <span>
                            Click to {lower_thirds?.live ? "HIDE" : "SHOW"}{" "}
                            Lower Thirds
                        </span>
                    }
                    placement="left">
                    <Fab
                        className="fab"
                        // aria-haspopup="true"
                        size="medium"
                        color={lower_thirds?.live ? "secondary" : "primary"}
                        onClick={() =>
                            ws.set_live_settings({
                                lower_thirds: {
                                    ...lower_thirds,
                                    live: !lower_thirds?.live,
                                },
                            })
                        }>
                        <CallToActionIcon />
                    </Fab>
                </Tooltip>

                <Tooltip title={<span>Swap Team Sides</span>} placement="left">
                    <Fab
                        className="fab"
                        // aria-haspopup="true"
                        size="medium"
                        color={inverse ? "secondary" : "primary"}
                        onClick={() =>
                            ws.set_live_settings({ inverse: !inverse })
                        }>
                        <SwapHorizIcon />
                    </Fab>
                </Tooltip>

                <Tooltip
                    title={
                        <span>
                            Click to{" "}
                            {talents?.live && talents?.liveOnLowerThirds
                                ? "HIDE"
                                : "SHOW"}{" "}
                            Talents
                        </span>
                    }
                    placement="left">
                    <Fab
                        className="fab"
                        // aria-haspopup="true"
                        size="medium"
                        color={
                            talents?.live && talents?.liveOnLowerThirds
                                ? "secondary"
                                : "primary"
                        }
                        onClick={() =>
                            ws.set_live_settings({
                                talents: {
                                    ...talents,
                                    live: !Boolean(
                                        talents?.live &&
                                            talents?.liveOnLowerThirds
                                    ),
                                    liveOnLowerThirds: !Boolean(
                                        talents?.live &&
                                            talents?.liveOnLowerThirds
                                    ),
                                },
                            })
                        }>
                        <HeadsetMicIcon />
                    </Fab>
                </Tooltip>
                <Tooltip
                    title="Hide Round Winner Flash Screen"
                    placement="left">
                    <Fab
                        className="fab"
                        // aria-haspopup="true"
                        size="medium"
                        color="secondary"
                        onClick={deleteRoundWinner}>
                        <DeleteIcon />
                    </Fab>
                </Tooltip>
            </div>

            <Menu
                id="simple-menu"
                anchorEl={anchorElement}
                keepMounted
                open={Boolean(anchorElement)}
                onClose={closeMenu}>
                <div className={c.menu}>
                    <FormGroup>
                        {Object.keys(state).map((key) => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        style={{
                                            color: !state[key]
                                                ? "rgba(255,255,255,.5)"
                                                : "",
                                        }}
                                        checked={state[key]}
                                        onChange={handleChange}
                                        name={key}
                                    />
                                }
                                label={key}
                            />
                        ))}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Object.values(state).every(
                                        (v) => v === true
                                    )}
                                    indeterminate={
                                        !Object.values(state).every(
                                            (v) => v === true
                                        ) &&
                                        !Object.values(state).every(
                                            (v) => v === false
                                        )
                                    }
                                    onChange={changeAll}
                                    style={{
                                        color:
                                            !Object.values(state).every(
                                                (v) => v === true
                                            ) && "rgba(255,255,255,.5)",
                                    }}
                                />
                            }
                            label="Show All"
                        />
                    </FormGroup>
                </div>
                <MenuItem
                    button
                    onClick={() =>
                        history.push("/tournament?noSidebar=1&simple=1")
                    }>
                    Go to Match list
                </MenuItem>
            </Menu>
        </>
    );
};

export default withRouter(FABs);
