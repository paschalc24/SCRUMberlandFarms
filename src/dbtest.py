import psycopg2
from psycopg2.extensions import cursor


def createTable(curs: cursor):
    curs.execute("""CREATE TABLE "GoalsExample" (
        "EmployeeID" int,
        "ManagerID" int,
        "StartDate" varchar(255),
        "EndDate" varchar(255),
        "Title" varchar(255),
        "Description" varchar(255),
        "Category" varchar(255),
        "Status" varchar(255)
    );""")


def createGoal(curs: cursor, employeeID: int, managerID: int,
               startDate: str, endDate: str, title: str,
               description: str = str(), category: str = str(),
               status: str = str()):
    values = [employeeID, managerID, startDate, endDate,
              title, description, category, status]
    curs.execute("""INSERT INTO "GoalsExample" (
        "EmployeeID",
        "ManagerID",
        "StartDate",
        "EndDate",
        "Title",
        "Description",
        "Category",
        "Status"
    ) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s );""", values)


def retrieveData(curs: cursor):
    curs.execute("""SELECT * FROM "GoalsExample";""")
    values = curs.fetchall()[0]
    columnNames = [description[0] for description in curs.description]
    for (column, value) in zip(columnNames, values):
        print(column + ": " + str(value))


def dropTable(curs: cursor):
    curs.execute("""DROP TABLE "GoalsExample";""")


def main():
    employeeID = 2
    managerID = 1
    startDate = "10/19/2022"
    endDate = "10/20/2022"
    title = "Demonstrate the insertion of goals"
    description = "A successful demo would be nice"
    category = "educational"
    status = "in-progress"
    file = open("dbCreds.txt", 'r')
    creds = file.read().split()
    with psycopg2.connect(dbname=creds[0],
                          user=creds[1],
                          password=creds[2],
                          host=creds[3]) as connection:
        with connection.cursor() as curs:
            createTable(curs)
            createGoal(curs, employeeID, managerID, startDate, endDate, title,
                       description, category, status)
            retrieveData(curs)
            dropTable(curs)


if __name__ == "__main__":
    main()
