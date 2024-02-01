import { CastMember } from "./CastMembers";
import { Category } from "./Categories";
import { Genre } from "./Genre";


export type FileObject = {
    name: string;
    file: File;
};

export interface Results {
    data: Video[];
    links: Links;
    meta: Meta;
}

export interface Result {
    data: Video;
    links: Links;
    meta: Meta;
}

export interface Video {
    id: string;
    title: string;
    description: string;
    year_launched: number;
    opened: boolean;
    rating: string;
    duration: number;
    deleted_at?: string | null;
    created_at: string;
    updated_at: string;
    genres?: Genre[];
    categories?: Category[];
    cast_members?: CastMember[];
    thumb_file_url: string;
    banner_file_url: string;
    trailer_file_url: string;
    video_file_url: string;
}

export interface Links {
    first: string;
    last: string;
    prev: null;
    next: string;
}

export interface Meta {
    current_page?: number;
    from?: number;
    last_page?: number;
    path?: string;
    per_page?: number;
    to?: number;
    total?: number;
}

export interface VideoParams {
    page?: number;
    perPage?: number;
    search?: string;
    isActive?: boolean;
}

export interface VideoPayload {
    id: string;
    title: string;
    description: string;
    opened: boolean;
    year_launched: number;
    rating: string;
    duration: number;
    categories_id?: string[];
    genres_id?: string[];
    cast_members_id?: string[];
}