from django.urls.conf import path
from . import views

urlpatterns = [
    path('index/', views.index, name="index"),
]