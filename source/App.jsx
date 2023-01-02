import style from "./app.module.css";

import ColorContext from "./context/ColorContext";

import Picker from "./component/Picker";

import { createSignal } from "solid-js";

export default function App () {

    const [ getHexColor, setHexColor ] = createSignal( "#00000000" );

    return (
        <ColorContext.Provider value={ setHexColor }>
            <div
                class={ style.container }
                style={ { "background-color": getHexColor() } }
            >
                <Picker />
            </div>
        </ColorContext.Provider>
    );

}
