import React,{Component} from 'react';
import '../styles/ConsultTable.css';

class ConsultTable extends Component{
    
    render(){
    
    return(
    <>
    <table id="t01">
        <tr>
            <th>Firstname</th>
            <th>Lastname</th> 
            <th>Age</th>
        </tr>
        <tr>
            <td>Diego</td>
            <td>Smith</td>
            <td>50</td>
        </tr>
        <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
        </tr>
        <tr>
            <td>John</td>
            <td>Doe</td>
            <td>80</td>
        </tr>
    </table>
    </>);
}
}
export default ConsultTable;