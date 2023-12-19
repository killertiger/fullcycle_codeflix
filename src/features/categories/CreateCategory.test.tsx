import { CreateCategory } from "./CreateCategory";
import { renderWithProviders } from "../../utils/test-utils";

describe("CreateCategory", () => {
    it("should render correctly", () => {
        const {asFragment} = renderWithProviders(<CreateCategory />);
        expect(asFragment()).toMatchSnapshot();
    });
});