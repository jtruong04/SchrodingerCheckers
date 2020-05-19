import React from 'react';
//import PubNub from 'pubnub';
//import Swal from "sweetalert2";
//import shortid  from 'shortid';
import Board from './Board/Board';
import './Board/Board.css';
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
  const newarray=[];
  const cell = this.cellN;
  for(let i=1; i<=cell;i++)
  for(let j=1; j<=cell;j++)
    {
      let ind= this.sqindex(i,j);
      let ind1= this.sqindex(i,j+1);
      let ind2= this.sqindex(i+1,j);
      if(i<cell)
      {
      newarray.push(
        {id:"t"+ind+ind2,from:ind,
        to:ind2,bitstate:0});
      }
      if(j<cell)
      {
      newarray.push(
        {id:"t"+ind+ind1,from:ind,
        to:ind1,bitstate:0});
      }
    }
    return newarray;
}

TunnelChange(index)
{

const tunnels = this.state.tdata.slice();

const val = tunnels.findIndex(e => e.id === index );
let oldbit = tunnels[val].bitstate;
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
//publish to pubnub needs to be added here to sync
tunnels[val].bitstate  = newbit;
this.setState({
        tdata: tunnels,
//          whosTurn: !this.state.whosTurn
      });
}

SqChange(index)
{

  const squares = this.state.sqdata.slice();


const val = squares.findIndex(e => e.id === index );

squares[val].bitstate =  squares[val].bitstate===0?1:0 ;
//let newbit = val.bitstate===0?1:0;
//console.log(val.bitstate,newbit)
  //publish to pubnub needs to be added here to sync

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
