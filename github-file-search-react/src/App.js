import React from 'react';
import Header from './components/Header';
import FilesList from './components/FilesList';
import files from './utils/api';

class App extends React.Component {
  state = {
    filesList: files
  };

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

