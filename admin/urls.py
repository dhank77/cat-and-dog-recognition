from django.urls import path, include

urlpatterns = [
    path('', include("admin.dashboard.urls")),
    path('predict/', include("admin.predict.urls")),
    path('training/', include("admin.training.urls")),
]