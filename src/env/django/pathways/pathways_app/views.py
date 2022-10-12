from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse('Hello, World!')


def error(request):
    return HttpResponse('<h1>error page</h1>')