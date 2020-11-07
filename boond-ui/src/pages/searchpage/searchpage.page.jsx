import React from 'react';
import "./searchpage.style.scss";
import Header from "../../components/header/header.component";
import InputTextField from "../../components/textfield/input-textfield.component";
import {IconButton} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import SearchTable from "../../components/search table/search-table.component";
import SearchCard from "../../components/search-card/searchcard.component";

class SearchPage extends React.Component{
    render(){
        return(
            <div style={{display:"flex", flexDirection:"column"}}>
                <Header/>
                <div className={"for-search-field"}>
                    <div className={"for-real-search"}>
                        <input type={"text"} placeholder={"Search blood group or organisation..."}/>
                        <button>
                            <SearchOutlined style={{color:"#467DE3", fontSize:"35px", marginBottom:"5px", fontWeight:"10"}}/>
                        </button>
                    </div>
                </div>
                <div style={{marginTop:"40px",marginBottom:"20px", width:"80vw", marginLeft:"auto", marginRight:"auto"}}>
                    <div style={{float:"right"}}>
                        <select className={"select-tag"} id={"distance-filter"}>
                            <option value={""} selected={true}>Distance</option>
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                            <option value="Option 4">Option 4</option>
                            <option value="Option 5">Option 5</option>
                        </select>
                    </div>
                </div>
                <div style={{marginTop:"30px"}}>
                    <SearchCard distance={"40 km"} organisation={"Bharat blood bank"} type={"AB+"} quantity={"100 ml"} />
                </div>
            </div>
        );
    }
}

export default SearchPage;