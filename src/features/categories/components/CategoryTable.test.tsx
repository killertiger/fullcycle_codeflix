import { render } from "@testing-library/react";
import { CategoryTable } from "./CategoryTable";
import { BrowserRouter } from "react-router-dom";

const Props = {
    data: undefined,
    perPage: 10,
    page: 1,
    isFetching: false,
    rowsPerPage: [10, 25, 50],
    handleOnPageChange: () => { },
    handleFilterChange: () => { },
    handleDelete: () => { },
};

const mockData = {
    data: [
        {
            id: "123",
            name: "category",
            description: "test",
            is_active: true,
            created_at: "2021-09-13T04:17:44.000000Z",
            updated_at: "2021-09-13T04:17:44.000000Z",
            deleted_at: null,
        }
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
        next: "",
        prev: "",
    }
}

describe("CategoryTable", () => {
    it("should render correctly", () => {
        const { asFragment } = render(<CategoryTable {...Props} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render CategoryTable with loading", () => {
        const { asFragment } = render(<CategoryTable {...Props} isFetching={true} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render CategoryTable with data", () => {
        const { asFragment } = render(<CategoryTable {...Props} data={mockData} />,
            { wrapper: BrowserRouter });

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render CategoryTable with Inactive value", () => {

        const inputData = {
            ...mockData,
            data: [{ ...mockData.data[0], is_active: false }]
        }

        const { asFragment } = render(<CategoryTable {...Props} data={inputData} />,
            { wrapper: BrowserRouter }
        );

        expect(asFragment()).toMatchSnapshot();

    });
})