from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from backend.firebase import db
from backend.firebase import auth
from user.serializers import RegisterUserRequestSerializer, LoginUserRequestSerializer
import os
from rest_framework.response import Response
import json
import requests
from rest_framework.decorators import api_view, renderer_classes, parser_classes
from backend.firebase import bucket

rest_api_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"
os.environ['FIREBASE_WEB_API_KEY'] = 'AIzaSyCJHTqlRKFiejywZDA4GzHYCTi1xm8Pjwk'
FIREBASE_WEB_API_KEY = os.environ.get("FIREBASE_WEB_API_KEY")

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        register_data = JSONParser().parse(request)
        register_serializer = RegisterUserRequestSerializer(data=register_data)
        if register_serializer.is_valid():
            firstname = register_serializer.data.get("firstname")
            lastname = register_serializer.data.get("lastname")
            email = register_serializer.data.get("email")
            password = register_serializer.data.get("password")
            role = register_serializer.data.get("role")
            #print(firstname)
            new_user = auth.create_user(email=email, password=password, display_name=firstname + ' ' + lastname)
            doc_ref = db.collection(u'user').document(new_user.uid)
            doc_ref.set({
                u'firstname': firstname,
                u'lastname': lastname,
                u'email': email,
                u'role': role,
                u'image': '-'
            })
            return JsonResponse(register_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(register_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def authentication(request):
    if request.method == 'POST':
        login_data = JSONParser().parse(request)
        login_serializer = LoginUserRequestSerializer(data=login_data)
        if login_serializer.is_valid():
            email = login_serializer.data.get('email')
            password = login_serializer.data.get('password')
            print(email)
            print(password)
            return_secure_token = True
            print(FIREBASE_WEB_API_KEY)
            try:
                payload = json.dumps({
                    "email": email,
                    "password": password,
                    "returnSecureToken": return_secure_token
                })

                r = requests.post(rest_api_url,
                                  params={"key": FIREBASE_WEB_API_KEY},
                                  data=payload)

            except:
                message = "invalid credentials"
                return Response(message)
            user_data = r.json()
            user_id = user_data['localId']
            id_token = user_data['idToken']
            print(user_id)
            user_dt = db.collection(u'user').document(user_id).get().to_dict()
            user_role = user_dt['role']
            user_name = user_dt['firstname'] + ' ' + user_dt['lastname']
            user_image = user_dt['image']
            user_email = user_dt['email']
            response_data = {'accessToken': id_token, 'userId': user_id, 'role': user_role, 'user_name': user_name,
                             'user_image': user_image, 'user_email': user_email}
            return Response(response_data, status=status.HTTP_200_OK)
        return JsonResponse(login_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def user_detail(request):
    if request.method == 'GET':
        user_dt = request.headers['x-user-id']
        print('user_id : ', user_dt)
        user_result = db.collection(u'user').document(user_dt).get()
        print(user_result)
        user_dict = user_result.to_dict()
        return Response(user_dict, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def upload_user_image(request):
    if request.method == 'POST':
        user_dt = request.headers['x-user-id']
        image = request.FILES['image']
        user_image_filename = 'USER-' + user_dt + '.png'
        user_image_blob = bucket.blob(f'user/{user_image_filename}')
        user_image_blob.upload_from_file(image)
        user_image_blob.make_public()
        user_image_url = user_image_blob.public_url
        doc_ref = db.collection(u'user').document(user_dt)
        doc_ref.update({
            u'image': user_image_url
        })
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)