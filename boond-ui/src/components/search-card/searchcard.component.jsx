import React from 'react';
import "./searchcard.style.scss"
import {Card, CardActions, CardContent,CardHeader, Avatar, Typography, IconButton, Tooltip, Collapse} from '@material-ui/core';
import { ExpandLessOutlined, ExpandMoreOutlined} from '@material-ui/icons';
import {CancelOutlined, DoneOutlined} from '@material-ui/icons'



class SearchCard extends React.Component{
    state={
        expand:false
    };
    handleExpanded = ()=>{
        this.setState({
            expand:!this.state.expand
        })
    };
    render() {
        const {organisation, quantity, type, distance} = this.props;
        return (
            <Card
                  className={"styled-s-card"}
                  elevation={10} variant={"outlined"} raised={true} >
                <CardHeader avatar={<Avatar variant={"circle"} alt={organisation} src={"lsmx.hdis"}
                style={{border:"1px solid #D84656",color:"#D84656", width:"45px", height:"45px", background:"#232531"}}
                />} title={<Typography variant={"h6"} style={{
                    color:"#467DE3"
                }}>{organisation}</Typography>} />
                <CardContent className={"search-card-content"}>
                    <div>
                        <Typography variant={"button"} component={"span"} style={{color:"#467DE3"}}>
                            <b>{`Total Quantity of ${type}`}</b>
                        </Typography>
                        <Typography variant={"h6"} style={{color:"#467DE3"}}>{quantity}</Typography>
                    </div>
                    <div>
                        <Typography variant={"button"} component={"span"} style={{color:"#467DE3"}}>
                            <b>{`Distance`}</b>
                        </Typography>
                        <Typography variant={"h6"} style={{color:"#467DE3"}}>{distance}</Typography>
                    </div>
                </CardContent>
                <CardActions disableSpacing={true}>
                    {
                        !this.state.expand?(
                            <Tooltip title={"Edit"} arrow={true}>
                                <IconButton style={{marginLeft:"auto"}} onClick={this.handleExpanded}>
                                    <ExpandLessOutlined style={{color:"#467DE3"}}/>
                                </IconButton>
                            </Tooltip>
                        ):(
                        <div style={{marginLeft:"auto"}}>
                            <Tooltip title={"Cancel"} arrow={true}>
                                <IconButton onClick={this.handleExpanded}>
                                    <ExpandMoreOutlined style={{color:"#467DE3"}}/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        )
                    }

                </CardActions>
                <Collapse in={this.state.expand} timeout={"auto"} unmountOnExit={true}>
                    <CardContent>
                        <h2>Map Here</h2>
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}
export default SearchCard;