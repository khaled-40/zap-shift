import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const positions = useLoaderData();
    const mapRef = useRef();
    console.log(positions)
    const position = [23.8103, 90.4125];
    const handleSearchLocation = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = positions.find(p => p.district.toLowerCase().includes(location.toLowerCase()));
        if (district) {
            const coord = [district.latitude, district.longitude];
            console.log(coord)
            mapRef.current.flyTo(coord, 14);
        }
    }
    return (
        <div className='pt-16'>
            <h2 className='text-3xl text-secondary font-bold'>We are available in 64 districts</h2>
            <div>
                <form onSubmit={handleSearchLocation}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" name='location' className="grow" placeholder="Search" />
                    </label>
                </form>
            </div>
            <div className='w-full h-200 '>
                <MapContainer center={position}
                    zoom={7}
                    scrollWheelZoom={false}
                    ref={mapRef}
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