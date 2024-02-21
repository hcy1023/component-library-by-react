import { createContext } from "react";

// 语言
export interface LocaleContextType {
    locale: string
}

const LocaleContext = createContext<LocaleContextType>({
    locale: 'zh-US'
})

export default LocaleContext;