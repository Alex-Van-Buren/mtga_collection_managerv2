import React from 'react';
import { connect } from 'react-redux';
import { getCollection, processSetCollection } from '../actions';

// const sets = ['eld', 'thb', 'iko', 'm21', 'znr', 'khm'];
// const sets = ['znr'];

class GetFile extends React.Component {
    componentDidMount() {
        this.props.getCollection(null)

        this.props.processSetCollection(null);
    }

    handleFile = (event) =>{

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);

        // After the file loads and is read by the reader
        reader.onloadend = () =>{
            // Define the Regex 
            const cardRegex = /(?<=UnityCrossThreadLogger\]<== PlayerInventory\.GetPlayerCards.+payload.+)\{.*\}(?=})/g
            
            // Use regex to extract the inventory data from the log
            const match = cardRegex.exec(reader.result);

            // Parse the data into a JSON that can be more easily manipulated
            if( match && match[0]){
                const inventory = JSON.parse(match[0]);
    
                // Use getCollection action creator to put the basic inventory into Redux
                this.props.getCollection(inventory);
                
                // Put processed set information into redux                
                
                this.props.processSetCollection(inventory);
                           
                
            } else
                alert('No inventory Data found')
        }
    }

    render(){
        return (
            <input type="file" onChange={this.handleFile} accept=".log, .txt"/>
        )
    }
        
}

export default connect(null, { getCollection, processSetCollection })(GetFile)