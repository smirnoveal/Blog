from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class UserRegisterSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = "__all__"

    def get_token(self, obj):
        return Token.objects.create(user=obj).key


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = "__all__"

    def get_token(self, obj):
        return Token.objects.get_or_create(user=obj)[0].key
