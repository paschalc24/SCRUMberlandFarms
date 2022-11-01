# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import employeeSerializer, goalSerializer, commentSerializer
from .models import employee, goal, comment

#adds a new employee to the database
@api_view(["POST"])
def postEmployee(request, *args, **kwargs):
    serializer = employeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)
        
#return a employee json based on the "depends"
@api_view(["GET"])
def getEmployee(request, *args, **kwargs):
    employeeInstances = employee.objects.filter(firstName=request.data['firstName']).values()
    if employeeInstances:
        serializer = employeeSerializer(employeeInstances, many = True)
        return Response(serializer.data)

#delete a goal based on their goalId and return the rest of the goal in database as list of json
@api_view(["DELETE"])
def deleteGoal(request):
    goal.objects.filter(goalId=request.data['goalId']).delete()
    goalInstances = goal.objects.all()
    if goalInstances:
        serializer = goalSerializer(goalInstances, many = True)
        return Response(serializer.data)

#adds a goal to the database based on iput and return the goal if it is successfully added
@api_view(["POST"])
def postGoal(request):
    serializer = goalSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)
        
@api_view(["GET"])
def getGoal(request):
    goalInstances = goal.objects.filter(employeeId=request.data['employeeId']).values()
    if goalInstances:
        serializer = goalSerializer(goalInstances, many = True)
        return Response(serializer.data)   