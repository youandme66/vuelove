declare interface JSONObject {
    [key: string]: any;
}

declare const enum ModuleType {
    App = 'app'
}

/**
 * 各个模块状态信息
 */
declare interface ModuleState {
    app?: AppState;
    [key: string]: any;
}

/**
 * customObject存放自定义属性
 */
interface Vue {
    [key: string]: any;
}