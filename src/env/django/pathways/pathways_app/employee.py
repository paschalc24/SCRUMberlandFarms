class employee:
    # creates an employee instance probably during account creation for login
    def __init__(self, firstName, lastName, employeeId, email, companyName, managerId, positionTitle, startDate, isManager, password):
        self.firstName = firstName
        self.lastName = lastName
        self.employeeId = employeeId
        self.email = email
        self.companyName = companyName
        self.managerId = managerId
        self.positionTitle = positionTitle
        self.startDate = startDate
        self.isManager = isManager
        self.password = password
