from django.urls import path
from .views import index

urlpatterns = [
    # configured the url to call the corresponding endpoints methods
    path('', index),
]
