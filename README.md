# Room Occupancy Detection Project

*** note: time variable data type will be changed to datetime, but currently it is type int

## Initial Setup
1) Clone repo: `git clone <repo-url>`
2) Go into project directory: `cd Occupancy-Detection`
3) Go to backend branch: `git checkout backend`
4) Go to main folder: `cd room_occ`
5) Make virtual environment: `python3 -m venv venv`
6) Activate venv: `source venv/bin/activate`
7) Install dependencies: `pip install -r requirements.txt`
8) `python manage.py migrate`
9) Run server: `python manage.py runserver 0.0.0.0:8000`

## Basic workflow
1) Go to project directory: `cd Occupancy-Detection`
2) Go to backend branch: `git checkout backend`
3) Get latest version: `git pull`
4) Go to main folder: `cd room_occ`
5) Activate venv: `source venv/bin/activate`
6) Install any new dependencies if needed: `pip install -r requirements.txt`
7) If needed: `python manage.py migrate`
8) Run server: `python manage.py runserver 0.0.0.0:8000`

## Request Formats
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









