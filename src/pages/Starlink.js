import React, { useState, useEffect } from 'react';

export default function Starlink() {
    const [starlinks, setStarlinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterVersion, setFilterVersion] = useState('all');

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/starlink')
            .then(response => response.json())
            .then(data => {
                setStarlinks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX starlink data:", error);
                setLoading(false);
            });
    }, []);

    const filteredStarlinks = filterVersion === 'all' 
        ? starlinks 
        : starlinks.filter(starlink => starlink.version === filterVersion);


    const versions = Array.from(new Set(starlinks.map(starlink => starlink.version))).filter(Boolean);

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-center">
            <div className="self-center">
                <h1 className="text-4xl mb-6 font-bold pr-1">Starlink</h1>

                <label htmlFor="versionFilter" className="block mb-4 font-semibold pl-2">Filter by Version</label>
                <select 
                    id="versionFilter" 
                    value={filterVersion} 
                    onChange={e => setFilterVersion(e.target.value)}
                    className="bg-zinc-900 text-white p-2 rounded mb-6 text-center p-2 w-44"
                >
                    <option value="all">All Versions</option>
                    {versions.map(version => (
                        <option key={version} value={version}>{version}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mx-auto mt-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredStarlinks.map(starlink => (
                        <div key={starlink.id} className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6">
                            <h2 className="text-2xl font-semibold mb-2">SpaceX Starlink Satellite</h2>
                            <p className="mb-1">Version: {starlink.version}</p>
                            <p className="mb-1">Object Type: {starlink.spaceTrack.OBJECT_TYPE || 'Unknown'}</p>
                            <p className="mb-1">Launch Date: {new Date(starlink.spaceTrack.LAUNCH_DATE).toLocaleDateString()}</p>
                            <p className="mb-1">Object Name: {starlink.spaceTrack.OBJECT_NAME}</p>
            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
