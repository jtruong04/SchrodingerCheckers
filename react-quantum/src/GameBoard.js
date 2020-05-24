import React from 'react';
import Board from './Board/Board';
import './Board/Board.css';
import PubNub from 'pubnub';
import {BoardState,tunnelState} from './Board/DummyState'



class GameBoard extends React.Component{
constructor(props)
{
  super(props)

  this.cellN = 4;

  this.state = { //sqdata : new Array(this.cellN**2).fill(),
                sqdata :this.InitSquares(),
                tdata : this.InitTunnels()
              }

                //tdata: new Array(this.cellN*(this.cellN-1)).fill()}
              this.pubnub = this.props.pubnub;
              if(!this.pubnub){console.log("Error: No Pubnub passed into GameBoard")};
              this.gameChannel = this.props.gameChannel;
              if(!this.gameChannel){console.log("Error: No GameChannel passed into GameBoard")}
              // init listener for when a square or tunnel changes
              this.pubnub.addListener({
                message:(msg)=>{
                  if(msg.message.sqChange){
                    const squares = this.state.sqdata.slice();
                    squares[msg.message.sqChange.val] = msg.message.sqChange.square;
                    this.setState({
                      sqdata: squares,
                    })
                  }else if(msg.message.tChange){
                    const tunnels = this.state.tdata.slice();
                    tunnels[msg.message.tChange.edgeval] = msg.message.tChange.tunnel;
                    this.setState({
                      tdata: tunnels,
                    })
                    console.log(this.state.tdata)
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
        {id:ind+"t"+ind1,from:ind,
        to:ind1,bitstate:0});
      }

      if(i<cell)
      {
      newarray.push(
        {id:ind+"t"+ind2,from:ind,
        to:ind2,bitstate:0});
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

this.setState({
        tdata: tunnels,
//          whosTurn: !this.state.whosTurn
      });
}

SqChange(index)
{

  const squares = this.state.sqdata.slice();


//const val = squares.findIndex(e => e.id === index );
const  val= parseInt(index.substr(1))-1;
squares[val].bitstate =  squares[val].bitstate===0?1:0 ;
//let newbit = val.bitstate===0?1:0;
//console.log(val.bitstate,newbit)

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
//          whosTurn: !this.state.whosTurn
        });
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
          </div>
        );
 }

}

export default GameBoard;

//write routine with componentDidUpdate/componentDidMount and include loading while syncing
//shouldCompnentupdate for submit??
