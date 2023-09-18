
import React, { useState, useEffect } from 'react';

export default function Roadster() {
    const [roadster, setRoadster] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/roadster')
            .then(response => response.json())
            .then(data => {
                setRoadster(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX roadster data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-center">
            <div className="self-center"> 
                <h1 className="text-4xl mb-6 font-bold">Roadster</h1>
            </div>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mt-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6 max-w-xl w-full"> 
                    <h2 className="text-2xl font-semibold mb-4">{roadster.name}</h2>
                    <p className="mb-2">Details: {roadster.details}</p>
            
                </div>
            )}
        </div>
    );
}
