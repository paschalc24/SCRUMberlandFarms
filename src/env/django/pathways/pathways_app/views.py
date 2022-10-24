# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import employeeSerializer
from .models import employee

@api_view(["POST"])
def postEmployee(request, *args, **kwargs):
    serializer = employeeSerializer(data=request.data)
    if serializer.is_valid():
        instance = serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)
        

@api_view(["GET"])
def getEmployee(request, *args, **kwargs):
    employeeInstance = employee.objects.filter(firstName=request.data['firstName']).values()
    if employeeInstance:
        serializer = employeeSerializer(employeeInstance, many = True)
        return Response(serializer.data)