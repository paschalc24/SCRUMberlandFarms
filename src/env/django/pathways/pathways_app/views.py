# Create your views here.
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import employeeSerializer, goalSerializer, commentSerializer
from .models import employee, goal, comment
import json

#given a managerId return the employee
@api_view(["GET"])
def getManager(request):
    try:
        #retreives the managerId from the params
        managerIdReceived = request.GET.get('managerId', None)
        #check if the managerId is valid
        if managerIdReceived == None or len(managerIdReceived) == 0:
            return Response({"failure": "missing managerId or no input"}, status=status.HTTP_400_BAD_REQUEST)
        employeeInstance = employee.objects.filter(employeeId=managerIdReceived).values()[0]
        #if employee exists then pass it back to frontend
        if employeeInstance:
            serializer = employeeSerializer(employeeInstance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"failure": "no matching manager found"}, status=status.HTTP_400_BAD_REQUEST)
    #catch any execeptions
    except:
        return Response({"status": "invalid request"}, status=status.HTTP_400_BAD_REQUEST)

#adds a new employee to the database
@api_view(["POST"])
def postEmployee(request):
    try:
        #create a mutable copy of the body input
        jsonReceived = request.POST.copy()
        #change the email to lowercase
        jsonReceived['email'] = jsonReceived['email'].lower()
        #check if the email exists in the database and if it does return an error
        employeeInstance = employee.objects.filter(email__iexact=jsonReceived['email']).filter(password=jsonReceived['password']).values()
        if len(employeeInstance) > 0:
            return Response({"failure": "email already exist"}, status=status.HTTP_400_BAD_REQUEST)
        #check if all required fields are passed in
        serializer = employeeSerializer(data=jsonReceived)
        #if valid create the employee
        if serializer.is_valid():
            serializer.save()
            return Response({"success": serializer.data}, status=status.HTTP_200_OK)
        #otherwise return the missing fields
        else:
            return Response({"failure": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    #catch any exceptions
    except:
        return Response({"failure": "invalid Request"}, status=status.HTTP_400_BAD_REQUEST)
        
# given list of employee return a dictionary of employee and goal
def parseEmployeeInfo(employeeInfos):
    employeeProfiles = []
    for employeeInstance in employeeInfos:
        serializerGoal = goalSerializer(goal.objects.filter(employeeId=employeeInstance['employeeId']).values(), many=True).data
        goalData = []
        for goals in serializerGoal:
            commentsWithGoalId = commentSerializer(comment.objects.filter(goalId=goals['goalId']).values(), many=True).data
            goalData.append({"goal": goals, "comments": commentsWithGoalId})
        employeeProfiles.append({"employee": employeeInstance, "goals": goalData})
    return employeeProfiles
        
#return a employee when given email and password
@api_view(["GET"])
def getEmployee(request):
    try:
        #get the email from the params
        emailReceived = request.GET.get('email', None)
        #get the password from the params
        passwordReceived = request.GET.get('password', None)
        #check if email or password is not passed in
        if emailReceived is None or passwordReceived is None:
            return Response({"failure": "missing email or password"}, status=status.HTTP_400_BAD_REQUEST)
        #find the employee given password and email
        #lowercase the email might break the current datebase
        #todo filter employee object by lower case
        employeeInstances = employee.objects.filter(email__iexact=emailReceived.lower()).filter(password=passwordReceived).values()
        if employeeInstances:
            managedEmployees = []
            if employeeInstances[0]['isManager']:
                employeesToManage = employeeSerializer(employee.objects.filter(managerId=employeeInstances[0]['employeeId']).values(), many=True).data
                managedEmployees = parseEmployeeInfo(employeesToManage)
            employeeJson = [{"employeeProfile": parseEmployeeInfo(employeeInstances)[0], "employeesToManage": managedEmployees}] 
            return Response({"success": employeeJson}, status=status.HTTP_200_OK)
        else:
            return Response({"failure": "no employee with provided email and password"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"failure": "invalid input or missing fields"}, status=status.HTTP_400_BAD_REQUEST)

#update employee given required fields
@api_view(["PUT"])
def updateEmployee(request):
    try:
        fields = [f.name for f in employee._meta.get_fields()]
        missingFields = [field for field in fields if field not in request.data]
        #check if any fields are missing
        if (len(missingFields) > 0):
            return Response({"failure": "incomplete employee", "missing fields": missingFields}, status=status.HTTP_400_BAD_REQUEST)
        employeeInstance = employee.objects.filter(employeeId=request.data['employeeId'])[0]
        #create a mutable copy of the body input
        jsonReceived = request.POST.copy()
        #change the email to lowercase
        jsonReceived['email'] = jsonReceived['email'].lower()
        serializer = employeeSerializer(employeeInstance, data=jsonReceived)
        #verify all required fileds are passed in
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "employee updated"}, status=status.HTTP_200_OK)
        else:
            return Response({"failure": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"failure": "update failed"}, status=status.HTTP_400_BAD_REQUEST)

