import React from 'react';
import react from 'React'
import {connectToWallet} from './helpers/wallet'

export default class Display extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return(
            <div>asd</div>
        )

    }

   async componentDidMount() {
     await  connectToWallet();
          
    }
}