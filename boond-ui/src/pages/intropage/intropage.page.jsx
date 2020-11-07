import React from 'react';
import Glow from "../../components/glow component/glow.component";
import CustomButton from "../../components/custom button/button.component";
import BloodBankImage from "../../images/Blood-Donation-PNG-Pic.png";
import {withRouter} from 'react-router';

class IntroPage extends React.Component{
    render(){
        const {history} = this.props;
        return(
            <div>
                <Glow text={"BOOND"} fontsize={200} />
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    width:"600px",
                    marginLeft:"auto",
                    marginRight:"auto",
                    justifyContent:"space-between",
                    marginTop:"150px"
                }}>
                    <CustomButton label={"admins"} fontsize={30} width={250} onClick={()=>{history.push("/admin")}}/>
                    <CustomButton label={"donors"} fontsize={30} width={250}/>
                </div>
                <img src={BloodBankImage} />
            </div>
        );
    }
}
export default withRouter(IntroPage);