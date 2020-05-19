import React from 'react';
//import PubNub from 'pubnub';
//import Swal from "sweetalert2";
//import shortid  from 'shortid';


class Tunnels extends React.Component {
  constructor(props){
    super(props);
    this.state = {hovered:false};
  }

  onClickTConsole(id){
  console.log("Tunnel "+ id+ " was clicked!  ");
  }

  interiorImage(){
      const val1 = "./line.png";
      const val2 = "./darrow.png";
      const val3 = "./larrow.png";
      let imgs = "";
      let angl = 0;

      if(this.props.tval === 0)
      {
        imgs = val1;
      }
      else if (this.props.tval === 2)
      {
        imgs = val2;
      }
      else
      {
        imgs = val3;
        angl = (this.props.tval+1)*90;
      }

      if(this.props.tunneltype === "tunnelright")
      {

        return  (<img style={{width: "50%",height: "100%",display:"block",
        marginLeft:"25%",opacity:"100%",transform:"rotate("+(0+angl)+"deg)"}}
         src = {imgs} ></img>);
      }

      else{
      return (<img style={{width: "100%",height: "50%",display:"block",
      marginTop:"50%",opacity:"100%",transform:"rotate("+(90+angl)+"deg)"}}
      src = {imgs} ></img>);
    }

  }

render() {


  return(

    <div className={this.props.tunneltype}
    onMouseOver={() => this.setState({hovered: true})}
    onMouseOut={() => this.setState({hovered: false})}
    style ={{opacity: this.state.hovered?"50%":"100%"
    ,justifyContents: "center" }}
  /*  onClick={()=>this.onClickTConsole(this.props.id)}*/
    onClick={this.props.onTClick}>
    {this.interiorImage()}
  </div>
);
}

}
export default Tunnels;
