import React from 'react';
import Header from './components/Header';
import FilesList from './components/FilesList';
import SearchView from './components/SearchView';
import InfoMessage from './components/InfoMessage';
import {ESCAPE_CODE, HOTKEY_CODE, UP_ARROW_CODE, DOWN_ARROW_CODE} from './utils/keyCodes';
import files from './utils/api';

class App extends React.Component {
  state = {
    isSearchView: false,
    filesList: files,
    counter: 0 // keep track of the arrow for navigation among files
  };

  componentDidMount(){
    window.addEventListener('keydown', this.handleEvent);
  }

  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleEvent);
  }

  handleEvent = (event) => {
    const {filesList, counter} = this.state;
    const keyCode = event.keyCode || event.which; //event.which?
    switch(keyCode){
      case HOTKEY_CODE:
        this.setState( (prevState)=>({
          isSearchView: true,
          filesList: prevState.filesList.filter((file) => file.type === "file")
        }));
        break;
      case ESCAPE_CODE:
        this.setState({isSearchView: false, filesList: files});
        break;
      case DOWN_ARROW_CODE:
        if(counter<filesList.length - 1){
          this.setState({counter: counter + 1});
        }
        break;
      case UP_ARROW_CODE:
        if(counter>0){
          this.setState({counter: counter - 1});
        }
        break;
      default:
        break;
    }
  }

  handleSearch = (searchTerm) => {
    let list;
    console.log(`searchTerm: ${searchTerm}`);
    if(searchTerm){
      list = files.filter( (file) => {
        return file.type === 'file' && file.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      });
    } else{
      list = files;
    }
    this.setState({
      isSearchView: true,
      filesList: list
    });
  }

  render() {
    const { isSearchView, filesList, counter } = this.state;

    return (
      <div className="container">
        <Header />
        {isSearchView ? 
          (
            <div class="search-view">
              <SearchView onSearch={this.handleSearch}/>
              <InfoMessage />
              <FilesList files={filesList} 
              isSearchView = {isSearchView}
              counter = {counter}/>
              {/* {counter} */}
            </div>
          ) : (
            <FilesList files={filesList} />
          )
        }
        
      </div>
    );
  }
}

export default App;

