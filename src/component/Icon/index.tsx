import React, { PropsWithChildren, forwardRef } from "react";
import cs from 'classnames';
import './index.scss'

type BaseIconProps = {
    className?: string,
    style?: React.CSSProperties,
    size?: string,
    spin?: boolean
}

/*
* Omit用法： Omit<T, K> 忽略T类型中的K属性
* 忽略React.SVGAttributes<SVGElement>中BaseIconProps包含的属性，并与BaseIconProps合并
*  */
export type IconProps = BaseIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>;

// size可以传入[10px, 10px]，也可以传入10px来同时指定宽高
export const getSize = (size: IconProps['size']) => {
    if (Array.isArray(size) && size.length === 2) {
        return size as string[];
    }

    const width = (size as string) || '1em';
    const height = (size as string) || '1em';

    return [width, height];
}

// 转发svg的ref
export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((props, ref) => {
    // 接受所有svg的属性，透传给内部的svg
    const { style, className, spin, size = '1em', children, ...rest } = props;

    const [width, height] = getSize(size);
    const cn = cs('icon', { 'icon-spin': spin}, className);

    return (
        <svg ref={ref} className={cn} style={style} width={width} height={height} fill="currentColor" {...rest}>
            {children}
        </svg>
    )
})