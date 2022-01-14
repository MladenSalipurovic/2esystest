
import React, {Component} from 'react';
import {Link} from 'react-router-dom';  
import axios from 'axios';

class Airlines extends Component 
{

    state = {
        airlines: [],
        loading: true,
        item_id: '',
    }

    async componentDidMount() {

        const url_id = this.props.match.params.id;
        this.setState({
            item_id: url_id
        });
        const res = await axios.get(`http://localhost:8000/api/airline/${url_id}`);

        if(res.data.status === 200) {
            this.setState({
                airlines: res.data.airlines,
                loading: false,
            });
        }

    }

    deleteAirline = async (e, id) => {

        const delBtnClicked = e.currentTarget;
        delBtnClicked.disabled = true;
        delBtnClicked.innerText = 'Deleting';

        const res = await axios.delete(`http://localhost:8000/api/delete-airline/${id}/${this.state.item_id}`);

        if(res.data.status === 200) {

            delBtnClicked.closest("tr").remove();
        }

    }

    render () {
        
        var airlines_HTMLTABLE = "";
        if(this.state.loading) {
            airlines_HTMLTABLE = <tr><td colSpan={5}> <h2>Loading...</h2> </td></tr>

        }
        else {
            airlines_HTMLTABLE = this.state.airlines.map( (item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.country_name}</td>
                        <td>
                            <Link to={`/edit-airline/${item.id}/${this.state.item_id}`} className='btn btn-success btn-sm'>Edit</Link>
                        </td>
                        <td>
                            <button type='button' onClick={(e) => this.deleteAirline(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
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
                                    Airline data
                                    <div className='float-end'>
                                        <Link to={'/'} className='btn btn-primary d-block'>Back</Link>
                                        <Link to={`/add-airline/${this.state.item_id}`} className='btn btn-primary d-block mt-2'>Add Airline</Link>
                                    </div>
                                    
                                </h3>
                            </div>
                            <div className='card-body'>

                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Country</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airlines_HTMLTABLE}
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

export default Airlines;