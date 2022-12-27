import logo from "/static/logo.svg";

import styles from "/style/App.module.css";

function App () {

    return (
        <div class={ styles.App }>
            <header class={ styles.header }>
                <img src={ logo } class={ styles.logo } alt="logo" />
            </header>
        </div>
    );
}

export default App;
