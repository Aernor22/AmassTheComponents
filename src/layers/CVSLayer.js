import RNFS from 'react-native-fs';
import {ToastAndroid} from 'react-native';
import Share from 'react-native-share';

export function buildAndWrite(list) {
    console.log("onBUild");
    const path = RNFS.DocumentDirectoryPath + '/collection.csv';
    const values = [];

    list.map(obj => {
        values.push([obj.quantity,(obj.name).replace(/,/g,"")]);
    });

    // construct csvString
    const headerString = 'Quantity,Card Name\n';
    const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
    const csvString = `${headerString}${rowString}`;

    RNFS.writeFile(path, csvString, 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
            console.log(path);
            ToastAndroid.show('Exported to '+path, ToastAndroid.SHORT);
        })
        .catch((err) => {
            console.log("on Error");
            console.log(err.message);
            ToastAndroid.show('Failed to export :c', ToastAndroid.SHORT);
        });
};

export function shareAndDelete(list) {
    const path = RNFS.DocumentDirectoryPath + '/collection.csv';
    const values = [];

    list.map(obj => {
        values.push([obj.quantity,(obj.name).replace(/,/g,"")]);
    });

    // construct csvString
    const headerString = 'Quantity,Card Name\n';
    const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
    const csvString = `${headerString}${rowString}`;

    RNFS.writeFile(path, csvString, 'utf8');

    Share.open({
        url: "file://"+ path,
    });    

    RNFS.unlink(filePath);
};
