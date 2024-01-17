import { mapGenreToForm } from "./utils";

describe("mapGenreToForm", () => {
    it("should map genre to form", () => {
        const genre = {
            id: "1",
            name: "Action",
            is_active: true,
            created_at: "2021-05-25T23:53:38.000000Z",
            updated_at: "2021-05-25T23:53:38.000000Z",
            deleted_at: null,
            categories: [
                {
                    id: "1",
                    name: "Action",
                    is_active: true,
                    description: "Action description",
                    created_at: "2021-05-25T23:53:38.000000Z",
                    updated_at: "2021-05-25T23:53:38.000000Z",
                    deleted_at: null,        
                },
            ],
        };

        const expected = {
            id: "1",
            name: "Action",
            categories_id: ["1"],
        };

        expect(mapGenreToForm(genre)).toEqual(expected);
    });
});