import React,{Component} from 'react';
import '../styles/ConsultTable.css';

class ConsultTable extends Component{
    
    constructor(props) {
        super(props);
        this.state = { activeTab: 0};
    
      }

    render(){
    
    return(
    <>
    <table id="t01">
        <tr>
        { this.props.crud.consult.map((item,i)=> 
                 <td key={i}>
                     {item}
                    </td>
        )}
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