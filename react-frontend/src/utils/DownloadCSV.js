import React from 'react';
import { Button } from 'primereact/button';

const DownloadCSV = ({ data, fileName }) => {
    const convertToCSV = (objArray) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in array[i]) {
                if (line !== '') line += ',';
                if (typeof array[i][index] === 'object') convertToCSV(array[i][index]);
                else line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    };

    const downloadCSV = () => {
        const csvData = new Blob([convertToCSV(data)], { type: 'text/csv' });
        const csvURL = URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvURL;
        link.download = `${fileName}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return <Button onClick={downloadCSV} text label="Download CSV"></Button>;
};

export default DownloadCSV;
