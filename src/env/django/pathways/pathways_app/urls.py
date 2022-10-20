from django.urls import path
from . import views

urlpatterns = [
    # configured the url to call the corresponding endpoints methods
    path('employee/', views.getEmployee),
    path('employee/', views.postEmployee),

]
