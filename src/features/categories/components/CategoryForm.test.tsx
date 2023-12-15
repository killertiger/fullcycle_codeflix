import { render } from "@testing-library/react";
import { CategoryForm } from "./CategoryForm";
import { BrowserRouter } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/types/utils";


const Props = {
    category: {
        id: "123",
        name: "category",
        description: "test",
        is_active: true,
        created_at: "2021-09-13T04:17:44.000000Z",
        updated_at: "2021-09-13T04:17:44.000000Z",
        deleted_at: null,
    },
    isDisabled: false,
    isLoading: false,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => { },
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => { },
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => { },
};

describe("CategoryForm", () => {
    it("should render correctly", () => {
        const { asFragment } = render(<CategoryForm {...Props} />,
            { wrapper: BrowserRouter }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render with loading state", () => {
        const { asFragment } = render(<CategoryForm {...Props} isLoading={true} isDisabled={true} />,
            { wrapper: BrowserRouter }
        );

        expect(asFragment()).toMatchSnapshot();
    })
})