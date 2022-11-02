from django.urls import path
from . import views

urlpatterns = [
    # configured the url to call the corresponding endpoints methods
    path('employee/get/', views.getEmployee),
    path('employee/post/', views.postEmployee),
    path('goals/delete/', views.deleteGoal),
    path('goals/post/', views.postGoal),
    path('goals/get/', views.getGoal),
    path('comments/post/', views.postComment),
    path('comments/get/', views.getComments),
    path('comments/delete', views.deleteComments)
]