#delete employee given a employeeId
@api_view(["DELETE"])
def deleteEmployee(request):
    try:
        if "employeeId" in request.data:
            if len(employee.objects.filter(employeeId=request.data['employeeId'])) == 0:
                return Response({"failure": "unknown employeeId"}, status=status.HTTP_400_BAD_REQUEST)
            employee.objects.filter(employeeId=request.data['employeeId']).delete()
            if len(employee.objects.filter(employeeId=request.data['employeeId'])) == 0:
                return Response({"success": "employee profile deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({"failure": "employee could not be deleted"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"failure": "no employeeId provided"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"failure": "error invalid request"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def getGoal(request):
    # get goal by employee id
    employeeIdReceived = request.GET.get('employeeId', None)
    if employeeIdReceived == None or len(employeeIdReceived) == 0:
        return Response({"failure": "invalid employeeId or no employeeId provided"}, status=status.HTTP_400_BAD_REQUEST)
    goalInstances = goal.objects.filter(employeeId=employeeIdReceived).values()
    # if there are no goals, return a failed response, otherwise return the serialized data (no need to check success as data is retrieved from database)
    if goalInstances:
        serializer = goalSerializer(goalInstances, many=True)
        return Response({"success": serializer.data}, status=status.HTTP_200_OK)
    else:
        return Response({"failure": "there are no goals associated with given employee"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def deleteGoal(request):
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
        return Response({"success": "the item was successfully deleted"}, status=status.HTTP_200_OK)
    else:
        return Response({"failure": "there was an error with the deletion"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def postGoal(request):
    # attempt to serialize the data provided
    serializedData = goalSerializer(data=request.data)
    # if the attempt is successful, save the data and return success, otherwise return a failed response
    if serializedData.is_valid():
        serializedData.save()
        return Response({"success": serializedData.data}, status=status.HTTP_200_OK)
    else:
        return Response({"failure": serializedData.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def updateGoal(request):
    # get the name of all fields of goal model (aside from goalid)
    fields = [f.name for f in goal._meta.get_fields()]
    missingFields = [field for field in fields if field not in request.data]
    if (len(missingFields) > 0):
        return Response({"failure": "incomplete goal", "missing fields": missingFields}, status=status.HTTP_400_BAD_REQUEST)
    # if all of the field are contained, try to find and modify the desired goal
    goalInstance = goal.objects.filter(goalId=request.data["goalId"])[0]
    # if the goal does not exist, return a failed response, otherise serialize the data and update the goal
    if (goalInstance):
        serializer = goalSerializer(goalInstance, data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response({"success": "goal updated successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"failure": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def postComment(request):
    serializer = commentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": serializer.data}, status=status.HTTP_200_OK)
    else:
        return Response({"failure": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def getComments(request):
    goalIdReceived = request.GET.get('goalId', None)
    if goalIdReceived == None or len(goalIdReceived) == 0:
        return Response({"failure": "no goalId received or invalid goalId"})
    commentInstances = comment.objects.filter(goalId=goalIdReceived).values()
    # sort the returned comments?
    if commentInstances:
        serializer = commentSerializer(commentInstances, many=True)
        return Response({"success": serializer.data}, status=status.HTTP_200_OK)
    else:
        return Response({"failure": "no comments associated with given id"}, status=status.HTTP_400_BAD_REQUEST)

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
    missingFields = [field for field in fields if field not in request.data]
    if (len(missingFields) > 0):
        return Response({"failure": "incomplete comment", "missing fields": missingFields}, status=status.HTTP_400_BAD_REQUEST)
    commentInstance = comment.objects.filter(commentId=request.data['commentId'])[0]
    if commentInstance:
        serializer = commentSerializer(commentInstance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "comment updated"}, status=status.HTTP_200_OK)
        else:
            return Response({"failure": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
