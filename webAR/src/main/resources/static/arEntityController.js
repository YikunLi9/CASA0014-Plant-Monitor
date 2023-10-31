AFRAME.registerComponent("mqttdisplay", {
    init: function () {
        client = mqtt.connect("wss://mqtt.cetools.org:8081", username="student",password="" );
        client.on("connect", () => {
            console.log("Connected");
            this.startMqtt(client); //if connected, subscribe to the topics
        });
        client.on("error", (error) => {
            console.log(error);
        });
        this.startMqtt(client);
    },
    startMqtt: function (client) {
        client.subscribe('student/CASA0014/plant/zczqy83/moisture');
        client.subscribe('student/CASA0014/plant/zczqy83/temperature');
        client.subscribe('student/CASA0014/plant/zczqy83/humidity');

        client.on('message', (topic, message) => {
            //Called each time a message is received
            console.log('Received message:', topic, message.toString());

            if (topic.includes('moisture')) {
                document.querySelector('#moisture').setAttribute('value', 'Moisture: ' + parseFloat(message.toString()).toFixed(2).toString() + '%');
            }

            if (topic.includes('temperature')) { //temperature
                document.querySelector('#temperature').setAttribute('value', 'Temperature: ' + parseFloat(message.toString()).toFixed(2).toString() + '°C');
            }

            if (topic.includes('humidity')) { //humidity
                document.querySelector('#humidity').setAttribute('value', 'Humidity: ' + parseFloat(message.toString()).toFixed(2).toString() + '%');
            }
        })
    },
});