
import React, {Component} from 'react';
import {Link} from 'react-router-dom';  
import axios from 'axios';

class Airport extends Component 
{

    state = {
        airports: [],
        loading: true,
    }

    async componentDidMount() {

        const res = await axios.get('http://localhost:8000/api/airport');

        if(res.data.status === 200) {
            this.setState({
                airports: res.data.airports,
                loading: false,
            });
        }

    }

    deleteAirport = async (e, id) => {

        const delBtnClicked = e.currentTarget;
        delBtnClicked.disabled = true;
        delBtnClicked.innerText = 'Deleting';

        const res = await axios.delete(`http://localhost:8000/api/delete-airport/${id}`);

        if(res.data.status === 200) {

            delBtnClicked.closest("tr").remove();
        }

    }

    render () {
        
        var airport_HTMLTABLE = "";
        if(this.state.loading) {
            airport_HTMLTABLE = <tr><td colSpan={5}> <h2>Loading...</h2> </td></tr>

        }
        else {
            airport_HTMLTABLE = this.state.airports.map( (item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.country_name}</td>
                        <td>
                            {item.latitude},<span>&nbsp;&nbsp;</span>
                            {item.longitude}                            
                        </td>
                        <td>
                            <Link to={`airline/${item.id}`} className='btn btn-primary btn-sm'>Check all associated airlines</Link>
                        </td>
                        <td>
                            <Link to={`edit-airport/${item.id}`} className='btn btn-success btn-sm'>Edit</Link>
                        </td>
                        <td>
                            <button type='button' onClick={(e) => this.deleteAirport(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
                        </td>
                        
                        
                    </tr>
                );
            });
        }
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>
                                    Airport data
                                    <Link to={'add-airport'} className='btn btn-primary float-end'>Add Airport</Link>
                                </h3>
                            </div>
                            <div className='card-body'>

                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Country</th>
                                            <th>Latitude, Longitude</th>
                                            <th>Associated Airlines</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airport_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
}

export default Airport;