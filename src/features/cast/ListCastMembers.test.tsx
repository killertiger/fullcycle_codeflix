import {rest} from "msw";
import {setupServer} from "msw/node";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { ListCastMembers } from "./ListCastMembers";
import { baseUrl } from "../api/apiSlice";
import { castMemberResponse, castMemberResponse2 } from "./mocks";

const handlers = [
    rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
        if(req.url.searchParams.get("page") === "2") {
            return res(ctx.delay(150), ctx.json(castMemberResponse2));
        }

        return res(ctx.delay(150), ctx.json(castMemberResponse));
    }),
    rest.delete(`${baseUrl}/cast_members/fecfffa3-07b8-472e-9337-e70ce746ddb1`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(204));
    }),
];

const server = setupServer(...handlers);

describe("ListCastMembers", () => {
    afterAll(() => server.close());
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());

    it("should render correctly", () => {
        const {asFragment} = renderWithProviders(<ListCastMembers />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render loading state", () => {
        renderWithProviders(<ListCastMembers />);
        const loading = screen.getByRole("progressbar");
        expect(loading).toBeInTheDocument();
    });

    it("should render success state", async () => {
        renderWithProviders(<ListCastMembers />);
        await waitFor(() => {
            const name = screen.getByText("Jerde");
            expect(name).toBeInTheDocument();
        });
    });

    it("should render error state", async() => {
        server.use(
            rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        renderWithProviders(<ListCastMembers />);

        await waitFor(() => {
            const error = screen.getByText("Error!");
            expect(error).toBeInTheDocument();
        });
    });

    it("should handle On PageChange", async() => {
        renderWithProviders(<ListCastMembers />);

        await waitFor(() => {
            const name = screen.getByText("Jerde");
            expect(name).toBeInTheDocument();
        });

        const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
        fireEvent.click(nextButton);

        await waitFor(() => {
            const name = screen.getByText("Wiegand");
            expect(name).toBeInTheDocument();
        });
    });

    it("should handle filter change", async() => {
        renderWithProviders(<ListCastMembers/>);

        await waitFor(() => {
            const name = screen.getByText("Jerde");
            expect(name).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Search…");
        fireEvent.change(input, {target: {value: "Crooks"}});

        await waitFor(() => {
            const loading = screen.getByRole("progressbar");
            expect(loading).toBeInTheDocument();
        });
    });

    it("should handle delete cast member success", async() => {
        renderWithProviders(<ListCastMembers/>);

         await waitFor(() => {
            const name = screen.getByText("Jerde");
            expect(name).toBeInTheDocument();
         });

         const deleteButton = screen.getAllByTestId("delete-button")[0];
         fireEvent.click(deleteButton);

         await waitFor(() => {
            const message = screen.getByText("Cast member deleted successfully");
            expect(message).toBeInTheDocument();
         });
    });

    it("should handle delete cast member error", async() => {
        server.use(
            rest.delete(`${baseUrl}/cast_members/fecfffa3-07b8-472e-9337-e70ce746ddb1`, (_, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        renderWithProviders(<ListCastMembers/>);

        await waitFor(() => {
            const name = screen.getByText("Jerde");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByTestId("delete-button")[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const message = screen.getByText("Cast member not deleted");
            expect(message).toBeInTheDocument();
        });
    });
});