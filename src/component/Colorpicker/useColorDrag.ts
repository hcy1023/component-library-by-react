import React, { useEffect, useRef, useState } from "react";
import { TransformOffset } from "./Transform";
import { Color } from "./color";
// 兼容MouseEvent 和 React.MouseEvent事件
type EventType = | MouseEvent | React.MouseEvent<Element, MouseEvent>

type EventHandle = (e: EventType) => void;

interface useColorDragProps {
    offset?: TransformOffset,
    color: Color,
    containerRef: React.RefObject<HTMLDivElement>,
    targetRef: React.RefObject<HTMLDivElement>,
    direction?: 'x' | 'y',
    onDragChange?: (offset: TransformOffset) => void,
    calculate?: () => TransformOffset
}

function useColorDrag(props: useColorDragProps): [TransformOffset, EventHandle] {
    const { offset, color, targetRef, containerRef, direction, onDragChange, calculate} = props;

    const [offsetValue, setOffsetValue] = useState(offset || { x: 0, y: 0 });
    const dragRef = useRef({ flag: false }); // 标记是否在拖动中

    useEffect(() => {
        if (!dragRef.current.flag) {
            const calcOffset = calculate?.();
            if (calcOffset) {
                setOffsetValue(calcOffset);
            }
        }
    }, [color]);

    // 组件初始化的时候去除之前的事件监听
    useEffect(() => {
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragStop);
    }, []);

    // mousemove时根据event修改offset
    const updateOffset: EventHandle = e => {
        // 鼠标移动的距离
        const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft;
        const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop;

        // e.pageX 和 e.pageY是距离页面顶部和左边的距离
        // 计算离可视区域顶部和左边的距离
        const pageX = e.pageX - scrollXOffset;
        const pageY = e.pageY - scrollYOffset;

        const { x: rectX, y: rectY, width, height } = containerRef.current!.getBoundingClientRect();

        const { width: targetWidth, height: targetHeight } = targetRef.current!.getBoundingClientRect();

        const centerOffsetX = targetHeight / 2;
        const centerOffsetY = targetHeight / 2;

        // 按住handler圆点的中心拖动距离（减去handler圆点的半径）
        const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
        const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;

        const calcOffset = {
            x: offsetX,
            y: direction === 'x' ? offsetValue.y: offsetY, // Slider只能横向拖动
        }

        setOffsetValue(calcOffset);
        onDragChange?.(calcOffset);
    }

    const onDragMove: EventHandle = e => {
        e.preventDefault();
        updateOffset(e);
    }

    // 停止拖动时关闭mousemove和mouseup事件的监听，并关闭开启记录的标志
    const onDragStop: EventHandle = e => {
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragStop);
        dragRef.current.flag = false;
    }

    // 开始拖动时开启mousemove和mouseup事件的监听，并开启记录拖动标志
    const onDragStart: EventHandle = e => {
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragStop);
        dragRef.current.flag = true;
    }

    return [offsetValue, onDragStart];
}

export default useColorDrag;