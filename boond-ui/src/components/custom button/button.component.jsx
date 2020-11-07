import React from 'react';
import './button.style.scss';

class CustomButton extends React.Component{
    render(){
        const {label, fontsize , width="auto"} = this.props;
        return(
            <div>
                <button className={"button"} style={{fontSize:`${fontsize}px`, width:`${width}px`}} {...this.props}>{label}</button>
            </div>
        );
    }
}
export default  CustomButton;