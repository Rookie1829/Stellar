
import React, { useState, useEffect } from 'react';

export default function Rockets() {
    const [rockets, setRockets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/rockets')
            .then(response => response.json())
            .then(data => {
                setRockets(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX rockets data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-center">
            <div className="self-center"> 
                <h1 className="text-4xl mb-6 font-bold">Rockets</h1>
            </div>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mx-auto mt-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
                    {rockets.map(rocket => (
                        <div key={rocket.id} className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6"> 
                            <h2 className="text-2xl font-semibold mb-2">{rocket.name}</h2>
                            <p className="mb-1">Type: {rocket.type}</p>
                            <p className="mb-1">Active: {rocket.active ? 'Yes' : 'No'}</p>
                            <p className="mb-1">Stages: {rocket.stages}</p>
                
                            <p className="mb-1">Description: {rocket.description}</p>
                            <a href={rocket.wikipedia} target="_blank" rel="noopener noreferrer" className="underline">Wikipedia</a>
                            <div className="mt-4">
                                {rocket.flickr_images?.map((image, index) => (
                                    <img key={index} src={image} alt={`${rocket.name} Image`} className="w-64 h-48 object-cover rounded-md mr-4" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
