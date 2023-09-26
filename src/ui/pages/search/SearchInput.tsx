import React, { useRef, useState, ChangeEvent, useCallback } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";

interface SearchInputProps {
    searchFunction: (inputValue: string) => void;
    value?: string;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
    const refSearchInput = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState(props.value || "");
    const [clearSearch, setClearSearch] = useState(false);

    // Define a debounce function outside the component
    const debounce = (func: (inputValue: string) => void, delay: number) => {
        let timeout: number;
        return function (this: void, ...args: [string]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Create a debounced search function using useCallback
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
                            refSearchInput.current.value = "";
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
