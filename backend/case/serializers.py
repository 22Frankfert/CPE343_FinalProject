from rest_framework import serializers
from case.models import UploadCaseRequest, CaseIdRequest, PatientDataRequest


class PatientDataRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientDataRequest
        fields = '__all__'


class UploadCaseRequestSerializer(serializers.ModelSerializer):
    # def create(self, validated_data):
    #     documents = self.context['original_image']
    #     post = UploadCaseRequest.objects.create(**validated_data)
    #     for document in documents:
    #         BloodFilmImage.objects.create(case_id=post, original_image=document)
    #     return post

    class Meta:
        model = UploadCaseRequest
        fields = '__all__'


class CaseIdRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseIdRequest
        fields = '__all__'