from django.urls import path
from .views import register, authentication, user_detail, upload_user_image

urlpatterns = [
    path('register', register),
    path('login', authentication),
    path('user-detail', user_detail),
    path('upload-image', upload_user_image)

]