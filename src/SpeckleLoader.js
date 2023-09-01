import React, { useEffect } from 'react';
import ObjectLoader from '@speckle/objectloader';

function SpeckleLoader() {
    useEffect(() => {
        async function loadSpeckleData() {
            const serverUrl = 'https://latest.speckle.dev';
            const token = ''; // Add your token here
            const streamId = 'c581c30077';
            const objectId = 'd3687b35b2aa3987433900e38d026ba3';

            const loader = new ObjectLoader({
                serverUrl,
                token,
                streamId,
                objectId,
            });

            let total = null;
            let count = 0;

            for await (let obj of loader.getObjectIterator()) {
                if (!total) total = obj.totalChildrenCount;
                console.log(obj, `Progress: ${count++}/${total}`);
            }
        }

        loadSpeckleData();
    }, []);

    return (
        <div>
            {/* You can render your React components here */}
        </div>
    );
}

export default SpeckleLoader;
