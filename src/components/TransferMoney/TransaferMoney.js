import React from 'react';
import connectToWallet from '../../helpers/wallet';
import './TransferMoney.css';
export default class Display extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return(
            <div class="wrapper">
                <div class="vertical-wrapper">
                 <label>Receiver address:</label>
                 <input type="text" onClick={this.click}/>
                </div>
                <div class="vertical-wrapper">
                <label>Receiver address:</label>
                 <input type="text" onClick={this.click}/>
                    
                </div>
                <input type="submit" class="submit-button"/>
                
            </div>
        )

    }

   async componentDidMount() {
     await  connectToWallet();
          
    }
}