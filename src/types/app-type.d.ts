/**
 * Tabs元数据信息
 */
declare interface TabsInfo {
    currentTab: string;
    parentId?: string;
    tabs: Array<TabInfo>;
}

/**
 * Tab元数据信息
 */
declare interface TabInfo {
    id: string;
    icon?: string;
    caption: string;
    childrens?: TabsInfo;
}

/**
 * App状态信息
 */
declare interface AppState {
    tabInfo: TabsInfo;
}

declare interface ModuleGetter {

}

declare const enum ModuleMutaionType {

}

declare const enum ModuleActionType {

}