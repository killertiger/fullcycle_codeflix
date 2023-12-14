import { render } from "@testing-library/react";
import { CastMembersTable } from "./CastMembersTable";
import { GridFilterModel } from "@mui/x-data-grid";
import { BrowserRouter } from "react-router-dom";

const Props = {
    data: {
        data: [
            {
                id: "123",
                type: 1,
                name: "name",
                deleted_at: null,
                created_at: "2021-07-18T23:49:00.000000Z",
                updated_at: "2021-07-18T23:49:00.000000Z",
            },
            {
                id: "456",
                type: 2,
                name: "name",
                deleted_at: null,
                created_at: "2021-07-18T23:49:00.000000Z",
                updated_at: "2021-07-18T23:49:00.000000Z",
            },
        ],
        meta: {
            currentPage: 1,
            from: 1,
            lastPage: 1,
            path: "http://localhost:8000/api/cast-members",
            perPage: 1,
            to: 1,
            total: 1,
        }
    },
    perPage: 10,
    page: 1,
    isFetching: false,
    rowsPerPage: [10, 15, 25],

    handleOnPageChange: (page: number) => { },
    handleFilterChange: (filterModel: GridFilterModel) => { },
    handleOnPageSizeChange: (pageSize: number) => { },
    handleDelete: (id: string) => { },
}


describe("CastMembersTable", () => {
    it("should render CastMemberTable correctly", () => {
        const { asFragment } = render(<CastMembersTable {...Props} />,
            { wrapper: BrowserRouter }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders CastMembersTable with loading", () => {
        const { asFragment } = render(<CastMembersTable {...Props} isFetching />,
            { wrapper: BrowserRouter }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("render CastMembersTable with empty data", () => {
        const { asFragment } = render(<CastMembersTable {...Props} data={{data:[], meta: {}} as any} />,
            { wrapper: BrowserRouter }
        );
    
        expect(asFragment()).toMatchSnapshot();
    });
});