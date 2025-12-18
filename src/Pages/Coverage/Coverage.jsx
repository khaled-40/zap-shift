import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const positions = useLoaderData();
    console.log(positions)
    const position = [23.8103, 90.4125]
    return (
        <div className='pt-16'>
            <h2 className='text-3xl text-secondary font-bold'>We are available in 64 districts</h2>
            <div>

            </div>
            <div className='w-full h-200 '>
                <MapContainer center={position}
                    zoom={7}
                    scrollWheelZoom={false}
                    className='h-112.5 rounded-xl'
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        positions.map(position => <Marker key={position.district} position={[position.latitude, position.longitude]}>
                            <Popup>
                                <strong>{position.district}</strong> <br /> 
                                Service Area: {position.covered_area.join(', ')}
                            </Popup>
                        </Marker>)
                    }

                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;