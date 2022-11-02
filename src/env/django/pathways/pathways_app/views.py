# Create your views here.
from urllib import response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import employeeSerializer, goalSerializer, commentSerializer
from .models import employee, goal, comment

#adds a new employee to the database
@api_view(["POST"])
def postEmployee(request):
    serializer = employeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# given list of employee return a dictionary of employee and goal
def parseEmployeeInfo(employeeInfos):
    employeeProfiles = []
    for employeeInstance in employeeInfos:
        serializerGoal = goalSerializer(goal.objects.filter(employeeId=employeeInstance['employeeId']).values(), many = True).data
        goalData = []
        for goals in serializerGoal:
            commentsWithGoalId = commentSerializer(comment.objects.filter(goalId=goals['goalId']).values(), many = True).data
            goalData.append({"goal": goals, "comments": commentsWithGoalId})
        employeeProfiles.append({"employee": employeeInstance, "goals": goalData})
    return employeeProfiles
        
#return a employee when given email
@api_view(["GET"])
def getEmployee(request):
    employeeInstances = employee.objects.filter(email=request.data['email']).filter(password=request.data['password']).values()
    if employeeInstances:
        managedEmployees = []
        if employeeInstances[0]['isManager']:
            employeesToManage = employeeSerializer(employee.objects.filter(managerId=employeeInstances[0]['employeeId']).values(), many = True).data
            managedEmployees = parseEmployeeInfo(employeesToManage)
        employeeJson = [{"employeeProfile": parseEmployeeInfo(employeeInstances)[0], "employeesToManage": managedEmployees}] 
        return Response(employeeJson)
    else:
        return Response([], status=status.HTTP_404_NOT_FOUND)
    
@api_view(["PUT"])
def updateEmployee(request):
    #todo add check for if all parameter is present
    employeeInstance = employee.objects.filter(employeeId=request.data['employeeId'])[0]
    serializer = employeeSerializer(employeeInstance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(["DELETE"])
def deleteEmployee(request):
    if "employeeId" in request.data:
        employee.objects.filter(employeeId=request.data['employeeId']).delete()
        if len(employee.objects.filter(employeeId=request.data['employeeId'])) == 0:
            return Response({"status": "employee profile deleted"}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"status": "employee could not be deleted"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"status": "no employeeId provided"}, status=status.HTTP_400_BAD_REQUEST)

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