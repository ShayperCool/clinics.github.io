import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import data from './output.json';
import Filters from './Filters';
import MarkerClusterGroup from 'react-leaflet-markercluster';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const noMarginsStyle = {
  margin: "0px",
};

function App() {
  const [filters, setFilters] = useState({});
  useEffect(() => {
    const _result = {};
    for (const property in data) {
      _result[property] = true;
    }
    setFilters(_result);
  }, []);

  const setFilterValue = ({ value, key }) => {
    const _result = { ...filters };
    _result[key] = value;
    setFilters(_result);
  }

  const points = getPoints({ data, filters });

  const unique = (point, arrayOfPoints, pointIndex) => {
    for (let index = 0; index < arrayOfPoints.length; index++) {
      if (index === pointIndex) continue
      const element = arrayOfPoints[index];

      if (element.address === point.address) {
        return false;
      }
    }
    return true;
  }

  return (
    <>
      <MapContainer center={[59.931917, 30.354378]} zoom={13} scrollWheelZoom={true} id="full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className={POSITION_CLASSES.topright}>
          <div className="leaflet-control leaflet-bar">
            <Filters filters={filters} setFilterValue={setFilterValue} />
          </div>
        </div>
        <MarkerClusterGroup>
        {points.filter((point, index) => unique(point, points, index)).filter(point => point.coordinates !== undefined).map(point => {
          return <Marker key={point.address} position={[point.coordinates.lattitude, point.coordinates.longitude]}>
            <Popup>
              <p style={noMarginsStyle}>
                {point.organization}
              </p>
              <p style={noMarginsStyle}>
                {point.address}
              </p>
              <p style={noMarginsStyle}>
                {point.serviceType}
              </p>
            </Popup>
          </Marker>
        })}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

function getPoints({ data, filters }) {
  const points = [];

  for (const property in filters) {
    if (filters[property]) {
      const typePoints = data[property];
      typePoints.forEach(element => {
        points.push(element)
      });
    }
  }
  return points;
};

export default App;
