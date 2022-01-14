
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';  

class AddAirlines extends Component 
{
    state = {
        name: '',
        country_id: '',
        countries: [],
        item_id: '',
        
    
    }
    

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount() {

        const url_id = this.props.match.params.id;
        this.setState({
            item_id: url_id
        });
        const res = await axios.get('http://localhost:8000/api/add-airline');
        
        if(res.data.status === 200) {
            this.setState({
                countries: res.data.countries,
            });            
        }
    }
    
    saveAirline = async (e) => {
        e.preventDefault();

        document.getElementById('save-btn').disabled = true;
        document.getElementById('save-btn').innerText = "Saving";
        const res = await axios.post(`http://localhost:8000/api/store-airline/${this.state.item_id}`, this.state); 
        if(res.data.status === 200) {
            
            document.getElementById('save-btn').disabled = false;
            document.getElementById('save-btn').innerText = "Save Airline";
            this.setState({
                name: '',
                country_id: '',
            });
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
                                    Add Airline
                                    <Link to={`/airline/${this.state.item_id}`} className='btn btn-primary float-end'>Back</Link>
                                </h3>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.saveAirline}>
                                    <div className='form-group mb-3'>
                                        <label>Name</label>
                                        <input type='text' name='name' onChange={this.handleInput} value={this.state.name} className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Country</label>
                                        <select type='text' name='country_id' onChange={this.handleInput} value={this.state.country_id} className='form-control'>
                                            {countriesList}
                                        </select>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' id='save-btn' className='btn btn-primary'>Save Airline</button>
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

export default AddAirlines;