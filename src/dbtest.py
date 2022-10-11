import psycopg2


def main():
    with psycopg2.connect(dbname="Example",
                          user="Test@cs320",
                          password="Abcd!234",
                          host="cs320.postgres.database.azure.com") as connection:
        print(connection)
        with connection.cursor() as curs:
            # curs.execute("""CREATE TABLE Kyle (num int);""")
            # curs.execute("""INSERT INTO Kyle (num) VALUES (5);""")
            curs.execute("""SELECT * FROM Kyle;""")
            print(curs.fetchall())


if __name__ == "__main__":
    main()
