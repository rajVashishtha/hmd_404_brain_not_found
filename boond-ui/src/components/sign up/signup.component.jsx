import React from 'react';
import './signup.style.scss';
import InputTextField from "../textfield/input-textfield.component";
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import {withStyles} from '@material-ui/styles';
import Grid from "@material-ui/core/Grid";
import {DialerSipOutlined} from '@material-ui/icons'
import SwitchLabels from "../switch/switch.component";
import CustomButton from "../custom button/button.component";
import axios from 'axios';

const myStyle = ()=>({
    forIcon:{
        color:"#467DE3",
        fontSize:"45px",
        marginBottom:"5px",
        fontWeight:"10",
    }
});

class SignUp extends React.Component{

    state={
        states:["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"],
        cities:[],
        email:"",
        name:"",
        password:"",
        confirmPassword:"",
        state:"",
        city:"",
        pincode:"",
        location:{},
        errorPassword:false,
        errorCPassword:false,
        shortPassword:false,
        checked:false
    };
    changeState= (event)=>{
        const {value} = event.target;
        console.log(value);
        axios.get(`https://www.universal-tutorial.com/api/cities/${value}`,{
            headers:{
                "Authorization": "Bearer iIem04sERuw-eUVMyZQ4L4J8qMLBsgcBjslHgWvB2688SxJUe87xHAq-UlPQriwdP6I"
            }
        }).then(res=>{
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        });

    };
    handleChange = event=>{
        const {name,value} = event.target;
        this.setState({
            [name]:value
        })
    };
    handleChecked = ()=>{
        if(!this.state.checked){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((loc)=>{
                    this.setState({
                        location:loc
                    })
                });
            }
            this.setState({
                checked:true
            });
        }
        else{
            this.setState({
                checked:false,
                location:{}
            })
        }
    };
    handleRegister = (event)=>{
        event.preventDefault();
        if(this.state.password.length < 8){
            console.log("short")
            this.setState({
                shortPassword:true,
                errorPassword:true,
                errorCPassword:false,
            });
            return;
        }
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                shortPassword:false,
                errorPassword:true,
                errorCPassword:true,
            });
            return;
        }
        this.setState({
            shortPassword:false,
            errorPassword:false,
            errorCPassword:false,
        });
        console.log("working fine")
    };
    render() {
        const {classes, root, display} = this.props;
        return (
            <div style={root}>
                <form noValidate={false} onSubmit={this.handleRegister}>
                    <InputTextField required type={"email"} label={"Email"} variant={"outlined"}  width={350}
                                    value={this.state.email} name={"email"} onChange={this.handleChange}
                                    icon={<MailOutlinedIcon fontSize={"large"} className={classes.forIcon} />}/>
                    <InputTextField required type={"text"} label={display==="user"?"Name":"Blood Bank"} variant={"outlined"} width={350}
                                    value={this.state.name} name={"name"} onChange={this.handleChange}
                    icon={<HomeOutlinedIcon fontSize={"large"} className={classes.forIcon} />}/>
                    <InputTextField required type={"password"}
                      label={this.state.errorPassword?`${this.state.shortPassword?`Short Password`:`Password Mismatch`}`:`Password`}
                                    width={350} error={this.state.errorPassword} variant={"outlined"}
                                    value={this.state.password} name={"password"} onChange={this.handleChange}
                    icon={<VpnKeyOutlinedIcon fontSize={"large"} className={classes.forIcon} />}/>
                    <InputTextField required type={"password"} label={"Confirm Password"} variant={"outlined"}
                                    width={350} error={this.state.errorCPassword}
                     value={this.state.confirmPassword} name={"confirmPassword"} onChange={this.handleChange}
                    icon={<VpnKeyOutlinedIcon fontSize={"large"} className={classes.forIcon} />}/>
                    {/*<InputTextField type={"text"} label={"Name"} variant={"outlined"}/>*/}

                    <Grid container spacing={3} alignItems="flex-start" direction={"column"}>
                        <Grid item={true}>
                            <Grid container={true} spacing={0} alignItems={"center"}>
                                <Grid item>
                                    <label>State</label>
                                </Grid>
                                <Grid item>
                                    <select required className={"select-tag"} onChange={this.changeState}>
                                        <option value={""} selected={true} disabled={true}>None</option>
                                        {
                                         this.state.states.map(item=>(<option value={`${item}`}>{item}</option>))
                                        }
                                        {/*<option value="Option 1">Option 1</option>*/}
                                        {/*<option value="Option 2">Option 2</option>*/}
                                        {/*<option value="Option 3">Option 3</option>*/}
                                        {/*<option value="Option 4">Option 4</option>*/}
                                        {/*<option value="Option 5">Option 5</option>*/}
                                    </select>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item={true}>
                            <Grid container={true} spacing={1} alignItems={"center"}>
                                <Grid item>
                                    <label>City</label>
                                </Grid>
                                <Grid item>
                                    <select required className={"select-tag"} onChange={this.changeCity}>
                                        <option value={"No"} selected={true} disabled={true}>None</option>
                                        {
                                         this.state.cities.map(item=>(<option value={`${item}`}>{item}</option>))
                                        }
                                    </select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <InputTextField required type={"number"} label={"Pincode"} variant={"outlined"} width={350}
                                    value={this.state.pincode} name={"pincode"} onChange={this.handleChange}
                        icon={<DialerSipOutlined fontSize={"large"} className={classes.forIcon} />} />
                    <Grid container={true} spacing={3} alignContent={"center"} justify={"center"} direction={"column"}>
                        <Grid item={true}>
                            <SwitchLabels name={"location"} checked={this.state.checked} label={"Location"}
                                          marginLeft={0} onChange={this.handleChecked}/>
                        </Grid>
                        <Grid item={true}>
                            <CustomButton type={"submit"} label={"Register"} fontsize={30}  />
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default withStyles(myStyle)(SignUp);