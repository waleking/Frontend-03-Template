import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchReturnValues: [],
      searchTerms: ''
    };
    this.changeSearchTerms = this.changeSearchTerms.bind(this);
    this.useSearchEngine = this.useSearchEngine.bind(this);
  }

  changeSearchTerms = (event) => {
    this.setState({
      searchTerms: event.target.value
    });
  }

  useSearchEngine = (event) => {
    event.preventDefault();
    this.setState({
      searchReturnValues: []
    })

    let url = "http://127.0.0.1:4201/query/";
    let params = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"query": this.state.searchTerms}),
    };
    console.log(params);

    const pointerToThis = this; // TODO: I don't know why it needs this?

    fetch(url, params)
      .then(function(response){return response.json();})
      .then(function(response) {
        for(let key in response.docs){
          pointerToThis.state.searchReturnValues.push({
            queryResultPageFullURL: response.docs[key].url,
            queryResultPageTitle: response.docs[key].title,
            queryResultPageSnippet: response.docs[key].description,
          });
        }
        pointerToThis.forceUpdate();
      })
      .catch(function(error){console.log(error);});
  }


  render(){
    let searchResults = [];
    this.state.searchReturnValues.forEach(result => {
      searchResults.push(result);
    });
    console.log(searchResults);
    return (
      <div className="App">
        <h1>YouTube Description Search Engine</h1>
        <form>
          <input type="text" value={this.state.searchTerms} onChange={this.changeSearchTerms} placeholder="Search YouTube Descriptions"></input>
          <button type="submit" onClick={this.useSearchEngine}>Search</button>
        </form>
        {searchResults.map((youtubeItem,index) => {
          return (
            <div key={index} className="searchResultDiv">
              <h3><a href={youtubeItem.queryResultPageFullURL}>{youtubeItem.queryResultPageTitle}</a></h3>
              <span className="link"><a href={youtubeItem.queryResultPageFullURL}>{youtubeItem.queryResultPageFullURL}</a></span>
              {/* TODO: what's dangerouslySetInnerHTML? */}
              <p className="description" dangerouslySetInnerHTML={{__html: youtubeItem.queryResultPageSnippet}}></p>
              {/* <p className="description">{wikiItem.queryResultPageSnippet}</p> */}
            </div>
            );
        })}
      </div>
    );
  }
}

export default App;