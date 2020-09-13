import React, {useState} from 'react';

const SearchBar = ({callSearchEngine}) => { // Don't forget to do destructuring
    const [searchTerm, setSearchTerm] = useState("");
    const onInputChange = (event) => {
        const input = event.target.value;
        setSearchTerm(input); // use the useState hook to 
    }
    return (
        <form>
            <input type="text" onChange={onInputChange} placeholder="Search YouTube Descriptions"></input>
            <button onClick={
                (event)=>{
                    event.preventDefault(); // prevent the default reloading
                    callSearchEngine(searchTerm); // The useState hooks has updated the searchTerm
                }
            }>Search</button>
        </form>
    );
};

export default SearchBar;