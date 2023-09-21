# GA4 Event Sender from Server

This repository provides a sample implementation for sending events to Google Analytics 4 (GA4) from the server side.

It utilizes 
- Node.js
- Express
- axios
- dotenv

## Prerequisites

- Node.js
- npm

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/BostonTerrier-Bon/ga4-event-sender.git
   cd ga4-event-sender
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file at the root of the project and set the required API keys:

   ```
   API_SECRET=your_api_secret_value
   MEASUREMENT_ID=your_measurement_id_value
   ```

## GA4 Event to Send

This implementation offers a sample for sending a `purchase` event to GA4. This event is typically used to track user purchase actions.

### Payload Details:

By default, a purchase event (`purchase`) is being sent. You can also send custom events beyond the default ones.

Details on possible events:
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events)

Parameters:
- **client_id**:
    - Unique client ID
- **user_id**: 
    - User identifier
    - UTF8
    - Less than 256 characters
- **timestamp_micros**:
    - Unix timestamp of the event occurrence (in microseconds)
- **non_personalized_ads**:
    - Flag to control the display of non-personalized ads (set to `false` in this sample)
- **events**: List of events
    - **name**: Event name
    - **params**: Event parameters
    - **items**: Purchased items
        - **item_id**: Unique ID of the item
        - **item_name**: Item name
        - **quantity**: Quantity of the purchased item
    - **currency**: Transaction currency code
    - **transaction_id**:
        - ID to uniquely identify the transaction
        - Avoid duplicate purchase events
    - **value**: Transaction amount (set to `3000` in this sample)

⚠️ When using in real scenarios, replace these sample values with actual data.

## Usage

Build & Start the server:

```bash
npm run dev
```

Using a browser or testing tool, send a GET request to the following URL:

```
http://localhost:3000
```

## Notes

- This sample is designed for basic demonstration purposes. For actual production use, consider implementing proper error handling and security measures.
- Regardless of the content or outcome of the payload, the GA4 Measurement Protocol returns a 2xx response. Therefore, it doesn't guarantee the accuracy of the sent event or its measurement.

## Related Links

- [Measurement Protocol Reference](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag)
