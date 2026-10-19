from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.template import loader
from rooms.models import CurrentStatus
from rooms.serializers import StatusSerializer


# def rooms(request):
#   rooms = CurrentStatus.objects.all().values()
#   template = loader.get_template('temp.html')
#   context = {
#     'rooms': rooms,
#   }
#   return HttpResponse(template.render(context, request))

@csrf_exempt
def rooms_all(request):
    if request.method == "GET":
        rooms = CurrentStatus.objects.all()
        serializer = StatusSerializer(rooms, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = StatusSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def room_info(request, room_id):
    try:
        room = CurrentStatus.objects.get(room_id=room_id)
    except CurrentStatus.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == "GET":
        serializer = StatusSerializer(room)
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        data = JSONParser().parse(request)
        serializer = StatusSerializer(room, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        room.delete()
        return HttpResponse(status=204)