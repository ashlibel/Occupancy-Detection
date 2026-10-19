from rest_framework import serializers
from rooms.models import CurrentStatus

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentStatus
        fields = ["room_id", "sensor_id", "occupied", "time"]