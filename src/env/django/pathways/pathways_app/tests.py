from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from rest_framework import status
from .serializers import employeeSerializer
from .models import employee
import json

# Create your tests here.
class EmployeeModelTest(APITestCase):
    testDataToSave = {"firstName": "testFirst", "lastName": "testLast", "email": "helo@gmail.com", "companyName": "UKG",
                "managerId": "1234", "positionTitle": "SWE", "startDate": "2023-11-29", "isManager": True, "password": "1234"}
    
    def test_create_employee(self):
        testData = {"firstName": "testFirst", "lastName": "testLast", "email": "HElo@gmail.com", "companyName": "UKG",
                "managerId": "1234", "positionTitle": "SWE", "startDate": "2023-11-29", "isManager": True, "password": "1234"}
        response = self.client.post('/employee/post/', testData)
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