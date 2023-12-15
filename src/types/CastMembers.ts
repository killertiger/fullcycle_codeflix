export interface Results {
    data: CastMember[];
    links: Links;
    meta: Meta;
}

export interface Result {
    data: CastMember;
    links: Links;
    meta: Meta;
}

export interface CastMember {
    id: string;
    name: string;
    type: number;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
}

export interface Links {
    first: string;
    last: string;
    prev: null | string;
    next: null | string;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface CastMemberParams {
    page?: number;
    per_page?: number;
    search?: string;
    type?: number;
}