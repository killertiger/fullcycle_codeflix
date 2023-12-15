import { render } from "@testing-library/react";
import { CastMembersTable } from "./CastMembersTable";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
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
        ],
        meta: {
            current_page: 1,
            from: 1,
            last_page: 1,
            path: "http://localhost:8000/api/cast-members",
            per_page: 1,
            to: 1,
            total: 1,
        },
        links: {
            first: "http://localhost:8000/api/cast-members?page=1",
            last: "http://localhost:8000/api/cast-members?page=1",
            next: null,
            prev: null,
        }
    },
    perPage: 10,
    page: 1,
    isFetching: false,
    rowsPerPage: [10, 15, 25],

    handleOnPageChange: (pageModel: GridPaginationModel) => { },
    handleFilterChange: (filterModel: GridFilterModel) => { },
    handleDelete: (id: string) => { }
}


describe("CastMembersTable", () => {
    it("should render CastMemberTable correctly", () => {
        const { asFragment } = render(<CastMembersTable {...Props} />,
            { wrapper: BrowserRouter }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render CastMembersTable with loading", () => {
        const { asFragment } = render(<CastMembersTable {...Props} isFetching />,
            { wrapper: BrowserRouter }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render CastMembersTable with empty data", () => {
        const { asFragment } = render(<CastMembersTable {...Props} data={{ data: [], meta: {} } as any} />,
            { wrapper: BrowserRouter }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render correct type", () => {
        const { asFragment } = render(

            <CastMembersTable
                {...Props}
                data={{
                    data: [{ ...Props.data.data[0], type: 2 }],
                    links: { ...Props.data.links },
                    meta: { ...Props.data.meta },
                }}
            />,
            { wrapper: BrowserRouter }
        );

        expect(asFragment()).toMatchSnapshot();
    });

});