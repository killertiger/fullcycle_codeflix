import { rest } from "msw";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../categories/mock";
import { setupServer } from "msw/lib/node";
import {GenreCreate} from "./GenreCreate";

const handlers = [
    rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.json(categoryResponse));
    }),
    rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
        return res(ctx.status(201));
    })
];

const server = setupServer(...handlers);

describe("GenreCreate", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<GenreCreate />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render submit", async() => {
        renderWithProviders(<GenreCreate />);
        const name = screen.getByTestId("name");
        const save = screen.getByText("Save");

        await waitFor(() => {
            expect(save).toBeInTheDocument();
        });

        fireEvent.change(name, { target: { value: "Genre 1" } });
        fireEvent.click(save);

        await waitFor(() => {
            const text = screen.getByText("Genre created successfully");
            expect(text).toBeInTheDocument();
        });
    });

    it("should handle error", async() => {
        server.use(
            rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
                return res(ctx.status(500));
            })
        );
        renderWithProviders(<GenreCreate/>);

        const name = screen.getByTestId("name");
        const save = screen.getByText("Save");

        await waitFor(() => {
            expect(save).toBeInTheDocument();
        });

        fireEvent.change(name, { target: { value: "Genre 1" } });
        fireEvent.click(save);

        await waitFor(() => {
            const text = screen.getByText("Error creating genre");
            expect(text).toBeInTheDocument();
        });
    });
})