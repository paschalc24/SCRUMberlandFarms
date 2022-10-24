from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.
class employee(models.Model):
    firstName = models.CharField(max_length = 200) # first name of employee
    lastName = models.CharField(max_length = 200) # last name of employee
    employeeId = models.CharField(max_length = 500) # identifier of the employee to retrieve goals
    email = models.CharField(max_length = 500) # email of employee
    companyName = models.CharField(max_length = 500)
    managerId = models.CharField(max_length = 500)
    positionTitle = models.CharField(max_length = 500)
    startDate = models.DateField()
    isManager = models.BooleanField() # bool value if employee is a manager
    password = models.CharField(max_length = 200)

class goal(models.Model):
    employeeId = models.CharField(max_length = 500) # identify goals to employee or with companyName as composite key
    companyName = models.CharField(max_length = 500) # could be used as part of identifier to employee
    goalId = models.CharField(max_length = 500) # use this as the unique key or with companyName as a composite key to identify comments to goals
    managerId = models.CharField(max_length = 500) # use to retrieve employee goals for managers
    title = models.CharField(max_length = 500) # data for frontend
    category = models.CharField(max_length = 500) #data for frontend
    startDate = models.DateField() # data for frontend
    endDate = models.DateField() # data for frontend
    status = models.CharField(max_length = 200) # data for frontend to identify if goal is complete
    textField = models.TextField() # description of goal

class comment(models.Model):
    companyName = models.CharField(max_length = 500) # could be used as an identifier 
    goalId = models.CharField(max_length = 500) # could be used along with company name as composite key to identify which goal comment belong to
    firstName = models.CharField(max_length = 200) # name of the employee who wrote the comment
    timstamp = models.CharField(max_length = 500) # unix time of when comment is created, so it can be sorted either in backend or frontend
    textField = models.TextField() # the description of the comment