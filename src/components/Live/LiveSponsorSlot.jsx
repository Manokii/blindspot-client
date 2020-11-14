import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import globeLogo from "../../assets/globe.png";
import sponsorsLockUp from "../../assets/logos2.png";
import legion_intel from "../../assets/legion.png";
import { useSelector } from "react-redux";
import { Transition } from "react-spring/renderprops";

import globe from "../../assets/globe-ad-small.jpg";
import legion from "../../assets/legion-ad-small.png";
import xsplit from "../../assets/xsplit-ad-small.png";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: 1080,
        width: 1920,
        position: "relative",
        flexDirection: "column-reverse",
        padding: "20px 30px",
        alignItems: "flex-start",
        "& .sponsor-slot": {
            position: "relative",
            "& .headline": {
                position: "relative",
                backgroundSize: "100% 100%",
                backgroundPositionX: "left",
                backgroundRepeat: "no-repeat",
                // backgroundImage: `url(${tape})`,
                padding: theme.spacing(1),
                backgroundColor: "rgba(255,	70,	86, .8)",
                // transform: "translateY(25px)",
                zIndex: 10,

                "& .headline-text": {
                    // transform: "translateY(-4px)",
                    textAlign: "center",
                },
            },

            "& .sponsors": {
                width: 470,
                height: 125,
                padding: theme.spacing(2, 1),
                display: "flex",
                alignItems: "center",
                position: "relative",

                backgroundColor: "rgba(13, 10, 32, .8)",

                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${sponsorsLockUp})`,
                zIndex: 1,
                "& .main": {
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    height: "100%",
                    width: "50%",
                    "& .caption": {
                        padding: theme.spacing(0, 0, 1, 2),
                        color: "#1d439c",
                    },

                    "& .globe": {
                        flex: 1,
                        // backgroundSize: "80%",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${globeLogo})`,
                        // borderRight: "3px solid #1d439c",
                    },
                },

                "& .border": {
                    position: "relative",
                    zIndex: 2,
                    height: "80%",
                    width: 3,
                    // marginTop: 12,
                    opacity: 0.5,
                    backgroundColor: "#1d439c",
                },

                "& .secondary": {
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    flex: 1,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${legion_intel})`,
                },
            },
        },
    },

    ad: {
        width: 470,
        height: 271,
        // border: "1px solid blue",
        display: "flex",
        flexDirection: "column-reverse",

        "& .img": {
            width: "100%",
            height: "auto",
            transition: "all 1s ease-in-out",
            // backgroundPosition: "bottom",/
        },
    },
}));

const LiveSponsorSlot = () => {
    const c = q();
    const {
        popup_sponsor = { live: false },
        current_match_state = "KDR Series",
        maps = { bestOf: "bo3" },
    } = useSelector((state) => state.live);

    const getSrc = (ad) => {
        switch (ad) {
            case "globe":
                return globe;
            case "legion":
                return legion;
            case "xsplit":
                return xsplit;

            default:
                break;
        }
    };

    return (
        <div className={c.root}>
            <Transition
                items={popup_sponsor.live && !popup_sponsor.showAd}
                from={{ opacity: 0, transform: "translateX(-120%)", height: 0 }}
                enter={[
                    { height: "" },
                    { opacity: 1, transform: "translateX(0px)" },
                ]}
                leave={[
                    { opacity: 0, transform: "translateX(-120%)" },
                    { height: 0 },
                ]}>
                {(show) =>
                    show
                        ? (props) => (
                              <div style={props} className="sponsor-slot">
                                  <div className="headline">
                                      <Typography
                                          className="headline-text"
                                          variant="h4">
                                          {current_match_state} -{" "}
                                          {maps.bestOf.toUpperCase()}
                                      </Typography>
                                  </div>
                                  <div className="sponsors">
                                      {/* <div className="texture"></div> */}
                                  </div>
                              </div>
                          )
                        : (props) => (
                              <div className={c.ad} style={props}>
                                  <img
                                      src={getSrc(popup_sponsor.ad)}
                                      className="img"
                                  />
                              </div>
                          )
                }
            </Transition>
            {/* test */}
        </div>
    );
};

export default LiveSponsorSlot;
