import {conn} from './api';

const getSightings = () => {
    return new Promise(async (resolve,reject) => {
        await conn.get('/ufos/sightings/year/').then((res) => {
            console.log('RESULT', res);
            return resolve(res);
        }).catch((err) => {
            console.log('Error', err);
            return reject(err);
        });
    });
}

export {getSightings};