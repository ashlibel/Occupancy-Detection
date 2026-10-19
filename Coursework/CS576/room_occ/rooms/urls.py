from django.urls import path
from rooms import views

urlpatterns = [
    path('rooms/', views.rooms_all),
    path('rooms/<int:room_id>/', views.room_info),
]