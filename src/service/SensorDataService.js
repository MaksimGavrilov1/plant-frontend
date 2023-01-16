import secureGetFetch from './CustomFetch';


const COURSE_API_URL = ''
const SENSOR_API_URL = `${COURSE_API_URL}/data`

class SensorDataService {

    retrieveAllData() {
        console.log('executed service')
        return secureGetFetch(`${SENSOR_API_URL}`);
    }
}

export default new SensorDataService()