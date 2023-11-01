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



### Operational Notes

The code for the ESP8266 has been burned in and will run automatically after the device is powered up.

The springboot-based web service has been packaged as a jar package in the project directory in Raspberry Pi. To start the service, you need to type this command in terminal:

```linux
sudo java -jar webAR-0.0.1-SNAPSHOT.jar
```

