import requests
import pprint

data = {
    "employeeId": "123456",
    "companyName": "scrum",
    "managerId": "5678",
    "title": "practice goal2",
    "category": "practice",
    "startDate": "2000-04-10",
    "endDate": "2001-04-10",
    "status": "ongoing",
    "textField": "this is a test"
}

response_get = requests.post("http://127.0.0.1:8000/goals/post/", data=data)

response_get = requests.get("http://127.0.0.1:8000/goals/get/", data={"employeeId": "123456"})
print(response_get.status_code)

response_update = requests.put("http://127.0.0.1:8000/goals/update/", data={
    "employeeId": "123456",
    "companyName": "scrum",
    "managerId": "5678",
    "title": "practice goal2",
    "category": "practice",
    "startDate": "2000-04-10",
    "endDate": "2001-04-10",
    "status": "success",
    "textField": "this is a test",
    "goalId": "febcd276-4575-4017-98d0-b46cda05da69"
    })


print(response_update.content)


'''
for goal in json.loads(response_get.content):
    response = requests.delete("http://127.0.0.1:8000/goals/delete/", data=goal)
    print(response.content)
'''