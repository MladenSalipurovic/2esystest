
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';  
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";

  //My Google Maps Api Key
const apiKey = 'AIzaSyAm77xHANSzrknu0gO8GTIqWOThoK4Wyg0';
const myGoogleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`;


class EditAirport extends Component 
{
    state = {
        name: '',
        country_id: '',
        latitude: '',
        longitude: '',    
        countries: [],
    
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount() {

        const url_id = this.props.match.params.id;
        const res = await axios.get(`http://localhost:8000/api/edit-airport/${url_id}`);
        
        if(res.data.status === 200) {
            this.setState({
                name: res.data.airports.name,
                country_id: res.data.airports.country_id,
                latitude: res.data.airports.latitude,
                longitude: res.data.airports.longitude, 
                countries: res.data.countries,
            });
            
        }
    }
    
    UpdateAirport = async (e) => {
        e.preventDefault();

        document.getElementById('update-btn').disabled = true;
        document.getElementById('update-btn').innerText = "Updating";
        const url_id = this.props.match.params.id;

        let state = {... this.state};
        delete state.countries;
        this.setState(state);
        const res = await axios.put(`http://localhost:8000/api/update-airport/${url_id}`, this.state); 

        if(res.data.status === 200) {
            document.getElementById('update-btn').disabled = false;
            document.getElementById('update-btn').innerText = "Update Airport";

        }
    }

    onMarkerDragEnd = (event) => {
        
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();
        this.setState({
            ...this.state,
            latitude: parseFloat(newLat),
            longitude: parseFloat(newLng),
        })
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


        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={8}
              defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
            >
              <Marker
                draggable={true}
                onDragEnd={this.onMarkerDragEnd}
                position={{ lat: this.state.latitude, lng: this.state.longitude }}
              />
            </GoogleMap>
          ));

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>
                                    Edit Airport
                                    <Link to={'/'} className='btn btn-primary float-end'>Back</Link>
                                </h3>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.UpdateAirport}>
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
                                        <label>Location</label>
                                        <div className='d-flex'>
                                            <input placeholder='latitude' type='text' name='latitude' onChange={this.handleInput} value={this.state.latitude} className='form-control' />
                                            <input placeholder='longitude' type='text' name='longitude' onChange={this.handleInput} value={this.state.longitude} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' id='update-btn' className='btn btn-primary'>Update Airport</button>
                                    </div>
                                </form>

                                

                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <MapWithAMarker
                                    googleMapURL= {myGoogleMapUrl}
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                </div>
            </div>
        );    
    }
}

export default EditAirport;