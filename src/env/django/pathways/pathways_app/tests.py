from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from rest_framework import status
from .serializers import employeeSerializer, goalSerializer, commentSerializer
from .models import employee
import json

# Create your tests here.
class EmployeeModelTest(APITestCase):
    testDataToSave = {"firstName": "testFirst", "lastName": "testLast", "email": "HElo@gmail.com", "companyName": "UKG",
                "managerId": "1234", "positionTitle": "SWE", "startDate": "2023-11-29", "isManager": True, "password": "1234"}
    
    def test_create_employee(self):
        response = self.client.post('/employee/post/', self.testDataToSave)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_get_employee(self):
        serializer = employeeSerializer(data=self.testDataToSave)
        if serializer.is_valid():
            serializer.save()
        response = self.client.get('/employee/get/?email=HELo@gmail.com&password=1234')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_delete_employee(self):
        serializer = employeeSerializer(data=self.testDataToSave)
        if serializer.is_valid():
            serializer.save()
        response = self.client.get('/employee/get/?email=HELo@gmail.com&password=1234')
        employeeId = response.json()['success'][0]['employeeProfile']['employee']['employeeId']
        response = self.client.delete('/employee/delete/', {'employeeId': employeeId})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_update_employee(self):
        serializer = employeeSerializer(data=self.testDataToSave)
        if serializer.is_valid():
            serializer.save()
        response = self.client.get('/employee/get/?email=HELo@gmail.com&password=1234')
        employeeId = response.json()['success'][0]['employeeProfile']['employee']['employeeId']
        updatedData = {"firstName": "updateTestFirst", "lastName": "updateTestLast", "email": "helo@gmail.com", "companyName": "UKG",
                "managerId": "1234", "positionTitle": "SWE", "startDate": "2023-11-29", "isManager": True, "password": "1234", "employeeId": employeeId}
        response = self.client.put('/employee/update/', updatedData)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
class GoalModelTest(APITestCase):
    testGoalData = {"employeeId": "1234", "companyName": "UKG", "managerId": "2345", "title": "SWE",
                            "category": "personal", "startDate": "2022-12-06", "endDate": "2022-12-10", "status": "in-progress",
                                "textField": "hello test"}
    
    def test_create_goal(self):
        response = self.client.post('/goals/post/', self.testGoalData)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_goal(self):
        serializer = goalSerializer(data=self.testGoalData)
        if serializer.is_valid():
            serializer.save()
        response = self.client.get('/goals/get/?employeeId=1234')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_update_goal(self):
        serializer = goalSerializer(data=self.testGoalData)
        if serializer.is_valid():
            serializer.save()
        goalRetreived = self.client.get('/goals/get/?employeeId=1234').json()
        goalId = goalRetreived['success'][0]['goalId']
        creationDate = goalRetreived['success'][0]['creationDate']
        updatedTestGoalData = {"employeeId": "1234", "companyName": "UKG", "managerId": "2345", "title": "SWE",
                            "category": "personal", "startDate": "2022-12-06", "endDate": "2022-12-10", "status": "done",
                                "textField": "hello test updated", "goalId": goalId, "creationDate": creationDate}
        response = self.client.put('/goals/update/', updatedTestGoalData)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_delete_goal(self):
        serializer = goalSerializer(data=self.testGoalData)
        if serializer.is_valid():
            serializer.save()
        response = self.client.get('/goals/get/?employeeId=1234').json()
        goalId = response['success'][0]['goalId']
        response = self.client.delete('/goal/delete/', {'goalId': goalId})

class CommentModelTest(APITestCase):
    testCommentData = {"employeeId": "1234", "companyName": "UKG", "goalId": "12345", "textField": "hello test", "timestamp": "23456"}
    
    def test_create_comment(self):
        response = self.client.post('/comments/post/', self.testCommentData)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_comment(self):
        serializer = commentSerializer(data=self.testCommentData)
        if serializer.is_valid():
            serializer.save()
        response = self.client.get('/comments/get/?goalId=12345')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_update_comment(self):
        serializer = commentSerializer(data=self.testCommentData)
        if serializer.is_valid():
            serializer.save()
        goalRetreived = self.client.get('/comments/get/?goalId=12345').json()
        commentId = goalRetreived['success'][0]['commentId']
        updatedTestCommentData = {"employeeId": "1234", "companyName": "UKG", "goalId": "12345", "textField": "hello test updated", "timestamp": "23456",
                               "commentId": commentId}
        response = self.client.put('/comments/update/', updatedTestCommentData)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_delete_comment(self):
        serializer = commentSerializer(data=self.testCommentData)
        if serializer.is_valid():
            serializer.save()
        response = self.client.get('/comments/get/?goalId=12345').json()
        commentId = response['success'][0]['commentId']
        response = self.client.delete('/comments/delete/', {'commentId': commentId})