import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
const SensorDataGraph = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData(); // Fetch data initially when component mounts
        const fetchDataInterval = setInterval(fetchData, 5000); // Fetch data every minute (adjust interval as needed)
        return () => clearInterval(fetchDataInterval); // Cleanup function to clear the interval when the component unmounts
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://192.168.1.108/testSend/TemperatureGraph.php');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
    <>
    <Helmet>
        <title>SensorDataGraph</title>
        <meta name="description" content="Web site created using create-react-app" />
    </Helmet>
    <div className="w-full p-5 bg-gray-900">
        <Link to="/desktopmaindashboard">Back</Link> {/* Link to the previous page */}
    </div>
    <div className="flex flex-col items-center mt-2 mb-8"></div>
        

        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data && data.tsl2561_data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100000]}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="light" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer>
                <LineChart
                    data={data && data.sensordata}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="humidity" stroke="#ffc658" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer>
                <LineChart
                    data={data && data.ec_data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis domain={[0, 4]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ec" stroke="#ff7300" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer>
                <LineChart
                    data={data && data.ph_data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis domain={[0, 20]}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ph_value" stroke="#0088aa" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
        
    </>
    );
};

export default SensorDataGraph;
