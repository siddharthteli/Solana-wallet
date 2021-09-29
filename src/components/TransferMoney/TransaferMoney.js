import React from 'react';
import connectToWallet from '../../helpers/wallet';
import './TransferMoney.css';
import sendMoney from '../../helpers/wallet'
export default class Display extends React.Component {
    constructor() {
        super();
        this.state={address:'',amount:Number};
    }

    onClick = async() => {
        let transactionResult=sendMoney(this.state.address,this.state.amount);

    }

   onAddressChange= (e) => {
     this.setState({address:e.target.value});
       

   }
    
    render() {
        return(
            <div class="wrapper">
                <div class="vertical-wrapper">
                 <label>Receiver address:</label>
                 <input type="text" value={this.state.address} onClick={this.click} onChange={this.onAddressChange}/>
                </div>
                <div class="vertical-wrapper">
                <label>Amount:</label>
                 <input type="text" value={this.state.amount}onClick={this.click}/>
                    
                </div>
                <input type="submit" value="Send-Money" class="submit-button"/>
                
            </div>
        )

    }

   async componentDidMount() {
     await  connectToWallet();
          
    }
}