import client from './restClient';
const DownloadService = async (serviceName) => {
    const data = await client.service(serviceName).find({ query: { $limit: 10000, $sort: { createdAt: 1 } } });
    const json = JSON.stringify(data.data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    return blob;
};

export { DownloadService };
