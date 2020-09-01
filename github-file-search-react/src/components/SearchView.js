import React, {useState, useEffect, useRef} from 'react';

const SearchView = ({onSearch}) => {
    const [input, setInput] = useState('');//what's useState? React Hooks
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []); // what's useEffect?

    const onInputChange = (event) => {
        const input = event.target.value;
        setInput(input); //? what's setInput? 
        onSearch(input); 
    }

    return (
        <div className="search-box">
            My Repository <span className="slash">/</span>
            <input 
             type = "text"
             name = "input"
             value = {input}
             ref = {inputRef}
             autoComplete="off"
             onChange = {onInputChange}
            />
        </div>
    );
};

export default SearchView;