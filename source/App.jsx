import style from "./app.module.css";

import ColorContext from "./context/ColorContext";

import Picker from "./component/Picker";

import { createSignal } from "solid-js";

export default function App () {

    const [ getBackgroundColor, setBackgroundColor ] = createSignal( "#00000000" );

    return (
        <ColorContext.Provider value={ setBackgroundColor }>
            <div
                class={ style.container }
                style={ { "background-color": getBackgroundColor() } }
            >
                <Picker />
            </div>
        </ColorContext.Provider>
    );

}
