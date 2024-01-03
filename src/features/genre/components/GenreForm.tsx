import { Category } from "../../../types/Categories";

type Props = {
    genre: any;
    categories?: Category[];
    isLoading?: boolean;
    isDisabled?: boolean;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GenreForm({
    genre,
    categories,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
}: Props) {
    return (
        <div>
            <h1>GenreForm</h1>
        </div>
    )
}