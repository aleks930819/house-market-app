import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Map = ({lat, lng, location}) => {

    
  return (
    <div className="w-full h-[200px] overflow-hidden  mt-10 sm:w-[500px] md:w-[800px]">
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
