import { CategoryCreate } from "./CreateCategory";
import { renderWithProviders } from "../../utils/test-utils";

describe("CreateCategory", () => {
    it("should render correctly", () => {
        const {asFragment} = renderWithProviders(<CategoryCreate />);
        expect(asFragment()).toMatchSnapshot();
    });
});