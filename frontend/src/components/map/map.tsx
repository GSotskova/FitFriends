import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';

type MapProps = {
  position: LatLngExpression;
};


const MapView = ({position}: MapProps) => (
  <div className="popup__map" data-testid="map">
    <MapContainer
      className="markercluster-map"
      center={position}
      zoom={13}
      style={{ height: '623', width: '1160' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={new Icon({iconUrl: 'img/sprite/icon-pin-user.svg', iconSize: [40, 49], iconAnchor: [40, 49]})}>
      </Marker>
    </MapContainer>
  </div>
);


export default MapView;
