# CASA0014-Plant-Monitor

### Project Overview

Plant Monitor is an intelligent system designed to monitor plant environments, providing real-time insights into temperature, humidity, and soil moisture levels. The system integrates multiple key components, including the DHT22 temperature and humidity sensor, soil moisture sensor, and ESP8266 for Wi-Fi connectivity. It utilizes the MQTT protocol to upload data to an MQTT server. Additionally, the system includes a Raspberry Pi acting as a gateway, running a Spring Boot-based web service that supports WebAR. This allows users to view their plant's status in real-time via mobile devices.



<img src="diagrams/captured.PNG" alt="rendering" style="zoom:25%;" />



#### Key Features:

- Real-time monitoring of environmental temperature, humidity, and soil moisture for plants.
- Data uploading to an MQTT server through ESP8266's Wi-Fi connection.
- Raspberry Pi acts as a gateway, providing WebAR support for users to view plant status via mobile devices.
- Data publication and subscription using MQTT for real-time and reliable data transmission.



### Concept Sketches

<div style="display: flex; align-items: center">
    <div class="column" style="float:left;width:25%">
		<img src="diagrams/diagram.PNG" alt="diagram" />
    </div>
    <div class="column" style="float:right; width:75%">
        1. ESP8266 Sensors:
		<br>
        <ul>
            <li>Using DHT22 temperature and humidity sensor and soil moisture sensor made of two nails for data monitoring.</li>
            <li>The DHT22 uses digital inputs and the soil moisture sensor uses analog inputs.</li>
            <li>The collected data is published to mqtt server every 15 seconds via wifi.</li>
        </ul>
        <br>
        2. Mqtt Server
       	<br>
        <ul>
            <li>Receive data and will forward it to the Raspberry Pi</li>
        </ul>
        <br>
        3. Rasbarry Pi
        <br>
        <ul>
            <li></li>
        </ul>
</div>

