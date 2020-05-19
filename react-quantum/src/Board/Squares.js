import React from 'react';
//import PubNub from 'pubnub';
//import Swal from "sweetalert2";
//import shortid  from 'shortid';

class Squares extends React.Component {

  constructor(props){
    super(props);
    this.state = {hovered:false};
  }

 onClickSConsole(id){
 console.log("Box "+ id+ " was clicked!  ");
}
render(){

  return(

    <div className={this.props.squaretype}
    onMouseOver={() => this.setState({hovered: true})}
    onMouseOut={() => this.setState({hovered: false})}
    style ={{opacity: this.state.hovered?"50%":"100%",
    background: this.props.sqval===0?"#fff":"black" }}
/*    onClick={()=>this.onClickSConsole(this.props.id)}*/
    onClick={this.props.onSClick}>
  </div>
);
}
}
export default Squares;
