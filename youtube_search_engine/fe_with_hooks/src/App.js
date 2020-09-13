import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ResultList from './components/ResultList';

const App = () => {
    const [searchResult, setSearchResult] = useState(null);
    const [searchTriggered, setSearchTriggered] = useState(false);
    const callSearchEngine = (searchTerm) => {
        let url = "http://127.0.0.1:4201/query/";
        let params = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"query": searchTerm}),
        };
        // console.log(params);

        fetch(url, params)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            setSearchResult(response["docs"]); 
            setSearchTriggered(true);
        })
        .catch(function(error){console.log(error);});
    }
    return (
        <div className="App">
            <h1>YouTube Description Search Engine</h1>
            <SearchBar callSearchEngine={callSearchEngine} />
            <ResultList searchResultList={searchResult} searchTriggered={searchTriggered} />
        </div>
    );
};

export default App;