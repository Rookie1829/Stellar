import React, { useState, useEffect } from 'react';

export default function Company() {

    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch('https://api.spacexdata.com/v4/company')
            .then(response => response.json())
            .then(data => {
                setCompanyData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX company data:", error);
                setLoading(false);
            });
    }, []);  

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-start">
            <div className="self-center mb-6"> 
                <h1 className="text-4xl font-bold pr-4">Company</h1>
            </div>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mx-auto mt-4">
                    <p>Loading...</p>
                </div>
            ) : companyData ? (
                <div className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6 max-w-xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-2">{companyData.name}</h2>
                    <p className="mb-2">Founder: {companyData.founder}</p>
                    <p className="mb-2">Founded: {companyData.founded}</p>
                    <p className="mb-2">Employees: {companyData.employees}</p>
            
                </div>
            ) : (
                <div className="bg-red-500 p-4 rounded-md max-w-md mx-auto mt-4">
                    <p>Error fetching company data.</p>
                </div>
            )}
        </div>
    );
}
