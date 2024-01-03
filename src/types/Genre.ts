import { Category } from "./Categories";

export interface Results {
    data:  Genre[];
    links: Links;
    meta:  Meta;
}

export interface Result {
    data: Genre;
    meta: Meta;
    links: Links;
}

export interface Genre {
    id:           string;
    name:         string;
    is_active:    boolean;
    deleted_at:   null | string;
    created_at:   string;
    updated_at:   string;
    categories?:  Category[];
    description?: null | string;
    pivot?:       Pivot;
}

export interface Pivot {
    genre_id:    string;
    category_id: string;
}

export interface Links {
    first: string;
    last:  string;
    prev:  null;
    next:  string;
}

export interface Meta {
    current_page: number;
    from:         number;
    last_page:    number;
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface GenreParams {
    page?: number;
    perPage?: number;
    search?: string;
    isActive?: boolean;
}

export interface GenrePayload {
    id: string;
    name: string;
    categories_id?: string[];
}