import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const db_username = process.env.MONGO_DB_USERNAME;
const db_password = process.env.MONGO_DB_PASSWORD;
const db_url = process.env.MONGO_DB_URL;

const uri = `mongodb+srv://${db_username}:${db_password}@${db_url}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const app = express();
app.use(cors());

app.set('port', process.env.PORT || 3000);

app.get('/findOneAirbnb', async (req, res) => {
    try {        const database = client.db('sample_airbnb');
        const airbnb_database = database.collection('listingsAndReviews');
        for (const key in req.query) {
            if (key === "bedrooms" || key === "beds") {
                req.query[key] = parseInt(req.query[key])
            } else if (req.query[key] == null) {
                delete req.query[key]
            }
        }
        const filter = req.query;
        const projection = { "listing_url": 1, "name": 1, "summary": 1, "property_type" : 1, "bedrooms": 1, "beds": 1 };
        const airbnb = await airbnb_database.findOne(filter, { projection: projection });
        res.type('json');
        res.status(200);
        res.json({
            airbnb: airbnb
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/findOneRestaurant', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('sample_restaurants');
        const restaurant_database = database.collection('restaurants');
        const filter = { name: req.query.name };
        const restaurant = await restaurant_database.findOne(filter);
        res.type('json');
        res.status(200);
        res.json({
            restaurant: restaurant
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/findOneMovie', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('sample_mflix');
        const movie_database = database.collection('movies');
        const filter = { title: req.query.title };
        const movie = await movie_database.findOne(filter);
        res.type('json');
        res.status(200);
        res.json({
            movie: movie
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});
