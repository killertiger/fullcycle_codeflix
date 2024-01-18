import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../api/apiSlice";
import { genreResponse, genreResponsePage2 } from "./mock";
import { categoryResponse } from "../categories/mock";
import { renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { GenreList } from "./GenreList";

const handlers = [
    rest.get(`${baseUrl}/genres`, (req, res, ctx) => {
        if (req.url.searchParams.get("page") === "2") {
            return res(ctx.json(genreResponsePage2), ctx.delay(150));
        }

        return res(ctx.delay(150), ctx.status(200), ctx.json(genreResponse));
    }),

    rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.json(categoryResponse), ctx.delay(150));
    }),

    rest.delete(`${baseUrl}/categories/56dba005-b027-403f-a7d0-1de33e66bba5`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(200));
    }),
]

const server = setupServer(...handlers);

describe("GenreList", () => {
    afterAll(() => server.close());
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<GenreList />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render loading state", () => {
        renderWithProviders(<GenreList/>);
        const loading = screen.getByRole("progressbar");
        expect(loading).toBeInTheDocument();
    });

    it("should render error state" , async () => {
        server.use(
            rest.get(`${baseUrl}/genres`, (_, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        renderWithProviders(<GenreList/>);
        await waitFor(() => {
            const error = screen.getByText("Error fetching genres!");
            expect(error).toBeInTheDocument();
        });
    });
});