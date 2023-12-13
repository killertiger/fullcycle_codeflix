import { render } from '@testing-library/react';
import { CastMemberForm } from './CastMemberForm';
import { BrowserRouter } from 'react-router-dom';


const Props = {
    castMember: {
        id: "1",
        name: "test",
        type: 1,
        deleted_at: null,
        created_at: "2023-12-13T04:17:44.000000Z",
        updated_at: "2023-12-13T04:17:44.000000Z"
    },
    isDisabled: false,
    isLoading: false,
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
}

describe("CastMemberForm", () => {
    it("should render castMember form correctly", () => {
        const { asFragment } = render(<CastMemberForm {...Props} />,
        {
            wrapper: BrowserRouter
        })

        expect(asFragment).toMatchSnapshot();
    })
})