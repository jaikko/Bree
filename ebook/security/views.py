from django.http.response import HttpResponse
from django.shortcuts import render
import requests


# Create your views here.

def login(request):
    return render(request, 'security/login.html')

def signup(request):
    return render(request, 'security/signup.html')

def isLogin(request):
    login = False
    acces = request.COOKIES.get('acces')
    myobj = {'token': acces}
    res = requests.post("http://127.0.0.1:8000/api/token/verify/", data = myobj)
    if res.status_code == 200:
        login = True
    return login