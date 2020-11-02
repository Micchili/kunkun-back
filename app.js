const express = require('express');
const axios = require("axios").default
require('dotenv').config()
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/', (request, response) => {
    var faceData
    const subscriptionKey = process.env.API_KEY
    const endpoint = process.env.API_URL
    const imageUrl = 'https://www.pakutaso.com/shared/img/thumb/0I9A6766ISUMI_TP_V.jpg'

    axios({
        method: 'post',
        url: endpoint,
        params: {
            returnFaceAttributes: 'emotion'
        },
        data: {
            url: imageUrl,
        },
        headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then((res) => {
        res.data.forEach((face) => {
            faceData = JSON.stringify(face.faceAttributes.emotion)
            response.status(200).send(faceData)
        });
    }).catch((error) => {
        console.log(error)
    });
});