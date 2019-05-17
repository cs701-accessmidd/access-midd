/*
  Directions fetches direction data from mapbox directions api and then displays
  it on the map as a set of lines

  props:
    accessToken: Mapbox access token
    origin: Origin coordinate in [longitude, latitude] format
    destination: Destination coordinate in [longitude, latitude] format
    type: Type of directions that are fetched from API. Possible choices are
          walking, driving, cycling. Defaults to driving

  sourcecode: https://github.com/mapbox/store-locator-react-native/blob/master/src/components/Directions.js
*/

import React from 'react';
import PropTypes from 'prop-types';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox';

function areCoordinatesEqual(c1, c2) {
  if (!c1 || !c2) {
    return false;
  }
  const dLng = Math.abs(c1[0] - c2[0]);
  const dLat = Math.abs(c1[1] - c2[1]);
  return dLng <= 6e-6 && dLat <= 6e-6;
}

class Directions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapboxClient: null,
      directions: null,
    };
  }

  componentDidMount() {
    const { accessToken, origin, destination } = this.props;
    this.setState({ mapboxClient: new MapboxClient(accessToken) }, () => {
      this.fetchDirections(origin, destination);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { origin, destination } = this.props;
    const { directions } = this.state;
    const dest = destination;

    if (directions && (!origin || !dest)) {
      this.setState({ directions: null });
      return;
    }

    const nextOrigin = nextProps.origin;
    const nextDest = nextProps.destination;

    if (areCoordinatesEqual(origin, nextOrigin) && areCoordinatesEqual(dest, nextDest)) {
      return;
    }

    if (nextOrigin && nextDest) {
      this.fetchDirections(nextOrigin, nextDest);
    }
  }

  async fetchDirections(origin, dest) {
    const { mapboxClient } = this.state;
    const { type } = this.props;
    if (!origin || !dest || !mapboxClient) {
      return;
    }

    const originLatLng = {
      latitude: origin[1],
      longitude: origin[0],
    };

    const destLatLng = {
      latitude: dest[1],
      longitude: dest[0],
    };

    const requestOptions = {
      profile: type,
      overview: 'full',
      alternatives: false,
      geometry: 'geojson',
    };

    let res = null;
    try {
      res = await mapboxClient.getDirections([
        originLatLng,
        destLatLng,
      ], requestOptions);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    if (res == null) {
      return;
    }

    const directions = res.entity.routes[0];
    if (!directions) {
      return;
    }

    directions.geometry.coordinates.unshift(origin);
    directions.geometry.coordinates.push(dest);
    this.setState({ directions });
  }

  render() {
    const { directions } = this.state;
    if (!directions) {
      return null;
    }
    return (
      <MapboxGL.ShapeSource id="line1" shape={directions.geometry}>
        <MapboxGL.LineLayer id="linelayer1" style={{ lineColor: 'blue' }} />
      </MapboxGL.ShapeSource>
    );
  }
}

Directions.propTypes = {
  accessToken: PropTypes.string.isRequired,
  origin: PropTypes.arrayOf(PropTypes.number),
  destination: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.oneOf([
    'driving-traffic',
    'walking',
    'cycling',
  ]),
};

Directions.defaultProps = {
  origin: null,
  destination: null,
  type: 'walking',

};

export default Directions;
