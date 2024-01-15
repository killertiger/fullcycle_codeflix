export const genreResponse = {
    "data": [
        {
            "id": "56dba005-b027-403f-a7d0-1de33e66bba5",
            "name": "Italy",
            "is_active": true,
            "deleted_at": null,
            "created_at": "2024-01-15T11:34:10+0000",
            "updated_at": "2024-01-15T11:34:10+0000",
            "categories": [
                {
                    "id": "0bed6219-084f-4c9b-adf1-fe5a0276380e",
                    "name": "MediumTurquoise",
                    "description": null,
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:09+0000",
                    "updated_at": "2024-01-15T11:34:09+0000",
                    "pivot": {
                        "genre_id": "56dba005-b027-403f-a7d0-1de33e66bba5",
                        "category_id": "0bed6219-084f-4c9b-adf1-fe5a0276380e"
                    }
                },
                {
                    "id": "9d2d4077-5939-4202-abf4-ad074d3b3fb7",
                    "name": "White",
                    "description": "Possimus est laborum iusto.",
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:09+0000",
                    "updated_at": "2024-01-15T11:34:09+0000",
                    "pivot": {
                        "genre_id": "56dba005-b027-403f-a7d0-1de33e66bba5",
                        "category_id": "9d2d4077-5939-4202-abf4-ad074d3b3fb7"
                    }
                },
                {
                    "id": "33584368-73b6-4592-86f3-50fba65377a3",
                    "name": "DarkGray",
                    "description": null,
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:10+0000",
                    "updated_at": "2024-01-15T11:34:10+0000",
                    "pivot": {
                        "genre_id": "56dba005-b027-403f-a7d0-1de33e66bba5",
                        "category_id": "33584368-73b6-4592-86f3-50fba65377a3"
                    }
                },
                {
                    "id": "109e98e0-1311-4741-92fd-a8665999773b",
                    "name": "LightSalmon",
                    "description": "Similique eveniet incidunt omnis aliquam nemo ut.",
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:10+0000",
                    "updated_at": "2024-01-15T11:34:10+0000",
                    "pivot": {
                        "genre_id": "56dba005-b027-403f-a7d0-1de33e66bba5",
                        "category_id": "109e98e0-1311-4741-92fd-a8665999773b"
                    }
                },
                {
                    "id": "75c2ca42-2339-4dbc-a156-e39d9a2182d3",
                    "name": "PeachPuff",
                    "description": null,
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:10+0000",
                    "updated_at": "2024-01-15T11:34:10+0000",
                    "pivot": {
                        "genre_id": "56dba005-b027-403f-a7d0-1de33e66bba5",
                        "category_id": "75c2ca42-2339-4dbc-a156-e39d9a2182d3"
                    }
                }
            ]
        },
    ],
    "links": {
        "first": "http:\/\/localhost:8000\/api\/genres?page=1",
        "last": "http:\/\/localhost:8000\/api\/genres?page=10",
        "prev": null,
        "next": "http:\/\/localhost:8000\/api\/genres?page=2"
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 10,
        "path": "http:\/\/localhost:8000\/api\/genres",
        "per_page": 10,
        "to": 10,
        "total": 100
    }
}

export const genreResponsePage2 = {
    "data": [
        {
            "id": "953ef2d5-6a50-449b-aa40-fdebdc40a60f",
            "name": "Kuwait",
            "is_active": true,
            "deleted_at": null,
            "created_at": "2024-01-15T11:34:10+0000",
            "updated_at": "2024-01-15T11:34:10+0000",
            "categories": [
                {
                    "id": "77b3dca8-6cec-40dc-a9e6-a1fd888402d2",
                    "name": "NavajoWhite",
                    "description": "Illo pariatur molestiae ipsum quis itaque.",
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:10+0000",
                    "updated_at": "2024-01-15T11:34:10+0000",
                    "pivot": {
                        "genre_id": "953ef2d5-6a50-449b-aa40-fdebdc40a60f",
                        "category_id": "77b3dca8-6cec-40dc-a9e6-a1fd888402d2"
                    }
                },
                {
                    "id": "3539e03d-32d3-4f3b-ac40-4d11ce3c11ac",
                    "name": "Darkorange",
                    "description": "Harum ut rerum et.",
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:10+0000",
                    "updated_at": "2024-01-15T11:34:10+0000",
                    "pivot": {
                        "genre_id": "953ef2d5-6a50-449b-aa40-fdebdc40a60f",
                        "category_id": "3539e03d-32d3-4f3b-ac40-4d11ce3c11ac"
                    }
                },
                {
                    "id": "0fa18d1f-6c2b-454d-9b6a-6c26eb2b55c7",
                    "name": "PapayaWhip",
                    "description": null,
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:10+0000",
                    "updated_at": "2024-01-15T11:34:10+0000",
                    "pivot": {
                        "genre_id": "953ef2d5-6a50-449b-aa40-fdebdc40a60f",
                        "category_id": "0fa18d1f-6c2b-454d-9b6a-6c26eb2b55c7"
                    }
                },
                {
                    "id": "dbb1f7cf-2dc9-4865-a92c-8a63d45c093b",
                    "name": "Bisque",
                    "description": null,
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:10+0000",
                    "updated_at": "2024-01-15T11:34:10+0000",
                    "pivot": {
                        "genre_id": "953ef2d5-6a50-449b-aa40-fdebdc40a60f",
                        "category_id": "dbb1f7cf-2dc9-4865-a92c-8a63d45c093b"
                    }
                },
                {
                    "id": "96bc2023-28d1-4558-b24e-67c16f58a4fd",
                    "name": "LightGreen",
                    "description": "Voluptas labore dolor quisquam deserunt quidem.",
                    "is_active": true,
                    "deleted_at": null,
                    "created_at": "2024-01-15T11:34:10+0000",
                    "updated_at": "2024-01-15T11:34:10+0000",
                    "pivot": {
                        "genre_id": "953ef2d5-6a50-449b-aa40-fdebdc40a60f",
                        "category_id": "96bc2023-28d1-4558-b24e-67c16f58a4fd"
                    }
                }
            ]
        },
    ],
    "links": {
        "first": "http:\/\/localhost:8000\/api\/genres?page=2",
        "last": "http:\/\/localhost:8000\/api\/genres?page=10",
        "prev": "http:\/\/localhost:8000\/api\/genres?page=1",
        "next": "http:\/\/localhost:8000\/api\/genres?page=3"
    },
    "meta": {
        "current_page": 2,
        "from": 1,
        "last_page": 10,
        "path": "http:\/\/localhost:8000\/api\/genres",
        "per_page": 10,
        "to": 10,
        "total": 100
    }
}