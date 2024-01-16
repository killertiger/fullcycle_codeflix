import { renderWithProviders } from "../../../utils/test-utils";
import { genreResponse } from "../mock";
import { GenreForm } from "./GenreForm";

const Props = {
    genre: genreResponse.data[0],
    categories: [],
    isLoading: false,
    isDisabled: false,
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
}

describe("GenreForm", () => {
    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<GenreForm {...Props}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render correctly with loading", () => {
        const { asFragment } = renderWithProviders(<GenreForm {...Props} isLoading={true}/>);
        expect(asFragment()).toMatchSnapshot();
    });

});