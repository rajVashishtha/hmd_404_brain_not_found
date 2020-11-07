import React from 'react';
import './glow.style.css';
class Glow extends React.Component{
    render() {
        const {fontsize, text, link} = this.props;
        return(
            <p><a href={link} style={{
                fontSize :`${fontsize}px`
            }}>{text}</a></p>
        )
    }
}
export default Glow;