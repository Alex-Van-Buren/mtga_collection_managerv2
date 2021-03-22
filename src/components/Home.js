import React from 'react';
import { Link } from 'react-router-dom';

import SetCard from './SetCard';

class Home extends React.Component {
    renderSets() {
        const sets = ['eld', 'thb', 'iko', 'm21', 'znr', 'khm'];
        // const sets = ['znr'];
        return (
            sets.map( (setId) =>{  
                const path = `/set/${setId}`;              
                return (    
                    <div className="ui link card" key={setId}>
                        <Link to={path} >
                            <SetCard setId={setId} key={setId}/>
                        </Link> 
                    </div>                
                )
            })
        )
    }
    render(){
        return(
            <div className="ui container">
                <div className="ui huge center aligned header ">Standard Collection</div>                
                <div className="ui four stackable cards">
                    {this.renderSets()}
                </div>
            </div>
        )
    }
}

export default Home;