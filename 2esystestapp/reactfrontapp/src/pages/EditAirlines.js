
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';  

class EditAirlines extends Component 
{
    state = {
        name: '',
        country_id: '',  
        countries: [],
        item_id: '',
        item_id2: '',
    
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount() {

        const url_id = this.props.match.params.id;
        const url_id2 = this.props.match.params.id2;
        this.setState({
            item_id: url_id,
            item_id2: url_id2,
        
        })
        const res = await axios.get(`http://localhost:8000/api/edit-airline/${url_id}`);
        

        if(res.data.status === 200) {
            this.setState({
                name: res.data.airlines.name,
                country_id: res.data.airlines.country_id,
                countries: res.data.countries,
            });
            
        }
    }
    
    UpdateAirline = async (e) => {
        e.preventDefault();

        document.getElementById('update-btn').disabled = true;
        document.getElementById('update-btn').innerText = "Updating";
        const url_id = this.props.match.params.id;

        let state = {... this.state};
        delete state.countries;
        this.setState(state);
        const res = await axios.put(`http://localhost:8000/api/update-airline/${url_id}`, this.state); 

        if(res.data.status === 200) {
            document.getElementById('update-btn').disabled = false;
            document.getElementById('update-btn').innerText = "Update Airline";

        }
    }

    render () 
    {   
        const { countries } = this.state;
        let countriesList = countries.length > 0
            && countries.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.country_name}</option>
            )
        }, this);


        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>
                                    Edit Airport
                                    <Link to={`/airline/${this.state.item_id2}`} className='btn btn-primary float-end'>Back</Link>
                                </h3>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.UpdateAirline}>
                                    <div className='form-group mb-3'>
                                        <label>Name</label>
                                        <input type='text' name='name' onChange={this.handleInput} value={this.state.name} className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Country</label>
                                        <select name='country_id' onChange={this.handleInput} value={this.state.country_id} className='form-control'>
                                            {countriesList}
                                        </select>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' id='update-btn' className='btn btn-primary'>Update Airport</button>
                                    </div>
                                </form>                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
}

export default EditAirlines;