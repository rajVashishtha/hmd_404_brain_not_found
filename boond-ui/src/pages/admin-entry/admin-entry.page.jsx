import React from 'react';
import SignUp from "../../components/sign up/signup.component";
import SignIn from "../../components/sign in/signin.component";
import {Tabs, Tab} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import "./admin-entry.style.scss";

const StyledTabs = withStyles({
    indicator: {
      display: "flex",
      justifyContent: "center",
        background:"transparent",
      "& > span": {
        width: "100%",
        backgroundColor: "#467DE3"
      }
    },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles(theme =>({
    root: {
      textTransform: "none",
      color: "#467DE3",
      fontWeight: 'bold',
      fontSize: '1.8rem',
      marginRight: '5px',
      width:"1200px",
        fontFamily:"Iceland",
      "&$selected": {
        color: "#467DE3"
      },
      "&:focus": {
        color: "#467DE3"
      },
      "&.selected": {
        color: "#467DE3"
      },
      "&:selected": {
        color: "#467DE3"
      }
    },
    selected: {
        background: "rgba(70, 125, 227, 0.1)",
        backdropFilter: "blur(12px)"
    }
}))(props => <Tab {...props} />);

class AdminEntryPage extends React.Component{
    state={
        index:0
    };
    handleChangeTabIndex = (event, ind)=>{
        this.setState({index:ind});
    };
    handleSwipeIndexChange = (index)=>{
        this.setState({index:index});
    };
    render() {
        return (
            <div className={"admin-entry"}>
                <h2 align={"center"}>Admin Entry Page</h2>
                <StyledTabs value={this.state.index} onChange={this.handleChangeTabIndex} fullWidth centered>
                    <StyledTab label="Register" />
                    <StyledTab label="Login" />
                </StyledTabs>
                <SwipeableViews index={this.state.index} onChangeIndex={this.handleSwipeIndexChange} animateHeight={true}>
                <SignUp root={{ marginLeft:"auto",marginRight:"auto", width:"500px"}}/>
                <SignIn root={{marginLeft:"auto",marginRight:"auto", width:"500px"}}/>
                </SwipeableViews>
            </div>
        );
    }
}
export default AdminEntryPage;