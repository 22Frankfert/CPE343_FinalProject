from django.urls import path
from .views import main_program, get_result, all_case_view, recommend_test, guildline_test, upload_images, get_img_result, get_rec_result, upload_images_for_single_process, main_program_for_single_process

urlpatterns = [
    path('rectest', recommend_test),
    path('uploadonp', upload_images_for_single_process),
    path('testonp', main_program_for_single_process),
    path('test', main_program),
    path('result/<str:case_id>', get_result),
    path('imgresult/<str:case_id>', get_img_result),
    path('recresult/<str:case_id>', get_rec_result),
    path('history', all_case_view),
    path('glt', guildline_test),
    path('uploadimg', upload_images)
]
