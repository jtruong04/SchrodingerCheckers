/*

The Rankings page displays a table showing the player his rank along
players near him (+- 10 or so). It should also have tabs to view global,
national, local rankings if possible.

TODO: Everything. The page is pretty much blank right now

*/

import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

class Rankings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top_players: []
     
    };
  }

  componentDidMount() {
    axios.get('/rankings')
      .then(res => {
        const top_players = res.data;
        this.setState({ top_players });
      })
  }

  renderTableData() {
    return this.state.top_players.map((player, index) => {
       const { id, name, age, email } = player //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{age}</td>
             <td>{email}</td>
          </tr>
       )
    })
 }

 renderTableHeader() {
  let header = Object.keys(this.state.top_players[0])
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
  })
}

 render() {
  return (
     <div>
        <h1 id='title'>React Dynamic Table</h1>
        <table id='students'>
           <tbody>
              {this.renderTableData()}
           </tbody>
        </table>
     </div>
  )
}



}

export default Rankings;
