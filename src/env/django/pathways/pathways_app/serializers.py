from email.policy import default
from rest_framework import serializers
import uuid

from .models import employee, goal, comment

class employeeSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField()
    lastName = serializers.CharField()
    email = serializers.CharField(default="@gmail.com")
    companyName = serializers.CharField(default="inc")
    managerId = serializers.IntegerField(default="321")
    positionTitle = serializers.CharField(default="Employee")
    startDate = serializers.DateField(default="2023-02-22")
    isManager = serializers.BooleanField(default=False)
    password = serializers.CharField(default="password")
    class Meta:
        model = employee
        fields = '__all__'
        
class goalSerializer(serializers.ModelSerializer):
    employeeId = serializers.CharField()
    companyName = serializers.CharField()
    managerId = serializers.CharField()
    title = serializers.CharField()
    category = serializers.CharField()
    startDate = serializers.DateField()
    endDate = serializers.DateField()
    status = serializers.CharField()
    textField = serializers.CharField()
    class Meta:
        model = goal
        fields = '__all__'

class commentSerializer(serializers.ModelSerializer):
    commentId = serializers.UUIDField()
    companyName = serializers.CharField()
    goalId = serializers.CharField() 
    employeeId = serializers.CharField() 
    timstamp = serializers.CharField() 
    textField = serializers.CharField()
    class Meta:
        model = comment
        fields = '__all__'