import React from 'react';
import "./editing-card.style.scss";
import {Card, CardActions, CardContent,CardHeader, Avatar, Typography, IconButton, Tooltip, Collapse} from '@material-ui/core';
import {EditOutlined, ExpandLessOutlined, ExpandMoreOutlined} from '@material-ui/icons';
import InputTextField from "../textfield/input-textfield.component";
import {CancelOutlined, DoneOutlined} from '@material-ui/icons'

const useStyles = ({

});

class EditingCard extends React.Component{
    state={
        editing:false
    };
    handleEditable = ()=>{
        this.setState({
            editing:!this.state.editing
        })
    };
    render() {
        const {bag_size, blood_type, current_quantity} = this.props;
        return (
            <Card
                  className={"styled-card"}
                  elevation={10} variant={"outlined"} raised={true} >
                <CardHeader avatar={<Avatar variant={"circle"}
                style={{border:"1px solid #D84656",color:"#D84656", width:"45px", height:"45px", background:"#232531"}}
                >{blood_type}</Avatar>} title={<Typography variant={"h6"} style={{
                    color:"#467DE3"
                }}>{`Bag Size - ${bag_size}`}</Typography>} />
                <CardContent>
                    <Typography variant={"button"} component={"span"} style={{color:"#467DE3"}}>
                        <b>Current Quantity</b>
                    </Typography>
                    <Typography variant={"h6"} style={{color:"#467DE3"}}>{current_quantity}</Typography>
                    <br />
                    <Collapse in={this.state.editing} unmountOnExit={true} timeout={"auto"}>
                        <React.Fragment>
                            <Typography variant={"button"} component={"span"} style={{color:"#467DE3"}}>
                                <b>New Quantity</b>
                            </Typography>
                            <div style={{marginLeft:"-20px"}}>
                                <InputTextField type={"number"} min={"0"} variant={"outlined"} label={"New Data"}/>
                            </div>
                        </React.Fragment>
                    </Collapse>
                </CardContent>
                <CardActions disableSpacing={true}>
                    {
                        !this.state.editing?(
                            <Tooltip title={"Edit"} arrow={true}>
                                <IconButton style={{marginLeft:"auto"}} onClick={this.handleEditable}>
                                    <EditOutlined style={{color:"#467DE3"}}/>
                                </IconButton>
                            </Tooltip>
                        ):(
                        <div style={{marginLeft:"auto"}}>
                            <Tooltip title={"Done"} arrow={true}>
                                <IconButton>
                                    <DoneOutlined style={{color:"#467DE3"}}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Cancel"} arrow={true}>
                                <IconButton onClick={this.handleEditable}>
                                    <CancelOutlined style={{color:"#467DE3"}}/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        )
                    }
                    {/*<IconButton style={{marginLeft:"auto"}} onClick={this.handleExpand}>*/}
                    {/*    {*/}
                    {/*        this.state.expanded?(<ExpandLessOutlined style={{color:"#444"}}/>)*/}
                    {/*            :(<ExpandMoreOutlined style={{color:"#444"}}/>)*/}
                    {/*    }*/}
                    {/*</IconButton>*/}
                </CardActions>
                {/*<Collapse in={this.state.expanded} unmountOnExit={true} timeout={"auto"}>*/}
                {/*    <Typography>Map here</Typography>*/}
                {/*</Collapse>*/}
            </Card>
        )
    }
}
export default EditingCard;