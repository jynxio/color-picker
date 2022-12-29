import style from "./app.module.css";

import Picker from "./component/Picker";

export default function App () {

    return (
        <div class={ style.container }>
            <Picker />
        </div>
    );

}
