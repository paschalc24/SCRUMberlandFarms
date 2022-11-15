# Create your views here.
from rest_framework.response import Response
from rest_framework import status
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
    # search for the employee with the provided goal id
    employeeInstances = employee.objects.filter(firstName=request.data['firstName']).values()
    # if the employee exists, return the relevant data with status code 200, otherwise return an error
    if employeeInstances:
        serializer = employeeSerializer(employeeInstances, many = True)
        return Response(serializer.data)
    else:
        return Response({"failure": "the employee you are looking for does not exist"}, status=status.HTTP_400_BAD_REQUEST)


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


   


