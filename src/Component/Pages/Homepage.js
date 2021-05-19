import React , {Component} from 'react'
import Navbar from '../Navbars/Navbar'
import Header from '../Header'
export default class Homepage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
            <Navbar/>
            <Header/>
            </div>
        );
    }
}