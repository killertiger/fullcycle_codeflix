import { renderWithProviders } from "../../../utils/test-utils";
import { genreResponse } from "../mock";
import { GenreTable } from "./GenreTable";

const Props = {
    data: undefined,
    perPage: 10,
    page: 1,
    isFetching: false,
    rowsPerPage: [10, 20, 30],
    handleOnPageChange: jest.fn(),
    handleFilterChange: jest.fn(),
    handleDelete: jest.fn(),
};

describe("GenreTable", () => {
    it("should render GenreTable correctly", () => {
        const { asFragment } = renderWithProviders(<GenreTable {...Props} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should handle loading state", () => {
        const {asFragment} = renderWithProviders(
            <GenreTable {...Props} isFetching={true} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("should handle Genre Table with data", () => {
        const {asFragment} = renderWithProviders(
            <GenreTable {...Props} data={genreResponse} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render Genre Table with Delete button", () => {
        const {asFragment} = renderWithProviders(
            <GenreTable {...Props} data={genreResponse} handleDelete={() => {
                console.log("Delete button clicked");
            }}/>
        );

        expect(asFragment()).toMatchSnapshot();
    });
})