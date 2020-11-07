import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from "react-redux";

class CustomRoute extends React.Component{
    render() {
        const {currentAdmin} = this.props;
        return (
            <Route path={!currentAdmin?"/admin":this.props.path} {...this.props}/>
        );
    }
}
const mapStateToProps = (state)=>({
    currentAdmin: state.admin.currentAdmin
});
export default connect(mapStateToProps)(CustomRoute);