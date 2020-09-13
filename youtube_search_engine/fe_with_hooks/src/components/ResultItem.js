import React from 'react';

const ResultItem = ({key, youTubeItem}) => {
    console.log(key);
    return (
        <div key={key} className="searchResultDiv">
            <h3><a href={youTubeItem.url}>{youTubeItem.title}</a></h3>
            <span className="link"><a href={youTubeItem.url}>{youTubeItem.url}</a></span>
            <p className="description" dangerouslySetInnerHTML={{__html: youTubeItem.description}}></p>
        </div>
    )
}

export default ResultItem;