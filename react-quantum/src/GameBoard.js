import React from 'react';
import Board from './Board/Board';
import './Board/Board.css';



class GameBoard extends React.Component{
constructor(props){
  super(props);
  const _ = require('lodash');
  this.cellN = 4;

  this.state = { //sqdata : new Array(this.cellN**2).fill(),
                sqdata :this.InitSquares(),
                tdata : this.InitTunnels(),
                ap: 3,
                myTurn: this.props.myTurn,
              }

  // Use these to check what the original state was. 
  // So if on my turn i flip a bit and flip it back i should get back that ap
  this.original_sqdata = _.cloneDeep(this.state.sqdata);
  this.original_tdata  = _.cloneDeep(this.state.tdata);

  //tdata: new Array(this.cellN*(this.cellN-1)).fill()}
  this.pubnub = this.props.pubnub;
  if(!this.pubnub){console.log("Error: No Pubnub passed into GameBoard")};
  this.gameChannel = this.props.gameChannel;
  if(!this.gameChannel){console.log("Error: No GameChannel passed into GameBoard")}
  // init listener for square, tunnel, and endTurn changes.
  this.pubnub.addListener({
    message:(msg)=>{
      if(msg.message.sqChange && !this.state.myTurn){
        const squares = this.state.sqdata.slice();
        squares[msg.message.sqChange.val] = msg.message.sqChange.square;
        this.setState({
          sqdata: squares,
        });
      }else if(msg.message.tChange && !this.state.myTurn){
        const tunnels = this.state.tdata.slice();
        tunnels[msg.message.tChange.edgeval] = msg.message.tChange.tunnel;
        this.setState({
          tdata: tunnels,
        })
      }else if(msg.message.endTurn){
        if(!this.state.myTurn){
          this.setState({
            myTurn: true,
            ap: 3
          },()=>{
            this.original_sqdata = _.cloneDeep(this.state.sqdata);
            this.original_tdata = _.cloneDeep(this.state.tdata);
          });
        }else{
          this.setState({
            myTurn: false,
          })
        }
      }
    }
  })
};
sqindex (i,j)
{
  return (i-1)*this.cellN+ j;
}
InitSquares()
{
  const newarray=[];
  for(let i=1; i<=(this.cellN);i++)
  for(let j=1; j<=(this.cellN);j++)
    {
      newarray.push({id:"s"+this.sqindex(i,j),bitstate:0});
    }

    return newarray;
}

InitTunnels()
{
//  no periodic conditions as of now
//stritcly follow this ordering for edge else tunnel index will break
  const newarray=[];
  const cell = this.cellN;
  for(let i=1; i<=cell;i++)
  for(let j=1; j<=cell;j++)
    {
      let ind= this.sqindex(i,j);
      let ind1= this.sqindex(i,j+1);
      let ind2= this.sqindex(i+1,j);

      if(j<cell)
      {
      newarray.push(
        {id:ind+"t"+ind1,
        from:ind,
        to:ind1,
        bitstate:0,
        changed: false,
        destroyed: false,
      });
      }

      if(i<cell)
      {
      newarray.push(
        {id:ind+"t"+ind2,
        from:ind,
        to:ind2,
        bitstate:0,
        changed: false,
        destroyed: false,
      });
      }
    }
    return newarray;
}
tunnelindex(box1,box2)
{
  const size = this.cellN;

  if( size**2 - box1 < size )
  return size*(size-2) -1 + box2;

  if(box2-box1===1)
  return (box1-1)*2 - parseInt(box1/size)
  else return (box1-1)*2 + 1 - parseInt(box1/size)
}
TunnelChange(index)
{
const tunnels = this.state.tdata.slice();
const indval=index.split("t");
const edgeval = this.tunnelindex(parseInt(indval[0]),parseInt(indval[1]));
// Destroying a tunnel
if(this.state.ap > 1 && this.original_tdata[edgeval].bitstate !== 0 && this.state.myTurn && tunnels[edgeval].bitstate !== 0 && !tunnels[edgeval].destroyed){
  let newbit = 0;
  tunnels[edgeval].bitstate = newbit;
  this.pubnub.publish({
    message:{
      tChange: {
        edgeval: edgeval,
        tunnel: tunnels[edgeval],
      },
    },
    channel: this.gameChannel
  }).then((response)=>{
    if(response.error){
      console.log(response.error);
    }
  });
  tunnels[edgeval].destroyed = true;
  this.setState({
    ap: this.state.ap - 2,
    tdata: tunnels,
  },()=>{
    console.log('call back')
    console.log(tunnels)
  })
  // conditions to flip a tunnel. Its your turn and you have more than 0 ap
  // or its your turn and you are flipping a bit you flipped this turn
  // or this tunnel was destroyed then replaced
}else if((this.state.ap > 0 && this.state.myTurn) || (this.state.myTurn && (tunnels[edgeval].bitstate !== this.original_tdata[edgeval].bitstate) ) || (this.state.myTurn && tunnels[edgeval].changed && tunnels[edgeval].destroyed) ){
  console.log('normal flipping')
  let oldbit = tunnels[edgeval].bitstate;
  let newbit = 0;
  if(oldbit === 0)
  {
    newbit = 1;
  }
  else if (oldbit ===1)
  {
    newbit = -1;
  }
  else if (oldbit ===-1)
  {
    newbit = 2;
  }
  else newbit = 0;
  tunnels[edgeval].bitstate  = newbit;
  //send to pubnub to sync
  this.pubnub.publish({
    message:{
      tChange: {
        edgeval: edgeval,
        tunnel: tunnels[edgeval],
      },
    },
    channel: this.gameChannel
  }).then((response)=>{
    if(response.error){
      console.log(response.error);
    }
  });

  if(this.state.tdata[edgeval].changed && tunnels[edgeval].bitstate === this.original_tdata[edgeval].bitstate){
    tunnels[edgeval].changed = false;
    this.setState({
      ap: this.state.ap + 1,
      tdata: tunnels,
    });
  }else if(!this.state.tdata[edgeval].changed){
    tunnels[edgeval].changed = true;
    this.setState({
      ap: this.state.ap - 1,
      tdata: tunnels,
    });
  }
  }
}

SqChange(index)
{


  const squares = this.state.sqdata.slice();
  const  val = parseInt(index.substr(1))-1;

  // conditions to flip a bit. Its your turn and you have more than 0 ap
  // or its your turn and you are flipping a bit you flipped this turn
  if((this.state.ap > 0 && this.state.myTurn)|| (this.state.myTurn && (this.state.sqdata[val].bitstate !== this.original_sqdata[val].bitstate) ) ){
    squares[val].bitstate =  squares[val].bitstate===0?1:0 ;

    //send to pubnub to sync
    this.pubnub.publish({
      message:{
        sqChange: {
          val: val,
          square: squares[val],
        },
      },
      channel: this.gameChannel
    }).then((response)=>{
      if(response.error){
        console.log(response.error);
      }
    });

      this.setState({
              sqdata: squares,
            },()=>{
              if(this.state.sqdata[val].bitstate === this.original_sqdata[val].bitstate){
                this.setState({
                  ap: this.state.ap + 1
                })
              }else{
                this.setState({
                  ap: this.state.ap - 1
                })
              }
            });
  }
}

endTurn(){
  this.pubnub.publish({
    message:{
      endTurn: true,
    },
    channel: this.gameChannel
  }).then((response)=>{
    if(response.error){
      console.log(response.error);
    }
  })
}


 render() {

  return (
          <div>
          <h2>Demo GameBoard</h2>
          <Board
          squareStates={this.state.sqdata}
          tunnelStates={this.state.tdata}
          cellNum={this.cellN}
          onTClick={index => this.TunnelChange(index)}
          onSClick={index => this.SqChange(index)}
            />
            <label> My Turn: {this.state.myTurn.toString()} </label>
            <label>AP: {this.state.ap}</label>
            <button
            onClick={(e)=> this.endTurn()}
            >
              End Turn
            </button>
          </div>
        );
 }

}

export default GameBoard;

//write routine with componentDidUpdate/componentDidMount and include loading while syncing
//shouldCompnentupdate for submit??
