# Room Occupancy Detection Project

OCCUPANCY NODE (ESP32 + LD2410 mmWave sensor)

## BEFORE YOU UPLOAD - CHECKLIST

1. Software
   - Install the Arduino IDE.
   - Add ESP32 support: Boards Manager > search "esp32" > install the one by
     "Espressif Systems".
   - Install the library: Tools > Manage Libraries > search "ld2410" > install
     the one by "ncmreynolds".

2. Fill in secrets.h (on your own computer only)
   - WIFI_SSID      your Wi-Fi name, spelled EXACTLY (capitals, spaces, apostrophes)
   - WIFI_PASSWORD  your Wi-Fi password
   - SERVER_IP      the IP of the computer running the backend
      - (Mac: run  ipconfig getifaddr en0  in a terminal)
   - The Wi-Fi must be 2.4 GHz (the ESP32 does not support 5 GHz).
     - iPhone hotspot: turn on "Maximize Compatibility" and keep the hotspot screen open while the ESP32 connects.
   - The ESP32 and the backend computer must be on the SAME network.

3. Set the room numbers in occupancy_node.ino (top of the file)
   - const int ROOM_ID = 418;
   - const int SENSOR_ID = 1;
      - Use 1, 2 or 3 - a different number for each board. You can check how many pieces of washing tape is on the wires.
   - Note: We should set SENSOR_ID 1 to ROOM_ID 418, SENSOR_ID 2 to ROOM_ID 420, and SENSOR_ID 3 to ROOM_ID 422


## UPLOADING - CHECK THE BOARD AND PORT

1. Plug the ESP32 into your computer with a USB DATA cable.
   - Some cables are charge-only and will not work. If no port appears in step 3, try a different cable.

2. Tools > Board > esp32 > "ESP32 Dev Module"
   - Make sure it does NOT say S2, S3, C3 or "Nano ESP32". Those are different chips and the upload will fail with a "wrong chip" or "dfu-util" error.

3. Tools > Port > pick the USB port
   - Mac:      /dev/cu.usbserial-XXXX   (ignore "debug-console" and "Bluetooth")
   - Windows:  COM3, COM4, etc.
   - If no port appears: unplug and replug the cable, or install the USB driver for your board (CP2102 or CH340 chip). 
   - The port name can change each time you plug in a different board, so check it every time.

4. Click Upload (the right-arrow button).
   - If the output hangs on "Connecting........", HOLD the BOOT button on the board until it starts writing.

5. When you see  "Hard resetting via RTS pin..."  the upload worked.
   - If you get a "port busy" error, close the Serial Monitor and try again.


## CHECK THAT IT WORKS

1. Open the Serial Monitor (magnifying glass icon) and set the baud rate to 115200 (A few garbled characters right after a reset are normal)

2. You should see:
- LD2410 connected.
- Found __ networks: 
   - List of available 2.4GHz networks
- Connecting to Wi-Fi....
- Connected. ESP32 IP: 172.20.10.x
- seen=1 | moving=0 (80 cm) | still=1 (80 cm)
- PUT http://<server-ip>:8000/rooms/420/ -> 200 {...}
   - Note: A "200" means the backend received and saved the status.

3. Reading the debug lines:
- seen=1    the sensor detects someone (moving or still), room = occupied
- seen=0    nothing detected; after VACANT_TIMEOUT_MS the room = vacant
- moving=   1 if a moving target is detected, with its distance in cm
- still=    1 if a still target is detected, with its distance in cm

4. On the backend computer, the server terminal should print lines like:
   - "PUT /rooms/420/ HTTP/1.1" 200
   - `curl http://localhost:8000/rooms/` should show the room's "occupied" value and a recent "time".


## BACKEND REQUIREMENTS

- Run the backend with:  python manage.py runserver 0.0.0.0:8000
- ALLOWED_HOSTS in settings.py must allow the server's IP
  (['*'] is fine for local testing only).
- Allow incoming connections if macOS asks about Python.


## TROUBLESHOOTING

"Wi-Fi failed"
- Check the name/password spelling
- Check if wifi is 2.4GHz
- On the ESP32, press the 'EN' button and check the serial monitor to get a list of 2.4GHz networks
- Campus/enterprise Wi-Fi (like eduroam) usually does not work; use a phone hotspot or home Wi-Fi.

WiFi Connected, but connection refused
- iPhone hotspot note: some Macs get an address like 192.0.0.2 from an iPhone hotspot while the ESP32 gets 172.20.10.x. They can't reach each other, use a different WiFi network.
- Press the 'EN' button and in the serial monitor, look for 'Connected. ESP32 IP: ...'
- Make sure the first three octets of the ESP32's IP matches your Server IP in secrets.h
- If it doesn't, the ESP32 & backend are on different networks, make sure they are on the same network

Connected, but the PUT shows a negative error or times out
- The ESP32 and the backend computer are on different networks, the backend is not running, or SERVER_IP is out of date (it changes when you switch networks)
- Re-check it with: ipconfig getifaddr en0

PUT returns 400
- ALLOWED_HOSTS does not include the server's IP.

"LD2410 not found"
 -Check the wiring: sensor power on VIN/5V, TX/RX crossed, firm connections.

Room always says occupied (seen=1)
- The sensor sees something. Point it at empty space, leave its range, and read the distance numbers
- A constant distance means a fixed object.

How a room becomes vacant
- After VACANT_TIMEOUT_MS (10000 = 10 s for testing; use 120000 for real rooms) with nothing detected, the room is marked vacant.

