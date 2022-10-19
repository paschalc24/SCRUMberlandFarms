import psycopg2
from psycopg2.extensions import cursor


def createTable(curs: cursor):
    curs.execute("""CREATE TABLE GoalsExample (
        employeeID int,
        managerID int,
        startDate varchar(255),
        endDate varchar(255),
        title varchar(255),
        description varchar(255),
        category varchar(255),
        status varchar(255)
    );""")


def createGoal(curs: cursor, employeeID: int, managerID: int,
               startDate: str, endDate: str, title: str,
               description: str = str(), category: str = str(),
               status: str = str()):
    values = [employeeID, managerID, startDate, endDate,
              title, description, category, status]
    curs.execute("""INSERT INTO GoalsExample (
        employeeID,
        managerID,
        startDate,
        endDate,
        title,
        description,
        category,
        status
    ) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s );""", values)


def retrieveData(curs: cursor):
    curs.execute("SELECT * FROM GoalsExample;")
    for string in curs.fetchall()[0]:
        print(string)


def dropTable(curs: cursor):
    curs.execute("DROP TABLE GoalsExample;")


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
