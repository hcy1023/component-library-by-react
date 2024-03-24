import React from "react";
import { Icon, IconProps } from "./index";

const loadedSet = new Set<string>();

// 传入scriptUrl，在body上添加<script>标签引入
export function createFromIconfont(scriptUrl: string) {
    if (scriptUrl.length && !loadedSet.has(scriptUrl)) {
        const script = document.createElement('script');
        script.setAttribute('src', scriptUrl);
        script.setAttribute('data-namespace', scriptUrl);
        document.body.appendChild(script);

        loadedSet.add(scriptUrl);
    }

    const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
        const { type, ...rest } = props;

        return (
            <Icon {...rest} ref={ref}>
                { type ? <use xlinkHref={`#${type}`} /> : null}
            </Icon>
        )
    })

    return Iconfont;
}