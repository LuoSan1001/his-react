export type Case = {
    id: String;
    title: String;
    status: Number;
    director: String;
    createTime?: Date;
    operation?: String[]; 
}

export type MapKey = {
    title: String;
    dataIndex: String;
    key: String;
}

export type CaseList = {
    list: Case[];
    mapKey: MapKey[];
    total: Number;
}
