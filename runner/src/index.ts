import "./central.config"
import express from 'express';
import cors from 'cors';
import { db } from './central.config';
import { polyhook } from './types/polyhook';
import isURL from "./lib/isURL";

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const polyhooks = db.collection<polyhook.Polyhook>('polyhooks');

app.get("/:polyhookID", async (req, res) => {
    const polyhookID = req.params.polyhookID;
    try {
    const polyhook = await polyhooks.findOne({ polyhookID });
    if (!polyhook) {
        res.status(404).send('Polyhook not found');
        return;
    }
    const validURLs = polyhook.urls.filter(url => isURL(url) && !url.includes("runner.polyhook.me"));
    const promises = validURLs.map(async url => {
        try {
            const res = await fetch(url)
            const parsedHeaders: { [key: string]: any } = {};
            res.headers.forEach((value, key) => {
                parsedHeaders[key] = value;
            });
            const polyhookRes = {
                url,
                responce: await res.text(),
                headers: parsedHeaders,
                status: res.status,
            }
            return polyhookRes;
        } catch (error) {
            return null
        }
    });
    const results = await Promise.all(promises);
    const responded = results.filter(res => res !== null).map(res => res?.url || "");
    const responce = {
        expectedURLs: validURLs,
        responded,
        results: results.filter(res => res !== null),
    }
    res.send(responce);
    await polyhooks.updateOne({ polyhookID }, { $inc: { "analytics.runs": 1, "analytics.successful": 1 } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');   
        await polyhooks.updateOne({ polyhookID }, { $inc: { "analytics.runs": 1, "analytics.failed": 1 } });
    }
})

const port = process.env.NODE_ENV === 'prd' ? (process.env.PORT || (() => {
    console.error('PORT must be defined');
    return 3005;
})()) : 3005;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});