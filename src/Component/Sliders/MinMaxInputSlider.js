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
                        {[0,1].map((idx) => (
                          <Input
                            key={idx}
                            disableUnderline={true}
                            style={this.styles.inputBox}
                            value={this.props.values[idx]}
                            onChange={this.props.handleInput[idx]}
                            onBlur={this.props.handleBlur[idx]}
                          />))}
                    </div>
                    
                </div>
        );
    }
}