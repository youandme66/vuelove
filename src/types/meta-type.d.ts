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
    recommend?: RecommendState;
    [key: string]: any;
}

/**
 * customObject存放自定义属性
 */
interface Vue {
    [key: string]: any;
}

/**
 * 应用所有的数据驱动type
 */
declare const enum MutationType {
    AddPersonInfos = 'addPersonInfos'
}

/**
 * 应用所有的异步请求type
 */
declare const enum ActionType {
    RequestPersonInfos = 'requestPersonInfos'
}