import React from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

export default class MinMaxInputSlider extends React.Component {
    constructor(props) {
        super(props)
        this.styles={
            inputBox: {
                width:70,
                backgroundColor:'#ffffff',
            },
            slider: {
                width:'50%', 
                color:'#5eed97',
            },
        }

        console.log(this.props)
    }

    render() {
        return(
            <div style={{display:'flex', justifyContent:'left'}}>
                    <div style={{display:'flex',flexDirection:'row', flexGrow:1}}>
                        <label style={{width:'2.5rem'}}> {this.props.leftLabel} </label>
                        <Slider 
                            style={this.styles.slider}
                            onChange={this.props.handleSlider}
                            value={this.props.values}
                            // aria-labelledby={this.props.name}
                        />
                        <label style={{paddingLeft:'15px'}}> {this.props.rightLabel} </label>
                    </div>

                    <div style={{display:'flex', justifyContent:'left', flexGrow:0.8}}>
                        <Input
                            style={this.styles.inputBox}
                            value={this.props.values[0]}
                            onChange={this.props.handleInput0}
                            onBlur={this.props.handleBlur}
                            
                        />
                        <Input
                            style={this.styles.inputBox}
                            value={this.props.values[1]}
                            onChange={this.props.handleInput1}
                            onBlur={this.props.handleBlur}
                        />
                    </div>
                    
                </div>
        );
    }
}