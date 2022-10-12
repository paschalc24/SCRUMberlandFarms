from comment import comment
class goal:
    # contains the comment instances
    commentSection = []

    # each goal has employee id so corresponding goals can be fetched for each employee, managerId is included
    # so managers can fetch employee goals with corresponding managerId
    def __init__(self, employeeId, companyName, managerId, wordBlock):
        self.employeeId = employeeId
        self.companyName = companyName
        self.managerId = managerId
        self.wordBlock = wordBlock

    def addComment(self, timestamp, commentBlock):
        self.commentSection.append(comment(timestamp, commentBlock))