import React from 'react';
import { connect } from 'react-redux';


class CardList extends React.Component {
    
    render() {
        return(
            <div className="column">
                <div className="ui middle aligned list"></div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        cardCollection: state.inventory.cardCollection
    }
}

export default connect(mapStateToProps)(CardList);