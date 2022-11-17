# Create your views here.
from urllib import response
from rest_framework.response import Response
from rest_framework import status
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
    try:
        serializer = employeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"status": "invalid"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"status": "invalid request"}, status=status.HTTP_400_BAD_REQUEST)
        
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
    try:
        emailReceived = request.GET.get('email', None)
        passwordReceived = request.GET.get('password', None)
        employeeInstances = employee.objects.filter(email=emailReceived).filter(password=passwordReceived).values()
        if employeeInstances:
            managedEmployees = []
            if employeeInstances[0]['isManager']:
                employeesToManage = employeeSerializer(employee.objects.filter(managerId=employeeInstances[0]['employeeId']).values(), many = True).data
                managedEmployees = parseEmployeeInfo(employeesToManage)
            employeeJson = [{"employeeProfile": parseEmployeeInfo(employeeInstances)[0], "employeesToManage": managedEmployees}] 
            return Response(employeeJson, status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["PUT"])
def updateEmployee(request):
    try:
        fields = [f.name for f in employee._meta.get_fields()]
        if (len([field for field in fields if field not in request.data])>0):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        employeeInstance = employee.objects.filter(employeeId=request.data['employeeId'])[0]
        serializer = employeeSerializer(employeeInstance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE"])
def deleteEmployee(request):
    try:
        if "employeeId" in request.data:
            employee.objects.filter(employeeId=request.data['employeeId']).delete()
            if len(employee.objects.filter(employeeId=request.data['employeeId'])) == 0:
                return Response({"status": "employee profile deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "employee could not be deleted"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status": "no employeeId provided"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"status": "error invalid request"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def getGoal(request, *args, **kwargs):
    # if there is no employee id specified, return a failed response
    if ('employeeId' not in request.data):
        return Response({"failure": "no employee id provided"}, status=status.HTTP_400_BAD_REQUEST)
    # get goal by employee id
    goalInstances = goal.objects.filter(employeeId=request.data['employeeId']).values()
    # if there are no goals, return a failed response, otherwise return the serialized data (no need to check success as data is retrieved from database)
    if goalInstances:
        serializer = goalSerializer(goalInstances, many = True)
        return Response({"success": serializer.data}, status=status.HTTP_200_OK)   
    else:
        return Response({"failure": "there are no goals associated with given employee"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def deleteGoal(request, *args, **kwargs):
    # if there is no goal id specified, return a failed response
    if ("goalId" not in request.data):
        return Response({"failure": "no goal id provided"}, status=status.HTTP_400_BAD_REQUEST)
    # grab the goal id provided by the client
    goalId = request.data["goalId"]
    # find the goal with the appropriate goal id and remove it from the database
    response = goal.objects.filter(goalId=goalId).delete()
    # find all comments which were associated with that goal
    relevant_comments = comment.objects.filter(goalId=goalId)
    # delete each relevant comment
    for relevant_comment in relevant_comments:
        relevant_comment.delete()
    # return response from the delete
    if (response[0]==1):
        return Response({"success": "the item was successfully deleted"}, status=status.HTTP_202_ACCEPTED)
    else:
        return Response({"failure": "there was an error with the deletion"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def postGoal(request, *args, **kwargs):
    # attempt to serialize the data provided
    serializedData = goalSerializer(data=request.data)
    # if the attempt is successful, save the data and return success, otherwise return a failed response
    if serializedData.is_valid():
        serializedData.save()
        return Response(serializedData.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def updateGoal(request, *args, **kwargs):
    # get the name of all fields of goal model (aside from goalid)
    fields = [f.name for f in goal._meta.get_fields()]
    if (len([field for field in fields if field not in request.data])>0):
        return Response({"failure": "incomplete goal"}, status=status.HTTP_400_BAD_REQUEST)
    # if all of the field are contained, try to find and modify the desired goal
    goalInstance = goal.objects.filter(goalId=request.data["goalId"])[0]
    # if the goal does not exist, return a failed response, otherise serialize the data and update the goal
    if (goalInstance):
        serializer = goalSerializer(goalInstance, data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response({"success": "goal updated successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"failure": "serializer failed"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def postComment(request):
    serializer = commentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": "comment posted succesfully"}, status=status.HTTP_201_CREATED)
    else:
        return Response({"failure": "serializer failed"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def getComments(request):
    if 'goalId' not in request.data:
        return Response({"failure": "missing goalId"}, status=status.HTTP_400_BAD_REQUEST)
    commentInstances = goal.objects.filter(goalId=request.data['goalId']).values()
    # sort the returned comments?
    if commentInstances:
        serializer = commentSerializer(commentInstances, many = True)
        return Response({"success": serializer.data}, status=status.HTTP_200_OK)
    else:
        return Response({"failure": "no comments associated with "}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def deleteComments(request):
    if 'commentId' not in request.data:
        return Response({"failure": "no commentId provided"}, status=status.HTTP_400_BAD_REQUEST)
    if len(comment.objects.filter(commentId=request.data['commentId'])) == 0:
        return Response({"failure": "no comment with that id"}, status=status.HTTP_400_BAD_REQUEST)
    response = comment.objects.filter(commentId=request.data['commentId']).delete()
    if response[0]:
        return Response({"success": "comment deleted"}, status=status.HTTP_200_OK)
    else:
        return Response({"failure": "deletion failed"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def updateComment(request):
    fields = [f.name for f in comment._meta.get_fields()]
    if len([field for field in fields if field not in request.data]) > 0:
        return Response({"failure": "incomplete comment"}, status=status.HTTP_400_BAD_REQUEST)
    commentInstance = comment.objects.filter(commentId=request.data['commentId'])[0]
    serializer = commentSerializer(commentInstance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": "comment updated"}, status=status.HTTP_200_OK)
    else:
        return Response({"failure": "update failed"}, status=status.HTTP_400_BAD_REQUEST)
