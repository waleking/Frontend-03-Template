import React from 'react';
import Header from './components/Header';
import FilesList from './components/FilesList';
import SearchView from './components/SearchView';
import {ESCAPE_CODE, HOTKEY_CODE} from './utils/keyCodes';
import files from './utils/api';

class App extends React.Component {
  state = {
    isSearchView: false,
    filesList: files
  };

  componentDidMount(){
    window.addEventListener('keydown', this.handleEvent);
  }

  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleEvent);
  }

  handleEvent = (event) => {
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
      default:
        break;
    }
  }

  render() {
    const { counter, filesList } = this.state; //there's no counter right now!

    return (
      <div className="container">
        <Header />
        <FilesList files={filesList} />
      </div>
    );
  }
}

export default App;

