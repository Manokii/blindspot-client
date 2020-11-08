import React from "react";
// import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { makeStyles } from "@material-ui/core";

import AdSmXSplit1 from "../../../assets/ad_sm_xsplit_1.jpg";

const q = makeStyles((theme) => ({
    root: {
        height: 271,
        width: 470,

        display: "flex",
        "& .img": {
            display: "flex",
            backgroundSize: "contain",
            backgroundPosition: "bottom left",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${AdSmXSplit1})`,
        },
    },
}));

const AdSmallXSplit = () => {
    const c = q();
    return (
        <div className={c.root}>
            <div className="img"></div>
        </div>
    );
};

export default AdSmallXSplit;
