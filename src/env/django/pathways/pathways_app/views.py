# Create your views here.
from urllib import response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import employeeSerializer, goalSerializer, commentSerializer
from .models import employee, goal, comment

@api_view(["GET"])
def getManager(request):
    try:
        managerIdReceived = request.GET.get('managerId', None)
        if managerIdReceived == None or len(managerIdReceived) == 0:
            return Response({"status": "invalid"}, status=status.HTTP_400_BAD_REQUEST)
        employeeInstance = employee.objects.filter(employeeId=managerIdReceived).values()[0]
        if employeeInstance:
            serializer = employeeSerializer(employeeInstance);
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"status": "invalid"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"status": "invalid"}, status=status.HTTP_400_BAD_REQUEST)

#adds a new employee to the database
@api_view(["POST"])
def postEmployee(request):
    serializer = employeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"status": "invalid"}, status=status.HTTP_400_BAD_REQUEST)
        
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
    emailReceived = request.GET.get('email', None)
    passwordReceived = request.GET.get('password', None)
    employeeInstances = employee.objects.filter(email=emailReceived).filter(password=passwordReceived).values()
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

@api_view(["POST"])
def postComment(request):
    serializer = commentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

@api_view(["GET"])
def getComments(request):
    commentInstances = goal.objects.filter(goalId=request.data['goalId']).values()
    # sort the returned comments?
    if commentInstances:
        serializer = commentSerializer(commentInstances, many = True)
        return Response(serializer.data)

@api_view(["DELETE"])
def deleteComments(request):
    comment.objects.filter(commentId=request.data['commentId']).delete()
    commentInstances = comment.objects.all()
    if commentInstances:
        serializer = commentSerializer(commentInstances, many = True)
        return Response(serializer.data)

@api_view(["UPDATE"])
def updateComment(request):
    commentInstance = goal.objects.filter(goalId=request.data['goalId'])[0]
    serializer = commentSerializer(commentInstance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)