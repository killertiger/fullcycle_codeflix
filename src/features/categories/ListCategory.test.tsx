import { http, delay, HttpResponse } from 'msw';
import { setupServer } from "msw/node";

import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { CategoryList } from "./ListCategory";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse, categoryResponse2 } from "./mock";

export const handlers = [
    http.get(`${baseUrl}/categories`, async () => {

        // const url = new URL(request.url);
        // const page = url.searchParams.get("per_page");
        // if(page === "2") {
        //     return HttpResponse.json(categoryResponse2);
        // }
        await delay(150);
        return HttpResponse.json(categoryResponse, {status: 200});
    })
];

const server = setupServer(...handlers);

server.events.on('response:mocked', async ({ request, requestId, response }) => {
    console.log(
      '%s %s received %s %s',
      request.method,
      request.url,
      response.status,
      response.statusText,
      await response.text()
    )
  })

describe("ListCategory", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    // it("should render correctly", () => {
    //     const { asFragment } = renderWithProviders(<CategoryList />);
    //     expect(asFragment()).toMatchSnapshot();
    // });

    // it("should render loading state", () => {
    //     renderWithProviders(<CategoryList />);
    //     const loading = screen.getByRole("progressbar");
    //     expect(loading).toBeInTheDocument();
    // });

    it("should render success state", async () => {
        renderWithProviders(<CategoryList />);
        
        await waitFor(() => {
            const name = screen.getByText("LightPink");
            expect(name).toBeInTheDocument();
        });
    });

    // it("should render error state", async() => {
    //     server.use(
    //         http.get(`${baseUrl}/categories`, async () => {
    //             return HttpResponse.error();
    //         })
    //     );

    //     renderWithProviders(<CategoryList />);

    //     await waitFor(() => {
    //         const error = screen.getByText("Error fetching categories");
    //         expect(error).toBeInTheDocument();
    //     });
    // });

    // it("should handle On PageChange", async() => {
    //     renderWithProviders(<CategoryList />);

    //     await waitFor(() => {
    //         const name = screen.getByText("Light", {exact: false});
    //         expect(name).toBeInTheDocument();
    //     });

    //     const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    //     fireEvent.click(nextButton);

    //     await waitFor(() => {
    //         const name = screen.getByText("Light", {exact: false});
    //         expect(name).toBeInTheDocument();
    //     });
    // });
});