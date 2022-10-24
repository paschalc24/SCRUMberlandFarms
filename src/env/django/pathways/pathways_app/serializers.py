from rest_framework import serializers
import uuid

from .models import employee

class employeeSerializer(serializers.ModelSerializer):
    employeeId = serializers.CharField(default=uuid.uuid4())
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