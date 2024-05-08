from rest_framework import serializers
from user.models import RegisterUserRequest, LoginUserRequest


class RegisterUserRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterUserRequest
        fields = ('firstname',
                  'lastname',
                  'email',
                  'password',
                  'role')

class LoginUserRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginUserRequest
        fields = ('email',
                  'password')