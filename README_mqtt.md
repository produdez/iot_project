# io.adafruit.com
**TODO** if you haven't: 
- Create an account
- Create some feeds and name it like the docs for fureture testing (ex `bk-iot-soil`, `bk-iot-relay`, ...)
- Get your ada key

# MQTT

## Installation
`npm install mqtt`

## Import
```js
import mqtt from 'mqtt';
```

## Connect
```js
const options = {
    username: process.env.REACT_APP_ZYMETH_ADA_ID,
    password: process.env.REACT_APP_ZYMETH_ADA_KEY
};
const url = 'tcp://io.adafruit.com:443';
window.mqttClient = mqtt.connect(url, options);
```
Please change/add your ada_id and ada_key for your testing in file `.env.local`

You must use port 443 for our app (cannot connect through port 1883 like the docs, somehow)

I have declare a global variable `window.mqttClient` in `App.js`. Just use it everywhere.  
Or, if you like, create a new connection like above in `App.js` and name it `window.mqttClient<yourName>` or sth like that

## How to use

Try to `console.log()` anything you dont know what it is

```js
.on('event_string', function(arg1, arg2, ..., argN))
```
<br>

```js
.on('connect', function(connack))
```
Call when the app connect sucessfully to adafruit

<br>

```js
.on('message', function(topic, message))
```
`function(topic, message)` will be called when we get a data point from topics that we subscribed

Please declare it in `useEffect()` (React Hook) or `componentDidMount()` (React Class)

`message.toString()` is use to retrieve the value

<br>

```js
.publish(topic, message)
```
Topic is sth like this `<username>/feeds/<topic_key>`, for ex, `zymeth/feeds/bk-iot-relay`

Declare it in **handlers** (`onClick`, `onChange`, ...)

<br>

```js
.subscribe(topic, function(err, granted))
```
Subscribe to a topic (add a listener)

`function(err, granted)`: `err` is `null` if no error.

Please declare it in `useEffect()` (React Hook) or `componentDidMount()` (React Class)


