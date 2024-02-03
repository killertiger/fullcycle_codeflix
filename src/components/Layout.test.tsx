import { render } from "@testing-library/react";
import { Layout } from "./Layout";
import { BrowserRouter } from "react-router-dom";

describe("Layout", () => {
    it("should render correctly", () => {
        const { asFragment } = render(
            <BrowserRouter>
                <Layout>
                    <div>Test</div>
                </Layout>
            </BrowserRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});