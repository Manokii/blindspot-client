import React from "react";
import "react-slideshow-image/dist/styles.css";
import { makeStyles } from "@material-ui/core";

import AdSmMusic1 from "../../../assets/ad_sm_music_1.jpg";

const q = makeStyles((theme) => ({
    root: {
        height: 271,
        width: 470,
        display: "flex",
        "& .img": {
            backgroundSize: "contain",
            backgroundPosition: "bottom left",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${AdSmMusic1})`,
            height: "100%",
            width: "100%",
        },
    },
}));

const AdSmallMusic = () => {
    const c = q();
    return (
        <div className={c.root}>
            <div className="img"></div>
        </div>
    );
};

export default AdSmallMusic;
