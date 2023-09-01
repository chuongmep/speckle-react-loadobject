import React, { useEffect, useState } from 'react';
import ObjectLoader from '@speckle/objectloader';

function SpeckleLoader() {
    const [streamId, setStreamId] = useState('c581c30077'); // State for streamId input
    const [objectId, setObjectId] = useState('d3687b35b2aa3987433900e38d026ba3'); // State for objectId input
    const [serverUrl, setServerUrl] = useState('https://latest.speckle.dev'); // State for serverUrl input
    const [data, setData] = useState([]); // State to store loaded data

    const loadSpeckleData = async () => {
        try {
            const token = ''; // Add your token here

            const loader = new ObjectLoader({
                serverUrl,
                token,
                streamId,
                objectId,
            });

            let total = null;
            let count = 0;
            const loadedData = [];

            for await (let obj of loader.getObjectIterator()) {
                if (!total) total = obj.totalChildrenCount;
                loadedData.push(obj);
                console.log(obj, `Progress: ${count++}/${total}`);
            }

            setData(loadedData);
        } catch (error) {
            console.error('Error loading Speckle data:', error);
        }
    };

    useEffect(() => {
        // You can call loadSpeckleData here if you want to load data automatically when the component mounts.
    }, []); // Make sure to specify any dependencies if needed

    return (
        <div>
            <div>
                <label style={labelStyle} htmlFor="streamId">Stream ID:</label>
                <input
                    style={inputStyle}
                    type="text"
                    id="streamId"
                    value={streamId}
                    onChange={(e) => setStreamId(e.target.value)}
                />
            </div>
            <div>
                <label
                    style={labelStyle}
                    htmlFor="objectId">Object ID:</label>
                <input
                    type="text"
                    style={inputStyle}
                    id="objectId"
                    value={objectId}
                    onChange={(e) => setObjectId(e.target.value)}
                />
            </div>
            <div>
                <label
                    style={labelStyle}
                    htmlFor="serverUrl">Server URL:</label>
                <input
                    type="text"
                    style={inputStyle}
                    id="serverUrl"
                    value={serverUrl}
                    onChange={(e) => setServerUrl(e.target.value)}
                />
            </div>
            <button onClick={loadSpeckleData} style={buttonStyle}>Load Data</button>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerStyle}>Name</th>
                    <th style={headerStyle}>ID</th>
                    <th style={headerStyle}>Type</th>
                    {/* Add additional table headers for your data properties */}
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td style={cellStyle}>{item.name}</td>
                        <td style={cellStyle}>{item.id}</td>
                        <td style={cellStyle}>{item.type}</td>
                        {/* Add additional table cells for your data properties */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SpeckleLoader;

// Set style for the component labels, inputs
const labelStyle = {
    display: 'inline-block',
    width: '150px',
    textAlign: 'left',
}
const inputStyle = {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    boxSizing: 'border-box',
}


const buttonStyle = {
    backgroundColor: '#007bff', // Background color
    fontWeight: 'bold', // Make the text bold
    width: '100%', // Full width
    margin: '8px 0', // Add some space around the button
    color: '#fff', // Text color
    padding: '10px 20px', // Padding
    border: 'none', // Remove the border
    borderRadius: '4px', // Rounded corners
    cursor: 'pointer', // Add a pointer cursor on hover
};
const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid black',

};

const headerStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: '1px solid black',
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
};

const cellStyle = {
    padding: '10px',
    border: '1px solid black',
};