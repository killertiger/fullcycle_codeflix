// import { http, delay, HttpResponse } from 'msw';
import { setupServer } from "msw/node";
import { rest } from 'msw';

import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { CategoryList } from "./ListCategory";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse, categoryResponsePage2 } from "./mock";

export const handlers = [
    rest.get(`${baseUrl}/categories`, async (req, res, ctx) => {

        if (req.url.searchParams.get("page") === "2") {
            return res(ctx.json(categoryResponsePage2), ctx.delay(150));
        }

        return res(ctx.json(categoryResponse), ctx.delay(150));
    }),
    rest.delete(`${baseUrl}/categories/dd5378ef-1241-4b2e-b2d6-4b8dc8a2972d`, async (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(204));
    }),
];

const server = setupServer(...handlers);


describe("ListCategory", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CategoryList />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render loading state", () => {
        renderWithProviders(<CategoryList />);
        const loading = screen.getByRole("progressbar");
        expect(loading).toBeInTheDocument();
    });

    it("should render success state", async () => {
        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const name = screen.getByText("LightPink");
            expect(name).toBeInTheDocument();
        });
    });

    it("should render error state", async () => {
        server.use(
            rest.get(`${baseUrl}/categories`, async (_, res, ctx) => {
                return res(ctx.status(500))
            })
        );

        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const error = screen.getByText("Error fetching categories");
            expect(error).toBeInTheDocument();
        });
    });

    it("should handle On PageChange", async () => {
        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const name = screen.getByText("LightPink");
            expect(name).toBeInTheDocument();
        });

        const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
        fireEvent.click(nextButton);

        await waitFor(() => {
            const name = screen.getByText("LightSeaGreen");
            expect(name).toBeInTheDocument();
        });
    });

    it("should handle filter change", async () => {
        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const name = screen.getByText("LightPink");
            expect(name).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Search…");
        fireEvent.change(input, {
            target: {
                value: "Peru"
            }
        });

        await waitFor(() => {
            const loading = screen.getByRole("progressbar");
            expect(loading).toBeInTheDocument();
        });
    });

    it("should handle delete category success", async () => {
        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const name = screen.getByText("LightPink");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByTestId("delete-button")[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const name = screen.getByText("Category deleted successfully");
            expect(name).toBeInTheDocument();
        });
    });

    it("should handle delete category error", async() => {
        server.use(
            rest.delete(
                `${baseUrl}/categories/dd5378ef-1241-4b2e-b2d6-4b8dc8a2972d`,
                (_, res, ctx) => {
                    return res(ctx.delay(150), ctx.status(500));
                }
            )
        );

        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const name = screen.getByText("LightPink");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByTestId("delete-button")[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const name = screen.getByText("Category not deleted");
            expect(name).toBeInTheDocument();
        });
    });
});