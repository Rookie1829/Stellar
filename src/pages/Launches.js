import React, { useState, useEffect } from 'react';

export default function Launches() {
    const [launches, setLaunches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/launches')
            .then(response => response.json())
            .then(data => {
                setLaunches(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX launches data:", error);
                setLoading(false);
            });
    }, []);

    const filteredLaunches = filter === 'all' 
        ? launches 
        : launches.filter(launch => launch.upcoming === (filter === 'upcoming'));

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-center"> 
            <h1 className="text-4xl mb-6 font-bold">Launches</h1>
            
            <label htmlFor="launchFilter" className="block mb-4 font-semibold">Filter Launches</label>
            <select 
                id="launchFilter" 
                value={filter} 
                onChange={e => setFilter(e.target.value)}
                className="bg-zinc-900 text-white p-2 rounded mb-6"
            >
                <option value="all">All Launches</option>
                <option value="upcoming">Upcoming Launches</option>
                <option value="past">Past Launches</option>
            </select>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mt-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:max-w-4xl"> 
                        {filteredLaunches.map(launch => (
                            <div key={launch.flight_number} className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6">
                                <h2 className="text-2xl font-semibold mb-2">{launch.name}</h2>
                                <p>Flight Number: {launch.flight_number}</p>
                                <p>Date (UTC): {launch.date_utc}</p>
                                <p>Date (Local): {launch.date_local}</p>
                                <p>Success: {launch.success ? 'Yes' : 'No'}</p>
                                <p>Upcoming: {launch.upcoming ? 'Yes' : 'No'}</p>
                                <p>Details: {launch.details || 'Not available'}</p>

                                {launch.links && launch.links.wikipedia && 
                                    <p><a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 underline">Wikipedia</a></p>
                                }

                      
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
