from email.policy import default
from tracemalloc import start
from rest_framework import serializers

from .models import employee

class employeeSerializer(serializers.ModelSerializer):
    employeeId = serializers.IntegerField(default="123")
    email = serializers.CharField(default="@gmail.com")
    companyName = serializers.CharField(default="inc")
    managerId = serializers.IntegerField(default="321")
    positionTitle = serializers.CharField(default="Employee")
    startDate = serializers.DateField(default="2023-02-22")
    isManager = serializers.BooleanField(default=False)
    password = serializers.CharField(default="password")
    class Meta:
        model = employee
        fields = [
            'firstName',
            'lastName',
            'employeeId',
            'email',
            'companyName',
            'managerId',
            'positionTitle',
            'startDate',
            'isManager',
            'password'
        ]