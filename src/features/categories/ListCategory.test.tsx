import { http, delay, HttpResponse } from 'msw';
import { setupServer } from "msw/node";

import { renderWithProviders, screen } from "../../utils/test-utils";
import { CategoryList } from "./ListCategory";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "./mock";

export const handlers = [
    http.get(`${baseUrl}/categories`, async () => {
        await delay(150);
        return HttpResponse.json(categoryResponse);
        // return res(ctx.json(categoryResponse), ctx.delay(150));
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
});