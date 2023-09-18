import React, { useState, useEffect } from 'react';

export default function Ships() {
    const [ships, setShips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/ships')
            .then(response => response.json())
            .then(data => {
                setShips(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX ships data:", error);
                setLoading(false);
            });
    }, []);

    const filteredShips = filterType === 'all' 
        ? ships 
        : ships.filter(ship => ship.type === filterType);


    const shipTypes = Array.from(new Set(ships.map(ship => ship.type))).filter(Boolean);

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-center">
            <div className="self-center">
                <h1 className="text-4xl mb-6 font-bold pl-8">Ships</h1>

                <label htmlFor="shipFilter" className="block mb-4 font-semibold pl-6">Filter by Type</label>
                <select 
                    id="shipFilter" 
                    value={filterType} 
                    onChange={e => setFilterType(e.target.value)}
                    className="bg-zinc-900 text-white p-2 rounded mb-6 text-center p-2 w-44"
                >
                    <option value="all">All Types</option>
                    {shipTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mx-auto mt-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredShips.map(ship => (
                        <div key={ship.id} className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6">
                            <h2 className="text-2xl font-semibold mb-2">{ship.name}</h2>
                            <p className="mb-1">Type: {ship.type || 'Unknown'}</p>         
                            <p className="mb-1">Roles: {ship.roles.join(', ') || 'Unknown'}</p>                                       
                            <p className="mb-1">Home Port: {ship.home_port || 'Unknown'}</p>
                            <p className="mb-1">Mass (kg): {ship.mass_kg || 'Unknown'}</p>

                            {ship.link && <a href={ship.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2">More Info</a>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
