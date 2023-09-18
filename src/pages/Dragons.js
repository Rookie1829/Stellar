import React, { useState, useEffect } from 'react';

export default function Dragons() {
    const [dragons, setDragons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/dragons')
            .then(response => response.json())
            .then(data => {
                setDragons(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX dragons data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-start">
            <div className="self-center mb-8"> 
                <h1 className="text-4xl mb-6 font-bold">Dragons</h1>
            </div>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mx-auto mt-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:max-w-4xl"> 
                        {dragons.map(dragon => (
                            <div key={dragon.id} className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6">
                                <h2 className="text-2xl font-semibold mb-2">{dragon.name}</h2>
                                <p>Type: {dragon.type}</p>
                                <p>Active: {dragon.active ? 'Yes' : 'No'}</p>
                                <p>Crew Capacity: {dragon.crew_capacity}</p>
                                <p>Sidewall Angle (deg): {dragon.sidewall_angle_deg}</p>
                                <p>Orbit Duration (yr): {dragon.orbit_duration_yr}</p>
                                <p>Dry Mass (kg): {dragon.dry_mass_kg}</p>
                                <p>Dry Mass (lb): {dragon.dry_mass_lb}</p>
                                {dragon.first_flight && <p>First Flight: {dragon.first_flight}</p>}
                                {dragon.heat_shield && dragon.heat_shield.material && <p>Heat Shield Material: {dragon.heat_shield.material}</p>}
                           
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
