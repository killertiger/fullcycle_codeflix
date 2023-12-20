import { http, delay, HttpResponse } from 'msw';
import { setupServer } from "msw/node";

import { renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { CategoryList } from "./ListCategory";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "./mock";

export const handlers = [
    http.get(`${baseUrl}/categories`, async () => {
        await delay(150);
        console.log(categoryResponse);
        return HttpResponse.json(categoryResponse);
    })
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

    // it("should render success state", async () => {
    //     renderWithProviders(<CategoryList />);

    //     await waitFor(() => {
    //         const name = screen.getByText("Light", {exact: false});
    //         expect(name).toBeInTheDocument();
    //     });
    // });

    it("should render error state", async() => {
        server.use(
            http.get(`${baseUrl}/categories`, async () => {
                return HttpResponse.error();
            })
        );

        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const error = screen.getByText("Error fetching categories");
            expect(error).toBeInTheDocument();
        });
    });
});