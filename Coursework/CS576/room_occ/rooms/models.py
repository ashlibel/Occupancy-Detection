from django.db import models

class CurrentStatus(models.Model):
    room_id = models.IntegerField()
    sensor_id = models.IntegerField()
    occupied = models.BooleanField()
    time = models.IntegerField()