# CASA0014-Plant-Monitor

### Project Overview

Plant Monitor is an intelligent system designed to monitor plant environments, providing real-time insights into temperature, humidity, and soil moisture levels. The system integrates multiple key components, including the DHT22 temperature and humidity sensor, soil moisture sensor, and ESP8266 for Wi-Fi connectivity. It utilizes the MQTT protocol to upload data to an MQTT server. Additionally, the system includes a Raspberry Pi acting as a gateway, running a Spring Boot-based web service that supports WebAR. This allows users to view their plant's status in real-time via mobile devices.



<img src="diagrams/captured.PNG" alt="rendering" style="zoom:50%;" />



#### Key Features:

- Real-time monitoring of environmental temperature, humidity, and soil moisture for plants.
- Data uploading to an MQTT server through ESP8266's Wi-Fi connection.
- Raspberry Pi acts as a gateway, providing WebAR support for users to view plant status via mobile devices.
- Data publication and subscription using MQTT for real-time and reliable data transmission.



### Concept Sketches & System Design

<div style="display: flex; align-items: center">
    <div class="column" style="float:left;width:50%">
		<img src="diagrams/diagram.PNG" alt="diagram" />
    </div>
    <div class="column" style="float:right; width:75%">
        <b>Architecture Overview</b>
        <br>
    The Plant Monitor system is designed with a distributed architecture, consisting of multiple components that work together to monitor and visualize plant environmental data in real-time. The key components include ESP8266 sensors, an MQTT server, a Raspberry Pi acting as a gateway, and a WebAR webpage.
        <br><br>
        <b>Component Description</b>
        <ul>
            <li><b>ESP8266 and Sensors:</b>
                <br>
                <I>DHT22 Sensor:</I> This sensor is responsible for capturing temperature and humidity data from the plant environment.
                <br>
                <I>Soil Moisture Sensor:</I> It measures the soil's moisture content.</li>
            	<I>Communication:</I> ESP8266 devices are equipped with Wi-Fi capabilities to connect to the MQTT server and use MQTT protocol for data transmission.
            <li><b>MQTT Server</b>
            <br>
            <I>Role:</I> The MQTT server serves as a central hub for data exchange. It facilitates communication between ESP8266 sensors and the Raspberry Pi gateway.
            <br>
            <I>Data Handling:</I> The server receives and publishes sensor data to the appropriate topics, enabling real-time data distribution.</li>
            <li><b>Rasberry Pi</b>
            <br>
            <I>Role:</I> The Raspberry Pi serves as a gateway, hosting a Spring Boot-based web service and providing WebAR support.
            <br>
            <I>Web Service:</I> It offers WebAR features for users to visualize plant data on their mobile devices.
            <br>
            <I>User Access:</I> Users can access the WebAR interface through a web browser on their mobile devices.
                <br>
                <I>Communication:</I>Connect to the MQTT server and use SSL protocol for security data transmission.
            </li>
            <li><b>Security Considerations</b>
            <br>
            Communication between components is secured through encryption and authentication methods, includes using the TLS/SSL protocols.</li>
        </ul>
</div>

### Naming Conventions

The naming of functions and variables throughout the project uses the camel case.



### Process

In this section, I will describe the construction of the plant monitor

#### 1. Adafruit Huzzah ESP8266

As mentioned earlier, the ESP8266 is utilized to connect sensors and link to an MQTT server. The sketch showing its connections with the DHT22 and soil moisture sensor is as follows:


![sketch](diagrams/sketch.PNG)

In the ESP8266 setup for our project, I utilized the
```
ESP8266WiFi.h
```
library to establish WiFi connections.   This library offers an API that is straightforward and easy to understand.   In the code for the ESP8266 component of our project, I crafted a function named 
```
startWifi()
```
to manage the WiFi connection process.   By utilizing the SSID and password specified in the secret.h file, the ESP8266 can smoothly connect to the WiFi network.

This approach allowing ESP8266 to reliably transmit data from the sensors to the MQTT server or any other designated platform.   The use of a separate `secret.h` file for network credentials also enhances security, as it separates sensitive information from the main codebase.

Indeed, the 
```
PubSubClient.h
```
library is utilized for connecting to the MQTT server in our setup. Leveraging this library, I developed the
```
sendMQTT()
```
function, which is responsible for publishing data from sensors, such as environmental temperature, humidity, and soil moisture, to the MQTT server.

Additionally, when the ESP8266 receives a callback from the MQTT server, it invokes the
```
callback()
```
function to process this data. This function is also designed to control an LED, indicating the status of the data or connection through the LED's state (on or off).

In the event of a disconnection from the MQTT server, the 
```
reconnect()
```
function comes into play. This function attempts to re-establish the connection with the MQTT server to ensure continuous data transmission.

To maintain security, sensitive details regarding the MQTT server, such as the MQTT username and password, are securely stored in the `secret.h` file. This approach keeps critical information separate from the main codebase, enhancing the overall security of the system by preventing direct exposure of sensitive credentials in the primary application code.

Additionally, the ESP8266 is configured to read data from the sensors. For environmental data such as temperature and humidity, the ESP8266 utilizes the 
```
dht.h
```
library to read from the DHT22 sensor. This library facilitates the retrieval of accurate ambient data from the DHT22, which is crucial for monitoring environmental conditions affecting plant health.

Furthermore, the ESP8266 measures soil moisture by reading the resistance between two nails through an analog interface. This method involves measuring the electrical resistance, which varies depending on the moisture content of the soil. The lower the resistance, the higher the moisture content, as water conducts electricity more easily than dry soil. This setup provides a simple yet effective way to monitor soil moisture levels, which is a vital parameter for plant care.

Overall, the combination of these sensors and the ESP8266 creates a comprehensive monitoring system, capable of providing real-time insights into the environmental and soil conditions of plants, thus enabling better and more informed care.

#### 2. Raspberry Pi

Based on the content covered in the workshop, we can swiftly install InfluxDB, Telegraf, and Grafana.  These tools collectively create a powerful stack for data monitoring and visualization.  In this project, I also included a web-based frontend for WebAR and a basic implementation of a web backend using Spring Boot.

In this project, WebAR is implemented using AR.js, which is stored in 

```
webAR/src/main/resources/static
```

The functionality is controlled by a JavaScript file that manages the retrieval and display of data from the MQTT server.

For the Spring Boot service, it can be launched from the entry point located in 

```
webAR/src/main/java/com/yikunli9/webar/WebArApplication.java
```

Alternatively, the service can also be started using a pre-packaged JAR file that I have prepared.

### Challenges

In the process of implementing this project, I encountered several notable challenges. A primary one was ensuring secure data transmission, especially as we used webAR to access the camera and other sensors on users' devices. To achieve this, it was imperative to use the HTTPS protocol. My lack of prior experience with HTTPS led to a significant learning curve. I devoted substantial time to understanding SSL protocols and how they contribute to secure communications.

Moreover, the shift to HTTPS brought another complication: the inability to use the standard WebSocket protocol for data retrieval from the MQTT server. This hurdle prompted further exploration, culminating in the realization that the WSS (WebSocket Secure) protocol was essential for securely fetching MQTT data. These experiences highlighted the critical role of various protocols in maintaining privacy and security in web-based applications.

### Operational Notes

The code for the ESP8266 has been burned in and will run automatically after the device is powered up.

The springboot-based web service has been packaged as a jar package in the project directory in Raspberry Pi. To start the service, you need to type this command in terminal:

```linux
sudo java -jar webAR-0.0.1-SNAPSHOT.jar
```

