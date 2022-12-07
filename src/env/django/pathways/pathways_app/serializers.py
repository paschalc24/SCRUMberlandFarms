from rest_framework import serializers

from .models import employee, goal, comment

class employeeSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField()
    lastName = serializers.CharField()
    email = serializers.CharField()
    companyName = serializers.CharField()
    managerId = serializers.CharField()
    positionTitle = serializers.CharField()
    startDate = serializers.DateField()
    isManager = serializers.BooleanField()
    password = serializers.CharField()
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
    companyName = serializers.CharField()
    goalId = serializers.CharField() 
    employeeId = serializers.CharField() 
    timestamp = serializers.CharField() 
    textField = serializers.CharField()
    class Meta:
        model = comment
        fields = '__all__'