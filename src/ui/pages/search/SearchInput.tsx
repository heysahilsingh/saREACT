import React, { useRef, useState, ChangeEvent, useCallback } from "react";
import { IconChevronLeft, IconSearch, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface SearchInputProps {
    searchFunction: (inputValue: string) => void;
    inputValue: string;
    showBackButton: boolean
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
    const refSearchInput = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState(props.inputValue);
    const [clearSearch, setClearSearch] = useState(false);

    const navigate = useNavigate();

    // Define a debounce function outside the component
    const debounce = (func: (inputValue: string) => void, delay: number) => {
        let timeout: number;
        return function (this: void, ...args: [string]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const debouncedSearch = useCallback(
        debounce((inputValue: string) => {
            if (props.searchFunction) {
                props.searchFunction(inputValue);
            }
        }, 300),
        [props.searchFunction]
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (refSearchInput.current) {
            const inputValue = event.target.value;
            setInputValue(inputValue);
            debouncedSearch(inputValue);
            setClearSearch(!!inputValue);
        }
    };

    return (
        <div className="flex items-center gap-2 py-3 px-4 border border-zinc-300 dark:border-zinc-700 rounded-xl w-full">
            {props.showBackButton && <IconChevronLeft onClick={() => navigate(-1)} className="-ml-[5px] dark:text-zinc-300" />}
            <input
                ref={refSearchInput}
                value={inputValue}
                onChange={handleInputChange}
                className="bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300"
                type="text"
                placeholder="Search for restaurants and food"
            />
            {!clearSearch && <IconSearch size={22} stroke={1} />}
            {clearSearch && (
                <IconX
                    className="dark:text-zinc-300"
                    size={24}
                    stroke={1.5}
                    onClick={() => {
                        if (refSearchInput.current) {
                            setInputValue("")
                            refSearchInput.current.focus();
                            setClearSearch(false);
                            debouncedSearch("");
                        }
                    }}
                />
            )}
        </div>
    );
};

export default SearchInput;
