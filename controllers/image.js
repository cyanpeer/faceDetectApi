const Clarifai = require('clarifai');

//Please apply your own API key from Clarifai
const app = new Clarifai.App({
    apiKey: 'd3baa8c3dc78459a8f622f2215e712ad'
   });

const handleApiCall = (req, res) => {   
app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL, 
        req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))   
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}