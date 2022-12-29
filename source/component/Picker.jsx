import style from "./picker.module.css";

export default function () {

    return <RgbPicker />;

}

function RgbPicker () {

    return (
        <div class={ style.picker }>
            <div class={ style.r }>
                <div class={ style.map }></div>
            </div>
            <div class={ style.g }>
                <div class={ style.map }></div>
            </div>
            <div class={ style.b }>
                <div class={ style.map }></div>
            </div>
            <div class={ style.a }>
                <div class={ style.map }></div>
            </div>
        </div>
    );

}
