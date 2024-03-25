import React, { useMemo, useContext } from "react";
import cs from "classnames";
import "./index.scss";
import classNames from "classnames";
import { ConfigContext } from "./ConfigProvider"

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    style?: React.CSSProperties,
    size?: SizeType | [SizeType, SizeType],
    direction?: 'horizontal' | 'vertical',
    align?: 'start' | 'end' | 'center' | 'baseline',
    split?: React.ReactNode,
    wrap?: boolean
}

// 将small、middle和large等size转为对应的number
const spaceSize = {
    small: 8,
    middle: 16,
    large: 24
}

function getNumberSize(size: SizeType) {
    return typeof size === 'string' ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = props => {
    const { space } = React.useContext(ConfigContext)

    const { className, style, children, size=space ? space.size : 'small', direction='horizontal', align, split, wrap=false,...otherProps } = props;

    /*
    每一个children外面包一层div
    React.children上的方法用于children的遍历、修改、计数等操作
    toArray方法会对children做扁平化
    */
    const childNodes = React.Children.toArray(props.children);

    const mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align;
    const cn = cs('space', `space-${direction}`, {[`space-align-${mergedAlign}`]: mergedAlign}, className);
    const nodes = childNodes.map((child: any, i) => {
        const key = child && child.key || `space-item-${i}`
        return <>
            <div className='space-item' key={key}>
                {child}
            </div>
            {
                i < childNodes.length && split && (
                    <span className={`${classNames}-split`} style={style}>
                        {split}
                    </span>
                )
            }
        </>
    });

    const otherStyles: React.CSSProperties = {};

    // 缓存计算结果，当传入的依赖size发生变化时重新计算
    const [horizontalSize, verticalSize] = React.useMemo(
        () =>
            ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(item =>
                getNumberSize(item)
            ),
        [size]
    )

    otherStyles.columnGap = horizontalSize;
    otherStyles.rowGap = verticalSize;

    if (wrap) {
        otherStyles.flexWrap = 'wrap';
    }

    return <div
        className={cn}
        style={{
            ...otherStyles,
            ...style
        }}
        {...otherProps}
    >
        {nodes}
    </div>
}

export default Space;