var chance = require('chance').Chance();
const axios = require('axios').default;

function makeGetRequestToCelebrityAPI() {
    return axios({
        method: 'get',
        url: `https://api.api-ninjas.com/v1/celebrity?max_net_worth=${chance.integer({min:1000000, max:10000000})}`,
        headers: {
            'X-Api-Key': 'pRezGMV0EnJvAljZWBmddw==Uhc1E9VjWDqjOoID',
            'min_height': 1.9
        },
    }).then(response => {
        return response.data;
    }).catch(err => console.log(err));
}

function findTheHeightsOf2Celbrities(height) {
    makeGetRequestToCelebrityAPI().then(data => {
        let stringDataValues = JSON.stringify(data);
        let desiredValues = JSON.parse(stringDataValues);
        let celebrity1;
        let celebrity2;
        while (true) {
            let celeb1Temp = desiredValues[Math.floor(Math.random() * desiredValues.length)];
            let celeb2Temp = desiredValues[Math.floor(Math.random() * desiredValues.length)];
            if (celeb1Temp.hasOwnProperty('height') && celeb2Temp.hasOwnProperty('height')) {
                celebrity1 = celeb1Temp;
                celebrity2 = celeb2Temp;
                break;
            }
        }
        let remainingHeight = height - celebrity1['height'];
        let numberOfCeleb2 = (remainingHeight / celebrity2['height']).toFixed(2);
        console.log(convertCelebrityInformationIntoString(celebrity1, celebrity2, numberOfCeleb2));
    });
}

function convertCelebrityInformationIntoString(celebrity1, celebrity2, numberOfCeleb2) {
    return `The height provided is equivilent to 1 ${celebrity1['name']} (${celebrity1['height']}m) and ${numberOfCeleb2} ${celebrity2['name']}'s (${celebrity2['height']}m)`;
}

findTheHeightsOf2Celbrities(20.0);