/**
 * css
 */
import "/style/reset.css";

import "/style/index.css";

/**
 * js
 */
import { render } from "solid-js/web";

import { App } from "./App";

render( _ => <App />, document.getElementById( "solid-app" ) );
