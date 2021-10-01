import React from 'react';
import connectToWallet from '../../helpers/wallet';
import './TransferMoney.css';
import sendMoney from '../../helpers/wallet'
import Transaction from '../Transaction/Transaction.js'
export default class Display extends React.Component {
    constructor() {
        super();
        this.state={address:'',amount:Number,transaction:Object};
        
    }

    onClick = async() => {
        let transactionResult= await sendMoney(this.state.address,this.state.amount);
        console.log("Result" + JSON.stringify(transactionResult));
        this.setState({transaction:transactionResult});
    }

   onAddressChange= (e) => {
     this.setState({address:e.target.value});
       

   }
   onAmountChange =(e) =>{
       this.setState({amount:e.target.value});

   }
    
    render() {
        return(
            <div>
            <div class="wrapper">
                <div class="vertical-wrapper">
                 <label>Receiver address:</label>
                 <input type="text" value={this.state.address}  onChange={this.onAddressChange}/>
                </div>
                <div class="vertical-wrapper">
                <label>Amount:</label>
                 <input type="text" value={this.state.amount} onChange={this.onAmountChange}/>
                    
                </div>
                <button class="submit-button" onClick={this.onClick}>Send-Money </button> 
                
            </div>
            <Transaction prop={this.state.transaction}/>
            </div>
        )

    }

   async componentDidMount() {
     
          
    }
}