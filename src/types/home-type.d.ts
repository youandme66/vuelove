interface RecommendState {
    personInfos: Array<PersonInfo>;
}

interface PersonInfo {
    // 用户主键
    id: string;
    // 名称
    name: string;
    // 年龄
    age: number;
    // 省区
    provincialArea: string;
    // 备注
    remark: string;
    // 头像
    image?: string;
    // 状态
    status?: Status;
    // 是否关注
    isFollow?: boolean;
    // 性别
    sex: Sex;
}

declare const enum Status {
    // 在线
    Online = 0,
    // 刚刚在线
    JustOnline = 1,
    // 视频中
    Video = 2
}

declare const enum Sex {
    // 男
    Male = 0,
    // 女
    FeMale = 1
}