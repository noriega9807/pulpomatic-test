import React from 'react';
const { compose, withProps, lifecycle } = require('recompose');
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require('react-google-maps');

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC45j53TTkK9j45PnNu__ePf_sFWJ6hYKY&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '400px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidUpdate() {
            const DirectionsService = new google.maps.DirectionsService();
  
            DirectionsService.route({
                origin: new google.maps.LatLng(this.props.originLat, this.props.originLong),
                destination: new google.maps.LatLng(this.props.destinationLat, this.props.destinationLong),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`Error con las direcciones ${result}`);
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(19.417272, -99.171559)}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
);

export class DashboardPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            point1Lat: '',
            point1Long: '',
            point2Lat: '',
            point2Long: '',
            error: ''
        };
    };

    onPoint1ChangeLat = (e) => {
        const point1Lat = e.target.value;
        this.setState(() => ({ point1Lat }));
    };

    onPoint1ChangeLong = (e) => {
        const point1Long = e.target.value;
        this.setState(() => ({ point1Long }));
    };

    onPoint2ChangeLat = (e) => {
        const point2Lat = e.target.value;
        this.setState(() => ({ point2Lat }));
    };

    onPoint2ChangeLong = (e) => {
        const point2Long = e.target.value;
        this.setState(() => ({ point2Long }));
    };

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                    <span className="input-span--text">Latitud y longitud origen</span>
                    </div>
                    <div className="input-group__item">
                    <input 
                        className="text-input"
                        type="text"
                        placeholder="Punto 1 latitud"
                        autoFocus
                        value={this.state.point1Lat}
                        onChange={this.onPoint1ChangeLat}
                    />
                    </div>
                    <div className="input-group__item">
                    <input 
                        className="text-input"
                        type="text"
                        placeholder="Punto 1 longitud"
                        value={this.state.point1Long}
                        onChange={this.onPoint1ChangeLong}
                    />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                    <span className="input-span--text">Latitud y longitud destino</span>
                    </div>
                    <div className="input-group__item">
                    <input 
                        className="text-input"
                        type="text"
                        placeholder="Punto 2 latitud"
                        value={this.state.point2Lat}
                        onChange={this.onPoint2ChangeLat}
                    />
                    </div>
                    <div className="input-group__item">
                    <input 
                        className="text-input"
                        type="text"
                        placeholder="Punto 2 longitud"
                        value={this.state.point2Long}
                        onChange={this.onPoint2ChangeLong}
                    />
                    </div>
                </div>
                <MapWithADirectionsRenderer 
                    originLat={this.state.point1Lat}
                    originLong={this.state.point1Long}
                    destinationLat={this.state.point2Lat}
                    destinationLong={this.state.point2Long}
                />
            </div>
        );
    }
}

export default DashboardPage;