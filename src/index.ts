import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const API_SECRET = process.env.API_SECRET!;
const MEASUREMENT_ID = process.env.MEASUREMENT_ID!;

// GA4 Event ペイロード
const SAMPLE_EVENT_NAME = "purchase";
const SAMPLE_USER_ID = "TEST_USER_ID";
const SAMPLE_ITEM_ID = "SKU_1234";
const SAMPLE_ITEM_NAME = "subscription_monthly";
const SAMPLE_CURRENCY = "JPY";
const SAMPLE_TRANSACTION_ID = "ts_123456789";
const SAMPLE_VALUE = 3000;

app.get('/', async (req, res) => {
    const client_id = uuidv4();
    const timestamp_micros = (Date.now() * 1e3).toString();
    const payload = {
        "client_id": client_id,
        "user_id": SAMPLE_USER_ID,
        "timestamp_micros": timestamp_micros,
        "non_personalized_ads": false,
        "events": [
            {
                "name": SAMPLE_EVENT_NAME,
                "params": {
                    "items": [
                        {
                            "item_id": SAMPLE_ITEM_ID,
                            "item_name": SAMPLE_ITEM_NAME,
                            "quantity": 1
                        }
                    ],
                    "currency": SAMPLE_CURRENCY,
                    "transaction_id": SAMPLE_TRANSACTION_ID,
                    "value": SAMPLE_VALUE
                }
            }
        ]
    };
    console.log(`Event Payload: ${JSON.stringify(payload, null, 2)}`);    

    const url = `${GA_ENDPOINT}?api_secret=${API_SECRET}&measurement_id=${MEASUREMENT_ID}`;
    try {
        const response = await axios.post(url, payload);
        // Measurement Protocolが2xxのステータスコードを返してくるかを確認
        console.log(`Measurement Protocol Response Status: ${JSON.stringify(response.status, null, 2)}`);            
        if (response.status >= 200 && response.status < 300) {
            res.json({ "status": response.status });
        } else {
            res.status(500).json({ "error": "Unexpected status code from Measurement Protocol." });
        }
    } catch (error) {
        console.log(`Measurement Protocol Error: ${JSON.stringify(error, null, 2)}`);        
        if (axios.isAxiosError(error)) {
            res.json({ "status": error.response?.status || 500 });
        } else {
            res.json({ "status": 500 });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
