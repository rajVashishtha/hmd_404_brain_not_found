import React from 'react';
import InputTextField from "../textfield/input-textfield.component";
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import {withStyles} from '@material-ui/styles';
import Grid from "@material-ui/core/Grid";
import CustomButton from "../custom button/button.component";

const myStyle = ()=>({
    forIcon:{
        color:"#467DE3",
        fontSize:"45px",
        marginBottom:"5px",
        fontWeight:"10",
    }
});

class SignIn extends React.Component{

    state={
        email:"",
        password:"",
        errorEmail:false,
        errorPassword:false,
    };
    handleLogin = (event)=>{
        event.preventDefault();

    };
    handleChange = (event)=>{
      const {name, value} = event.target;
      this.setState({
          [name]:value
      })
    };
    render() {
        const {classes, root} = this.props;
        return (
            <div style={root}>
                <form noValidate={false} onSubmit={this.handleLogin}>
                    <InputTextField error={this.state.errorEmail} type={"email"} label={"Email"} variant={"outlined"} required  width={350}
                                    name={"email"} onChange={this.handleChange}
                        value={this.state.email} icon={<MailOutlinedIcon fontSize={"large"} className={classes.forIcon} />}/>
                    <InputTextField type={"password"} label={"Password"} variant={"outlined"} required  width={350}
                         error={this.state.errorPassword} name={"password"} value={this.state.password}
                                    onChange={this.handleChange}
                    icon={<VpnKeyOutlinedIcon fontSize={"large"} className={classes.forIcon} />}/>


                    <Grid container={true} spacing={3} alignContent={"center"} justify={"center"} direction={"column"}>
                        <Grid item={true}>
                            <CustomButton type={"submit"} label={"Login"} fontsize={30}  />
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default withStyles(myStyle)(SignIn);