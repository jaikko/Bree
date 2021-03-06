from django.shortcuts import redirect, render
import requests
from requests.structures import CaseInsensitiveDict
from security.views import isLogin
# Create your views here.
    
def index(request):
    login = isLogin(request)
    print(login)
    if login == False:
        return redirect('security:login')
    acces = request.COOKIES.get('acces')
    hed = {'Authorization': 'Bearer ' + str(acces)}
    req = requests.get("http://127.0.0.1:8000/user/", headers=hed).json()
    
    books = requests.get("http://127.0.0.1:8000/book/", headers=hed).json()
    categories = requests.get("http://127.0.0.1:8000/category/", headers=hed).json()
    return render(request, 'store/index.html', {'books': books, 'categories': categories})