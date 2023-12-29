import { CategoryCreate } from "./CreateCategory";
import { fireEvent, render, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";

export const handlers = [
    rest.post(`${baseUrl}/categories`, (req, res, ctx) => {
        return res(ctx.delay(150), ctx.status(201));
    }),
];

const server = setupServer(...handlers);

describe("CreateCategory", () => {
    afterAll(() => server.close());
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());

    it("should render correctly", () => {
        const {asFragment} = renderWithProviders(<CategoryCreate />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should handle submit", async () => {
        renderWithProviders(<CategoryCreate />);

        const name = screen.getByTestId("name");
        const description = screen.getByTestId("description");
        const isActive = screen.getByTestId("is_active");
        const submit = screen.getByText("Save");

        fireEvent.change(name, {target: {value: "test"}});
        fireEvent.change(description, {target: {value: "test description"}});
        fireEvent.click(isActive);

        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Category created successfully");
            expect(text).toBeInTheDocument();
        });
    });

    it("should handle submit error", async() => {
        server.use(
            rest.post(`${baseUrl}/categories`, (req, res, ctx) => {
                return res(ctx.delay(150), ctx.status(500));
            })
        );

        renderWithProviders(<CategoryCreate />);

        const name = screen.getByTestId("name");
        const description = screen.getByTestId("description");
        const isActive = screen.getByTestId("is_active");
        const submit = screen.getByText("Save");

        fireEvent.change(name, {target: {value: "test"}});
        fireEvent.change(description, {target: {value: "test description"}});
        fireEvent.click(isActive);

        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Category not created");
            expect(text).toBeInTheDocument();
        });
    });
});