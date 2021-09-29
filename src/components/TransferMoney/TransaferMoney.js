import React from 'react';
import connectToWallet from '../../helpers/wallet';
import './TransferMoney.css';
export default class Display extends React.Component {
    constructor() {
        super();
        this.state={address:'',balance:''};
    }
    
    render() {
        return(
            <div class="wrapper">
                <div class="vertical-wrapper">
                 <label>Receiver address:</label>
                 <input type="text" value={this.state.address} onClick={this.click}/>
                </div>
                <div class="vertical-wrapper">
                <label>Amount:</label>
                 <input type="text" value={this.state.balance}onClick={this.click}/>
                    
                </div>
                <input type="submit" class="submit-button"/>
                
            </div>
        )

    }

   async componentDidMount() {
     await  connectToWallet();
          
    }
}