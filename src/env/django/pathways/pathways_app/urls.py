from django.urls import path, re_path
from .views import index, error

urlpatterns = [
    # configured the url to call the corresponding endpoints methods
    path('', index),
    re_path(r'', error)
]
