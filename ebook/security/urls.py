from django.urls.conf import path
from . import views

app_name = 'security'

urlpatterns = [
    path('', views.login, name="login"),
    path('signup/', views.signup, name="signup"),
    path('islogin/', views.isLogin)
]