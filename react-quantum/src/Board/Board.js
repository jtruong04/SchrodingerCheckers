import React from 'react';
import Square from './Squares';
import Tunnels from './Tunnels';
import './Board.css';

class Board extends React.Component {
  // Create the 4 x 4 board


  renderSquares (props)
  {
  return(<Square
  key ={props.id}
  id ={props.id}
  sqval={props.bitstate}
  squaretype="square"
  onSClick={() => this.props.onSClick(props.id)}
  />);}

  renderTunnels (props)
  {

  if( (props.to - props.from) === this.props.cellNum )
  {
  return(  <Tunnels
  key ={props.id}
  id ={props.id}
  from = {props.from}
  to= {props.to}
  tval = {props.bitstate}
  tunneltype="tunneldown"
  onTClick={() => this.props.onTClick(props.id)}
  />);
  }
  return(  <Tunnels
  key ={props.id}
  id ={props.id}
  from = {props.from}
  to= {props.to}
  tval = {props.bitstate}
  tunneltype="tunnelright"
  onTClick={() => this.props.onTClick(props.id)}
  />);

  }



  createBoard(size,sqs,tst)
  {


  const sqstates= sqs.map(item =>  this.renderSquares(item));
  const tstates = tst.map(item => this.renderTunnels(item));

//  console.log(tstates);


  const board= []
  let index= 0;
  for(let i=1; i<=2*size; i++)
  { const columns = [];
    for(let j=1; j<2*size; j++)
    {
    if(i%2!==0)
      {
      if(j%2!==0)
        {
          index=(i-1)*size/2+(j+1)/2;
          columns.push(sqstates.find((e)=> e.key === "s"+index));

//          columns.push(sqstates.slice(index-1,index));
        }
      else
        {
           index=((i-1)*size/2+(j)/2);
            columns.push(tstates.find((e)=> e.key === index+"t"+(index+1)));
//          columns.push(tstates.slice(index-1,index));
        }
      }
    else
      {

      if(j%2!==0)
        { index=((i-2)*size/2+(j+1)/2);

        columns.push(tstates.find((e)=> e.key === index+"t"+(index+size)));
        }
      else
        {
          columns.push(
          <div key={"em"+i+j} className="squareempty"></div>);
        }
      }
    }

    board.push(<div key={i} className="board-row">{columns}</div>);
  };

  return board;

  }
  render()
  {
    return (
      <div className={`board`} style={{width: ""+(this.props.cellNum)*2*118+"px"}}>
      {this.createBoard(this.props.cellNum,this.props.squareStates,this.props.tunnelStates)}
      </div>);

}

}
export default Board;
