from django.shortcuts import render

import pandas as pd
import json
# import uuid
from datetime import datetime

import cv2
import asyncio
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from google.cloud import firestore
from backend.firebase import db
from case.models import UploadCaseRequest
from case.serializers import UploadCaseRequestSerializer, CaseIdRequestSerializer, PatientDataRequestSerializer
from backend.firebase import bucket
from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.parser import MultiPartParser
from djangorestframework_camel_case.parser import FormParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer
from django.core.files.base import ContentFile
from io import BytesIO
from case.predict_program import all_predict, percentage_spe
from django.http import HttpResponse
import numpy as np
from asgiref.sync import sync_to_async
from case.patient_type import patientType, guildline, showGuildline, drugResistance


@api_view(['POST'])
def recommend_test(request):
    if request.method == 'POST':
        case_id_serializer = CaseIdRequestSerializer(data=request.data)
        print("case_id_serializer: " + case_id_serializer.__str__())
        if case_id_serializer.is_valid():
            print("case_id_serializer: " + case_id_serializer.__str__())
            case_id = case_id_serializer.data.get('case_id')
            print('case id: ', case_id)
            upload_time = datetime.now()
            upload_user_id = request.headers['x-user-id']
            print(upload_user_id)
            case_ref = db.collection(u'patient').document(case_id)
            case_ref.set({
                u'upload_time': upload_time,
                u'upload_user_id': upload_user_id
            }, merge=True)

        case_ref = db.collection(u'patient').document(case_id)
        case_get = case_ref.get()
        case_result = case_get.to_dict()
        patientType(case_result)
        drugResistance(case_result)
        guildline(case_result)
        case_ref.set({
            u'patient_type': case_result['patient_type'],
            u'drug_data': case_result['drug_data'],
            u'guildline': case_result['guildline']
        }, merge=True)
        print(case_result['patient_type'])
        print(case_result['drug_data'])
        print(case_result['guildline'])

        guildline_ref = db.collection(u'patient').document(case_id)
        guildline_get = guildline_ref.get()
        guildline_result = guildline_get.to_dict()
        showGuildline(guildline_result)

        case_guildline = {}
        case_guildline['drug_detail'] = guildline_result['drug_detail'][0]
        case_guildline['drug_administration'] = guildline_result['drug_administration'][0]
        case_guildline['note'] = guildline_result['note'][0]
        case_guildline['other'] = guildline_result['other'][0]

        guildline_ref.set({
            u'drug_detail': case_guildline['drug_detail'],
            u'drug_administration': case_guildline['drug_administration'],
            u'note': case_guildline['note'],
            u'other': case_guildline['other']
        }, merge=True)

        return Response(case_id_serializer.errors, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def guildline_test(request):
    if request.method == 'POST':
        case_id_serializer = CaseIdRequestSerializer(data=request.data)
        print("case_id_serializer: " + case_id_serializer.__str__())
        if case_id_serializer.is_valid():
            prev_case_id = db.collection(u'patient').order_by(
                u'upload_time', direction=firestore.Query.DESCENDING).limit(1).stream()
            for last_case in prev_case_id:
                last_case_id = last_case.id
            case_id = 'MD-' + \
                ('0' * (6 - len(str(int(last_case_id[3:]))))
                 ) + str(int(last_case_id[3:]) + 1)
            print(case_id)

            upload_time = datetime.now()
            # upload_user_id = request.headers['x-user-id']

            case_ref = db.collection(u'patient').document(case_id)
            case_ref.set({
                u'upload_time': upload_time
                # u'upload_user_id': upload_user_id
            }, merge=True)

            case_ref = db.collection(u'patient').document(case_id)
            case_get = case_ref.get()
            case_result = case_get.to_dict()
            patientType(case_result)
            drugResistance(case_result)
            guildline(case_result)
            case_ref.set({
                u'patient_type': case_result['patient_type'],
                u'drug_data': case_result['drug_data'],
                u'guildline': case_result['guildline']
            }, merge=True)
            print(case_result['patient_type'])
            print(case_result['drug_data'])
            print(case_result['guildline'])

            guildline_ref = db.collection(u'patient').document(case_id)
            guildline_get = guildline_ref.get()
            guildline_result = guildline_get.to_dict()
            showGuildline(guildline_result)

            case_guildline = {}
            case_guildline['drug_detail'] = guildline_result['drug_detail'][0]
            case_guildline['drug_administration'] = guildline_result['drug_administration'][0]
            case_guildline['note'] = guildline_result['note'][0]
            case_guildline['other'] = guildline_result['other'][0]

            guildline_ref.set({
                u'drug_detail': case_guildline['drug_detail'],
                u'drug_administration': case_guildline['drug_administration'],
                u'note': case_guildline['note'],
                u'other': case_guildline['other']
            }, merge=True)

        # guildline_ref = db.collection(u'patient').document(case_id)
        # guildline_get = guildline_ref.get()
        # guildline_result = guildline_get.to_dict()
        # showGuildline(guildline_result)
        # # print(case_result)

        # case_guildline = {}
        # case_guildline['drug_detail'] = guildline_result['drug_detail'][0]
        # case_guildline['drug_administration'] = guildline_result['drug_administration'][0]
        # case_guildline['note'] = guildline_result['note'][0]
        # case_guildline['other'] = guildline_result['other'][0]

        # guildline_ref.set({
        #     u'drug_detail': case_guildline['drug_detail'],
        #     u'drug_administration': case_guildline['drug_administration'],
        #     u'note': case_guildline['note'],
        #     u'other': case_guildline['other']
        # }, merge=True)

            return Response(case_id, status=status.HTTP_200_OK)
        return Response(case_id_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
@parser_classes([CamelCaseJSONParser, MultiPartParser, FormParser])
@renderer_classes([CamelCaseJSONRenderer])
# @sync_to_async()
def upload_images_for_single_process(request):
    if request.method == 'POST':
        images = request.FILES.getlist('originalImage')
        case_id_serializer = CaseIdRequestSerializer(data=request.data)
        if case_id_serializer.is_valid():
            case_id = case_id_serializer.data.get('case_id')
            print('case id: ', case_id)
            upload_time = datetime.now()
            upload_user_id = request.headers['x-user-id']
            drug = '-'
            case_ref = db.collection(u'patient').document(case_id)
            case_ref.set({
                u'upload_time': upload_time,
                u'upload_user_id': upload_user_id,
                u'drug_detail': drug,
                u'drug_administration': drug,
                u'note': drug,
                u'other': drug
            }, merge=True)

            i = 1
            for image in images:
                original_image = image
                original_image_filename = 'IMG-' + \
                    case_id[3:] + '-' + \
                    ('0' * (2 - len(str(i)))) + str(i) + '.png'
                original_image_blob = bucket.blob(
                    f'patient/{case_id}/originalImage/{original_image_filename}')
                print(original_image_blob)

                original_image_blob.upload_from_file(original_image)
                original_image_blob.make_public()
                original_image_url = original_image_blob.public_url

                # loop all org image
                print(original_image_url)
                blood_film_ref = case_ref.collection(
                    u'blood_film_images').document(original_image_filename)
                blood_film_ref.set({
                    u'original_image_url': original_image_url
                })
                i = i + 1

            return Response(case_id, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
@parser_classes([CamelCaseJSONParser, MultiPartParser, FormParser])
@renderer_classes([CamelCaseJSONRenderer])
# @sync_to_async()
def main_program_for_single_process(request):
    if request.method == 'POST':
        case_id_serializer = CaseIdRequestSerializer(data=request.data)
        # print("case_id_serializer: " + case_id_serializer.__str__())
        if case_id_serializer.is_valid():
            # print("case_id_serializer: " + case_id_serializer.__str__())
            case_id = case_id_serializer.data.get('case_id')
            print('case id: ', case_id)

            all_image = db.collection(u'patient').document(
                case_id).collection(u'blood_film_images').stream()
            print('allImg: ', all_image)
            dict_img = {}
            for img in all_image:
                # get all org img for function all predict
                org_image_blob = bucket.get_blob(
                    f'patient/{case_id}/originalImage/{img.id}')
                print(org_image_blob)
                array_image = np.frombuffer(
                    org_image_blob.download_as_string(), np.uint8)
                img_file = cv2.imdecode(array_image, cv2.COLOR_BGR2BGR555)
                dict_img[img.id] = img_file
                print(dict_img)

            prob, infected_prob, infected_cells, result_img = all_predict(
                dict_img)
            prob_case, result_case = percentage_spe(infected_cells)
            print('dictImg: ', dict_img)
            case_ref = db.collection(u'patient').document(case_id)

            for img_name in infected_cells:
                blood_film_ref = case_ref.collection(
                    u'blood_film_images').document(img_name)
                result_image_filename = img_name
                result_image_from_model = result_img[img_name]
                bs = BytesIO()
                result_image_from_model.save(bs, "png")
                result_image_blob = bucket.blob(
                    f'patient/{case_id}/result_image/{result_image_filename}')
                result_image_blob.upload_from_string(
                    bs.getvalue(), content_type="image/png")
                result_image_blob.make_public()
                result_image_url = result_image_blob.public_url
                blood_film_ref.set({
                    u'result_image_filename': result_image_filename,
                    u'result_image_url': result_image_url
                }, merge=True)

            if len(result_case) != 0:
                result = 'ติดเชื้อ'
                species = ''
                for e_spe in result_case:
                    species = species + ', ' + e_spe
                species = species[2:]
            else:
                result = 'ไม่ติดเชื้อ'
                species = '-'

            case_ref.set({
                u'result': result,
                u'falciparum': prob_case[0],
                u'malariae': prob_case[1],
                u'vivax': prob_case[2],
                u'ovale': prob_case[3],
                u'knowlesi': prob_case[4],
                u'ring': prob_case[5],
                u'species': species
            }, merge=True)

            return Response(status=status.HTTP_201_CREATED)
        return Response(case_id_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
@parser_classes([CamelCaseJSONParser, MultiPartParser, FormParser])
@renderer_classes([CamelCaseJSONRenderer])
# @sync_to_async()
def upload_images(request):
    if request.method == 'POST':
        images = request.FILES.getlist('originalImage')
        case_id_serializer = CaseIdRequestSerializer(data=request.data)
        if case_id_serializer.is_valid():
            case_id = case_id_serializer.data.get('case_id')
            print('case id: ', case_id)
            upload_time = datetime.now()
            upload_user_id = request.headers['x-user-id']
            case_ref = db.collection(u'patient').document(case_id)
            case_ref.set({
                u'upload_time': upload_time,
                u'upload_user_id': upload_user_id
            }, merge=True)

            i = 1
            for image in images:
                original_image = image
                original_image_filename = 'IMG-' + \
                    case_id[3:] + '-' + \
                    ('0' * (2 - len(str(i)))) + str(i) + '.png'
                original_image_blob = bucket.blob(
                    f'patient/{case_id}/originalImage/{original_image_filename}')
                print(original_image_blob)

                original_image_blob.upload_from_file(original_image)
                original_image_blob.make_public()
                original_image_url = original_image_blob.public_url

                # loop all org image
                print(original_image_url)
                blood_film_ref = case_ref.collection(
                    u'blood_film_images').document(original_image_filename)
                blood_film_ref.set({
                    u'original_image_url': original_image_url
                })
                i = i + 1

            return Response(case_id, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
@parser_classes([CamelCaseJSONParser, MultiPartParser, FormParser])
@renderer_classes([CamelCaseJSONRenderer])
# @sync_to_async()
def main_program(request):
    if request.method == 'POST':
        case_id_serializer = CaseIdRequestSerializer(data=request.data)
        # print("case_id_serializer: " + case_id_serializer.__str__())
        if case_id_serializer.is_valid():
            # print("case_id_serializer: " + case_id_serializer.__str__())
            case_id = case_id_serializer.data.get('case_id')
            print('case id: ', case_id)

            all_image = db.collection(u'patient').document(
                case_id).collection(u'blood_film_images').stream()
            print('allImg: ', all_image)
            dict_img = {}
            for img in all_image:
                # get all org img for function all predict
                org_image_blob = bucket.get_blob(
                    f'patient/{case_id}/originalImage/{img.id}')
                print(org_image_blob)
                array_image = np.frombuffer(
                    org_image_blob.download_as_string(), np.uint8)
                img_file = cv2.imdecode(array_image, cv2.COLOR_BGR2BGR555)
                dict_img[img.id] = img_file
                print(dict_img)

            prob, infected_prob, infected_cells, result_img = all_predict(
                dict_img)
            prob_case, result_case = percentage_spe(infected_cells)
            print('dictImg: ', dict_img)
            case_ref = db.collection(u'patient').document(case_id)

            for img_name in infected_cells:
                blood_film_ref = case_ref.collection(
                    u'blood_film_images').document(img_name)
                result_image_filename = img_name
                result_image_from_model = result_img[img_name]
                bs = BytesIO()
                result_image_from_model.save(bs, "png")
                result_image_blob = bucket.blob(
                    f'patient/{case_id}/result_image/{result_image_filename}')
                result_image_blob.upload_from_string(
                    bs.getvalue(), content_type="image/png")
                result_image_blob.make_public()
                result_image_url = result_image_blob.public_url
                blood_film_ref.set({
                    u'result_image_filename': result_image_filename,
                    u'result_image_url': result_image_url
                }, merge=True)

            if len(result_case) != 0:
                result = 'ติดเชื้อ'
                species = ''
                for e_spe in result_case:
                    species = species + ', ' + e_spe
                species = species[2:]
            else:
                result = 'ไม่ติดเชื้อ'
                species = '-'

            case_ref.set({
                u'result': result,
                u'falciparum': prob_case[0],
                u'malariae': prob_case[1],
                u'vivax': prob_case[2],
                u'ovale': prob_case[3],
                u'knowlesi': prob_case[4],
                u'ring': prob_case[5],
                u'species': species
            }, merge=True)

            case_ref = db.collection(u'patient').document(case_id)
            case_get = case_ref.get()
            case_result = case_get.to_dict()

            if (("ไม่พบเชื้อ" in case_result['malaria_type']) or ("ยังไม่ทราบชนิดของเชื้อ" in case_result['malaria_type'])):
                case_result['malaria_type'] = species
            else:
                pass

            patientType(case_result)
            guildline(case_result)
            case_ref.update({
                u'malaria_type': case_result['malaria_type'],
                u'patient_type': case_result['patient_type'],
                u'guildline': case_result['guildline']
            })
            print(case_result['patient_type'])
            print(case_result['guildline'])

            guildline_ref = db.collection(u'patient').document(case_id)
            guildline_get = guildline_ref.get()
            guildline_result = guildline_get.to_dict()
            showGuildline(guildline_result)

            case_guildline = {}
            case_guildline['drug_detail'] = guildline_result['drug_detail'][0]
            case_guildline['drug_administration'] = guildline_result['drug_administration'][0]
            case_guildline['note'] = guildline_result['note'][0]
            case_guildline['other'] = guildline_result['other'][0]

            guildline_ref.update({
                u'drug_detail': case_guildline['drug_detail'],
                u'drug_administration': case_guildline['drug_administration'],
                u'note': case_guildline['note'],
                u'other': case_guildline['other']
            })

            return Response(status=status.HTTP_201_CREATED)
        return Response(case_id_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@renderer_classes([CamelCaseJSONRenderer])
# @sync_to_async()
def get_img_result(request, case_id):
    if request.method == 'GET':
        case_ref = db.collection(u'patient').document(case_id)
        case_result = case_ref.get()
        case = case_result.to_dict()
        show = case['falciparum'], case['knowlesi'], case['malariae'], case[
            'ovale'], case['vivax'], case['ring'], case['species'], case['result']
        # user_result = db.collection(u'patient').document(
        #     case['upload_user_id']).get()
        # user = user_result.to_dict()
        # user_name = user['firstname'] + ' ' + user['lastname']

        # case['upload_user_id'] = user_name
        print(f'All result of case: {case}')

        if case_result.exists:
            print(f'All result of case: {case}')
        else:
            print(u'No case result')

        blood_film_image_ref = db.collection(u'patient').document(
            case_id).collection(u'blood_film_images')
        image_case_result = blood_film_image_ref.stream()

        i = 0
        case['blood_film_images'] = []
        for img in image_case_result:
            case['blood_film_images'].append(img.to_dict())
            cells_result = db.collection(u'patient').document(
                case_id).collection(u'blood_film_images').stream()
            print(f'All img of case: {img.to_dict()}')
            i = i + 1

        return Response(show, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@renderer_classes([CamelCaseJSONRenderer])
# @sync_to_async()
def get_result(request, case_id):
    if request.method == 'GET':
        case_ref = db.collection(u'patient').document(case_id)
        case_result = case_ref.get()
        case = case_result.to_dict()
        show = case['malaria_type'], case['patient_type'], case['drug_detail'], case['drug_administration'], case['note'], case['other'], case[
            'falciparum'], case['knowlesi'], case['malariae'], case['ovale'], case['vivax'], case['ring'], case['species'], case['result'], case['drug_data']

        return Response(show, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@renderer_classes([CamelCaseJSONRenderer])
# @sync_to_async()
def get_rec_result(request, case_id):
    if request.method == 'GET':
        case_ref = db.collection(u'patient').document(case_id)
        case_result = case_ref.get()
        case = case_result.to_dict()
        show = case['malaria_type'], case['patient_type'], case['drug_detail'], case[
            'drug_administration'], case['note'], case['other'], case['drug_data']

        return Response(show, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@renderer_classes([CamelCaseJSONRenderer])
def all_case_view(request):
    if request.method == 'GET':
        user = request.headers['x-user-id']
        case_result = db.collection(u'patient').where(
            u'upload_user_id', u'==', user).stream()
        list_all_case = list()
        for case in case_result:
            all_case_data = case.to_dict()

            keys = ['upload_time', 'drug_detail',
                    'drug_administration', 'note', 'other']
            # keys = ['upload_time']
            case_data = {key: all_case_data[key] for key in keys}
            case_data['case_id'] = case.id
            case_data['upload_time'] = str(case_data['upload_time'])[:10]
            case_data['drug_detail'] = str(case.get('drug_detail'))
            case_data['drug_administration'] = str(
                case.get('drug_administration'))
            case_data['note'] = str(case.get('note'))
            case_data['other'] = str(case.get('other'))
            list_all_case.append(case_data)

        return Response(list_all_case, status=status.HTTP_200_OK)
    else:
        print('error')
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
