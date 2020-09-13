import React from 'react';
import ResultItem from './ResultItem';

const ResultList = ({searchResultList, searchTriggered}) => {
    if(!searchTriggered){
        return null;
    }
    if(searchResultList.length===0){
        return <div>No Result</div>; 
    }
    if(searchResultList.length>0){
        return ( 
            <React.Fragment>
                {searchResultList.map((youTubeItem, index)=>(
                    <ResultItem key={index} youTubeItem={youTubeItem} />
                ))}
            </React.Fragment>
        );
    }
}

export default ResultList;