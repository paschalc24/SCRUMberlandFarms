from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import employeeSerializer
from .models import employee

@api_view(["POST"])
def addEmployee(request, *args, **kwargs):
    serializer = employeeSerializer(data=request.data)
    if serializer.is_valid():
        instance = serializer.save()
        print(instance)
        return Response(serializer.data)
    else:
        return Response(serializer.errors)
        

@api_view(["GET"])
def getEmployee(request, *args, **kwargs):
    employeeInstance = employee.objects.all().order_by("?").first()
    data = {}
    if employeeInstance:
        data = employeeSerializer(employeeInstance).data
        return Response(data)