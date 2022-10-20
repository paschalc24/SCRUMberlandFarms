from django.urls import path
from . import views

urlpatterns = [
    # configured the url to call the corresponding endpoints methods
    path('employee/get/', views.getEmployee),
    path('employee/post/', views.postEmployee),

]
