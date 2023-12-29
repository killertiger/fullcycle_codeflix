import { rest } from "msw";
import { setupServer } from "msw/node";

import { CategoryEdit } from "./EditCategory";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";

const data = {
    id: "89aec03d-a472-43ca-9e0f-185caafd4e7e",
    name: "AliceBlue",
    description: "Corrupti dolorum adipisci repellat quidem optio repudiandae consequatur.",
    is_active: true,
    deleted_at: null,
    created_at: "2023-12-29T11:32:24+0000",
    updated_at: "2023-12-29T11:32:24+0000"
};

const handlers = [
    rest.get(`${baseUrl}/categories/`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.json({ data }));
    }),

    rest.put(`${baseUrl}/categories/89aec03d-a472-43ca-9e0f-185caafd4e7e`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(200));
    }),
];

const server = setupServer(...handlers);

describe("EditCategory", () => {
    beforeAll(() => server.listen());;
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CategoryEdit />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should handle submit", async () => {
        renderWithProviders(<CategoryEdit />);

        const name = screen.getByTestId("name");
        const description = screen.getByTestId("description");
        const isActive = screen.getByTestId("is_active");
        const submit = screen.getByText("Save");

        await waitFor(() => {
            expect(name).toHaveValue("AliceBlue");
        });

        fireEvent.change(name, { target: { value: "AliceBlue2" } });
        fireEvent.change(description, { target: { value: "Any description" } });
        fireEvent.click(isActive);

        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Category updated successfully");
            expect(text).toBeInTheDocument();
        });
    });


    it("should handle error submit", async () => {
        server.use(
            rest.put(`${baseUrl}/categories/89aec03d-a472-43ca-9e0f-185caafd4e7e`, (_, res, ctx) => {
                return res(ctx.delay(150), ctx.status(400));
            })
        );

        renderWithProviders(<CategoryEdit />);

        const name = screen.getByTestId("name");
        const description = screen.getByTestId("description");
        const isActive = screen.getByTestId("is_active");
        const submit = screen.getByText("Save");

        await waitFor(() => {
            expect(name).toHaveValue("AliceBlue");
        });

        fireEvent.change(name, { target: { value: "AliceBlue2" } });
        fireEvent.change(description, { target: { value: "Any description" } });
        fireEvent.click(isActive);

        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Category not updated");
            expect(text).toBeInTheDocument();
        });
    });
});

