# SCRUMberlandFarms

* Getting started
** Pulling from github
#+begin_src bash
  git clone 
#+end_src
** Installing prerequisite
*** frontend
Frontend dependencies requires only Nodejs, npm. After installing both, we can install the rest by doing:

#+begin_src bash
cd client &
npm install
#+end_src

*** Backend
Backend requires python3.10, psycopg2-binary, django, djangorestframework, django-cors-headers. Installation may differ between operating systems.

Getting Started with env/django/pathways_app

** Running the website
*** frontend
To run frontend, you only need to run the below command.

#+begin_src bash
cd client &
npm start 
# you may also run npm run build to create a production build and run using serve -s build
#+end_src

*** Backend
To run backend, you only need to run the below command

#+begin_src bash
cd src/env/django/pathways &
python3 manage.py runserver
# if needed you may also run python3 manage.py makemigration and after python3 mangae.py migrate
#+end_src













# API Documentation

## Goals API

- 
