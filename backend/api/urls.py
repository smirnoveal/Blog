from api.views import UserRegisterView, UserLoginView, UserAuthView
from django.urls import path

urlpatterns = [
    path("authorization/", UserAuthView.as_view()),
    path("login/", UserLoginView.as_view()),
    path("registration/", UserRegisterView.as_view()),
]
