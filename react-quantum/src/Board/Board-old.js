import React from 'react';
//import PubNub from 'pubnub';
//import Swal from "sweetalert2";
//import shortid  from 'shortid';
import Square from './Squares';
import Tunnels from './Tunnels';
import './Board.css';
//import './Board/DummyState'

class Board extends React.Component {
  // Create the 4 x 4 board
 constructor(props)
 {
   super(props);


};

  renderSquares (i,bit)
 {
   return(<Square
   key ={i}
   id ={i}
   sqval={bit}
   squaretype="square"/>);
 }




  createBoard(size)
  {
//      const listrenderSquares =
//      this.props.squares.map( item =>
//        <Square
//        key ={item.id}
//        id ={item.id}
//        sqval ={item.bitstate}
//        squaretype="square"/>);

      const board= []
      let index= 0;
      for(let i=1; i<2*size; i++)
      { const columns = [];
      for(let j=1; j<2*size; j++)
      {
        if(i%2!==0)
        {
        if(j%2!==0)
        {
          index=(i-1)*2+(j+1)/2;
        columns.push(this.renderSquares(index,0));
        }
        else
        { index=((i-1)*2+(j)/2);
          columns.push(
          <Tunnels
            id = {"t"+index+(index+1)}
            tunneltype="tunnelright" />
          );
        }
        }
        else{
          if(j%2!==0)
          { index=((i-2)*2+(j+1)/2);
            columns.push(
            <Tunnels
              id = {"t"+(index)+(index+4)}
              tunneltype="tunneldown" />
          );}
          else
          {
            columns.push(
              <div key={"em"+i+j} className="squareempty"></div>

            );
          }
          }
        }
          board.push(<div key={i} className="board-row">{columns}</div>);
        };
        return board;
  }
  render()
  {
    const cellNum=4;
    return (
      <div className={`board`} style={{width: ""+(cellNum)*2*118+"px"}}>
      {this.createBoard(cellNum)}
      </div>);

}

}
export default Board;
