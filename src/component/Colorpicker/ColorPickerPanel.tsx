import {CSSProperties, useState} from "react";
import cs from 'classnames';
import './index.scss';
import {Color} from "./color";
import {ColorType} from "./interface";
import Palette from "./Palette";
import {func} from "prop-types";

export interface ColorPickerProps {
    className?: string,
    style?: CSSProperties,
    value?: ColorType,
    onChange?: (color: Color) => void
}

function ColorPickerPanel(props: ColorPickerProps) {
    const { className, style, value, onChange } = props;
    const classNames = cs("color-picker", className);

    const [colorValue, setColorValue] = useState<Color>(() => {
        if (value instanceof Color) return value;
        return new Color(value);
    })

    function onPaletteColorChange(color: Color) {
        setColorValue(color);
        onChange?.(color);
    }

    return <div className={classNames} style={style}>
        <Palette color={colorValue} onChange={onPaletteColorChange}></Palette>
        <div style={{width: 20, height: 20, background: colorValue.toRgbString(), margin: 10}}></div>
    </div>
}

export default ColorPickerPanel;