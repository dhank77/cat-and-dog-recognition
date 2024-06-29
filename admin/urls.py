from django.urls import path, include

urlpatterns = [
    path('', include("admin.dashboard.urls")),
]