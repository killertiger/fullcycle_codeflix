import { CategoryEdit } from "./EditCategory";
import { renderWithProviders } from "../../utils/test-utils";

describe("EditCategory", () => {
    it("should render correctly", () => {
        const {asFragment} = renderWithProviders(<CategoryEdit />);
        expect(asFragment()).toMatchSnapshot();
    });
});