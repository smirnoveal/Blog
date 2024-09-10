from rest_framework.exceptions import NotFound, AuthenticationFailed
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import UserRegisterSerializer, UserSerializer


class UserLoginView(APIView):

    def post(self, request):
        try:
            user = User.objects.get(
                username=request.POST.dict().get("username"),
            )
        except User.DoesNotExist:
            raise NotFound("user with such login does not exist!")
        if user.check_password(request.POST.dict().get("password")):
            return Response(UserSerializer(user).data)
        raise AuthenticationFailed("Incorrect password!")


class UserAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(self.request.user).data)


class UserRegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        serializer.save(is_active=True)
