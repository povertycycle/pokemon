// // import { useDebounce } from "../../../../../hooks/useDebounce";

// import { useDebouncedInput } from "@/common/hooks/useDebounce";

// type HeadSearchProps = {
//     title: string,
//     id: string
// }

// const HeadSearch: React.FC<HeadSearchProps> = ({ title, id }) => {
//     // const { value, clearSearch, handleChange } = useDebouncedInput((value: string) => {
//     //     document.getElementById(id)?.childNodes?.forEach(n => {
//     //         if (n.textContent?.toLowerCase().includes(value.toLowerCase())) {
//     //             (n as HTMLDivElement).style.display = ""
//     //         } else {
//     //             (n as HTMLDivElement).style.display = "none"
//     //         }
//     //     });
//     // });

//     return (
//         <div className="w-full p-2 text-base-white sticky bg-base-white top-0">
//             {/* <input value={value} id={`${title}-search`} className="w-full bg-x-dark rounded-[12px] h-[24px] placeholder:text-base-white/75 px-4" placeholder={title} onChange={handleChange} />
//             {value && <div onClick={clearSearch} className="absolute top-[10px] right-[10px] cursor-pointer hover:text-base-white-dark h-[20px] w-[20px] flex items-center justify-center text-x-dark bg-base-white rounded-full border border-black"><i className="ri-close-line" /></div>} */}
//         </div>
//     )
// }

// export default HeadSearch;
