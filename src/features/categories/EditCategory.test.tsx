import { EditCategory } from "./EditCategory";
import { renderWithProviders } from "../../utils/test-utils";

describe("EditCategory", () => {
    it("should render correctly", () => {
        const {asFragment} = renderWithProviders(<EditCategory />);
        expect(asFragment()).toMatchSnapshot();
    });
});