import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { ListCastMembers } from "./ListCastMembers";
import { baseUrl } from "../api/apiSlice";
import { castMemberResponse } from "./mocks";

const handlers = [
    rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.json(castMemberResponse));
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
});