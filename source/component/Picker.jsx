import style from "./picker.module.css";

export default function () {

    return <RgbPicker />;

}

function RgbPicker () {

    return (
        <div class={ style.picker }>
            <div class={ style.r }>
                <span class={ style.name }>Red</span>
                <span class={ style.value }>100</span>
                <div class={ style.map }>
                    <div class={ style.anchor }></div>
                </div>
            </div>
            <div class={ style.g }>
                <span class={ style.name }>Green</span>
                <span class={ style.value }>100</span>
                <div class={ style.map }>
                    <div class={ style.anchor }></div>
                </div>
            </div>
            <div class={ style.b }>
                <span class={ style.name }>Blue</span>
                <span class={ style.value }>100</span>
                <div class={ style.map }>
                    <div class={ style.anchor }></div>
                </div>
            </div>
            <div class={ style.a }>
                <span class={ style.name }>Alpha</span>
                <span class={ style.value }>100</span>
                <div class={ style.map }>
                    <div class={ style.anchor }></div>
                    <div class={ style.overlay }></div>
                </div>
            </div>
        </div>
    );

}
