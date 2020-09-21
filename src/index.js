import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import MyTheme from "./VPH_Theme";
import WebsocketProvider from "./components/WebsocketProvider";

import { createStore } from "redux";
import Reducers from "./redux/AllReducers";
import { Provider } from "react-redux";
import "./VPH.css";

export let store = createStore(
    Reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <WebsocketProvider>
                    <MyTheme>
                        <CssBaseline />
                        <App />
                    </MyTheme>
                </WebsocketProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
