import { useDebounce } from "../../../hooks/useDebounce"

type SearchbarProps = {
    search: (value: string) => void
}

const Searchbar: React.FC<SearchbarProps> = ({ search }) => {
    const { value, handleChange } = useDebounce(search);
    return (
        <input id="item-search" value={value} onChange={handleChange} className="h-[48px] w-[512px] text-[1.25rem] focus:outline-0 bg-x-dark placeholder:text-white text-white px-4" placeholder="Search item..." />
    )
}

export default Searchbar;