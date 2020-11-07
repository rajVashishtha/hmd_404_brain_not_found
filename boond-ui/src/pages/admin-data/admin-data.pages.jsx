import React from 'react';
import './admin-data.style.scss';
import Header from "../../components/header/header.component";
import PieChart from "../../components/piechart/piechart.component";
import {Typography,Table ,TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Grid, Collapse} from '@material-ui/core';
import {EditOutlined} from '@material-ui/icons';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import InputTextField from "../../components/textfield/input-textfield.component";
import CustomButton from "../../components/custom button/button.component";
import EditingCard from '../../components/editing card/editing-card.component';

class AdminData extends React.Component{
    state={
        active:null,
        labels:["A+","A-","B+","B-","AB+","AB-","O+","O-"],
        bags:["100 ml", "250 ml", "400 ml","500 ml","600 ml"],
        editActive:false,
        slidingClass:"",
        slidedChart:""

    };
    toggleEditing = ()=>{
        this.setState({
            editActive: !this.state.editActive
        })
    };
    handleClickOnChart=(value)=>{
        console.log(value);
        this.setState({
            slidingClass: "sliding-class",
            slidedChart:"slided-chart"
        });
        if(this.state.active !== value){
            this.setState({
                active:value
            })
        }
    };
    render() {
        return (
            <div>
                <Header/>
                <div style={{marginTop:"50px", display:"flex",justifyContent:"space-around",width:"100%",overflow:"hidden"}}>
                    <div id={"slided-id"} className={`${this.state.slidedChart}`}>
                        <PieChart data={[0,10,30,40,5,15,25,20]} labels={this.state.labels}
                            onClickHandler={this.handleClickOnChart}/>
                    </div>
                    <div className={`${this.state.slidingClass}`} id={"sliding-id"}>
                        <Typography variant={"h5"} align={"center"} style={{
                            color:"#467DE3",
                            fontWeight:"bold",
                            fontSize:"40px",
                            fontFamily:"Iceland",
                            marginBottom:"10px"
                        }}>Blood Type: {this.state.labels[this.state.active]}</Typography>
                        <Table style={{border:"2px solid #467DE3", width:"550px"}}>
                            <TableHead style={{fontWeight:"bold !important"}}>
                                <TableRow >
                                    <TableCell align={"center"}>Bag Type (ml)</TableCell>
                                    <TableCell align={"center"}>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.bags.map((item, index)=>(
                                        <TableRow>
                                            <TableCell align={"center"}>{item}</TableCell>
                                            <TableCell align={"center"}>{item}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        {
                            this.state.editActive?(
                                <Tooltip title={<Typography variant={"h5"} align={"center"} style={{
                                        color:"#467DE3",
                                        fontWeight:"bold",
                                        fontSize:"20px",
                                        fontFamily:"Iceland",
                                }}>Done Editing</Typography>} arrow={true} style={{color:"#467DE3",float:"right"}}>
                                        <IconButton onClick={this.toggleEditing}>
                                            <CancelOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                            ):(
                                <Tooltip title={<Typography variant={"h5"} align={"center"} style={{
                                        color:"#467DE3",
                                        fontWeight:"bold",
                                        fontSize:"20px",
                                        fontFamily:"Iceland",
                                }}>Edit Data</Typography>} arrow={true} style={{color:"#467DE3",float:"right"}}>
                                        <IconButton onClick={this.toggleEditing}>
                                            <EditOutlined />
                                        </IconButton>
                                    </Tooltip>
                            )
                        }
                    </div>
                </div>

                {/*Down Section Content*/}
                {
                    this.state.editActive?(
                        <React.Fragment>
                            <Typography variant={"h5"} align={"left"} style={{
                                    color:"#467DE3",
                                    fontWeight:"bold",
                                    fontSize:"50px",
                                    fontFamily:"Iceland",
                                    marginBottom:"10px",
                                    marginTop:"40px",
                                    marginLeft:"30px"
                            }}>Edit Data for {this.state.labels[this.state.active]}</Typography>
                            <Grid container={true} spacing={6} justify={"flex-start"} alignItems={"center"} direction={"row"}
                            style={{width:"95vw", marginLeft:"auto", marginRight:"auto"}}
                            >
                                {
                                    this.state.bags.map(size=>(
                                        <Grid item={true} xs={"auto"}>
                                            <EditingCard blood_type={this.state.labels[this.state.active]}
                                                     bag_size={size} current_quantity={size} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </React.Fragment>
                    ):null
                }
            </div>
        );
    }
}
// <div>
//     <Typography variant={"h5"} align={"left"} style={{
//             color:"#467DE3",
//             fontWeight:"bold",
//             fontSize:"50px",
//             fontFamily:"Iceland",
//             marginBottom:"10px",
//             marginTop:"40px",
//             marginLeft:"30px"
//     }}>Edit Data for {this.state.labels[this.state.active]}</Typography>
//     <Table style={{border:"2px solid #467DE3", width:"800px", marginLeft:"50px",}}>
//     <TableHead style={{fontWeight:"bold !important"}}>
//         <TableRow >
//             <TableCell align={"center"}>Bag Type (ml)</TableCell>
//             <TableCell align={"center"}>Previous</TableCell>
//             <TableCell align={"center"}>New Data</TableCell>
//         </TableRow>
//     </TableHead>
//     <TableBody>
//         {
//             this.state.bags.map((item, index)=>(
//                 <TableRow>
//                     <TableCell align={"center"}>{item}</TableCell>
//                     <TableCell align={"center"}>{item}</TableCell>
//                     <TableCell align={"center"}>
//                         <InputTextField type={"number"} label={`${item} x n`} min={0} variant={"outlined"}/>
//                     </TableCell>
//                 </TableRow>
//             ))
//         }
//     </TableBody>
// </Table>
//     <Grid container={true} spacing={5} style={{marginTop:"40px"}} justify={"center"} >
//         <Grid item={true}>
//             <CustomButton label={"Done"} fontsize={30} />
//         </Grid>
//         <Grid item={true}>
//             <CustomButton label={"Clear"} fontsize={30} />
//         </Grid>
//     </Grid>
// </div>
export default  AdminData;