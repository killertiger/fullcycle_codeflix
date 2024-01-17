import { rest } from "msw";
import { baseUrl } from "../api/apiSlice";
import { genreResponse } from "./mock";
import { categoryResponse } from "../categories/mock";
import { setupServer } from "msw/node";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { GenreEdit } from "./GenreEdit";

const handlers = [
    rest.get(`${baseUrl}/genres/`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ data: genreResponse.data[0] }));
    }),
    rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.json(categoryResponse));
    }),
    rest.put(`${baseUrl}/genres/56dba005-b027-403f-a7d0-1de33e66bba5`, (_, res, ctx) => {
        return res(ctx.status(200));
    }),
];

const server = setupServer(...handlers);

describe("GenreEdit", () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<GenreEdit />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should handle submit", async () => {
        renderWithProviders(<GenreEdit />);
        const name = screen.getByTestId("name");
        const submit = screen.getByText("Save");

        await waitFor(() => {
            expect(name).toHaveValue("Italy");
        });

        await waitFor(() => {
            expect(submit).toBeInTheDocument();
        });

        fireEvent.change(name, { target: { value: "Test 2" } });
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Genre updated successfully");
            expect(text).toBeInTheDocument();
        });
    });

    it("should handle error submit", async () => {
        server.use(
            rest.put(`${baseUrl}/genres/56dba005-b027-403f-a7d0-1de33e66bba5`, (_, res, ctx) => {
                return res(ctx.status(400));
            })
        );

        renderWithProviders(<GenreEdit />);
        
        const name = screen.getByTestId("name");
        const submit = screen.getByText("Save");

        await waitFor(() => {
            expect(name).toHaveValue("Italy");
        });

        await waitFor(() => {
            expect(submit).toBeInTheDocument();
        });

        fireEvent.change(name, { target: { value: "Test 2" } });
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Genre not updated");
            expect(text).toBeInTheDocument();
        });
    });
});