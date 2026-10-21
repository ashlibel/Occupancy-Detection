# Room Occupancy Detection Project

*** note: time variable data type will be changed to datetime, but currently it is type int

1) clone git repo
2) install django, djangorestframework, and sqlite through conda-forge channel
3) activate server with "python manage.py runserver"
4) install to send http requests "pip install httpie"
5) send requests using format below


**GET request**
retrieve all room data or specific room data

http GET http://127.0.0.1:8000/rooms/ --unsorted

http GET http://127.0.0.1:8000/rooms/<room_id>/ --unsorted

*** Note: --unsorted tag ensures the output rows are sorted by room_id, sensor_id, occupied, and time. If tag is removed, will still return values but will be unsorted (PS: idk why the tag to sort is called unsorted)

*** Note: <> tells you what to replace it with. Ex. <room_id> can be replaced with the number 1, so the resulting statement is "http GET http://127.0.0.1:8000/rooms/1/ --unsorted"

**POST request**
add items to the database

http POST http://127.0.0.1:8000/rooms/ room_id=<int> sensor_id=<int> occupied=<bool> time=<int>

*** Note: I have not yet experimented with adding more than one at a time

**DELETE request**
delete a row from the database using room_id as the identifier

http DELETE http://127.0.0.1:8000/rooms/<room_id>/

*** Note: always remember the last "/" after room_id number. It will error if you forget

**PUT request**
replace info from a row with different info

http PUT http://127.0.0.1:8000/rooms/<room_id>/ room_id=<new_room_id> sensor_id=<new_sensor_id> occupied=<new_occupied_status> time=<new_time>

*** Note: can't just change one value at a time. All four values must be specified even if you want to just change one value like occupancy status or the time.









