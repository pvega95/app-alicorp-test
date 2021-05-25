export interface IProcessResponse {
    message:  string;
    posts:    Post[];
    maxPosts: number;
}

export interface Post {
    _id:           string;
    contract:      string;
    type_contract: string;
    typeProcedure: TypeProcedure;
    number:        string;
    year:          string;
    description:   string;
    date:          Date | string;
    items:         string | string;
    user?:         User;
    createdAt:     Date | string;
    updatedAt:     Date | string;
    cod_seg:       string;
    __v:           number;
}

export interface TypeProcedure {
    _id:   string;
    name:  string;
    value: number;
    __v:   number;
}

export interface User {
    _id:      string;
    name:     string;
    lastName: string;
}