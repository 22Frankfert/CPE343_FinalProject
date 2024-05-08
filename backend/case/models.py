
import sys

from django.db import models
# from django.contrib.auth.models import User
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.forms.fields import ImageField
from django.utils.deconstruct import deconstructible
from django.db.models import Q
from case.predict_program import all_predict, percentage_spe
from backend.firebase import db
from backend.firebase import bucket


# def to_imagefield(img):
#     img_io = BytesIO()
#     img.save(img_io, 'PNG')
#     image = InMemoryUploadedFile(img_io, 'ImageField', str(img), 'image/png', sys.getsizeof(img_io), None)
#     return image

class UploadCaseRequest(models.Model):
    # patient_id = models.CharField(max_length=20, blank=False, default='')
    malaria_type = models.CharField(max_length=100, blank=False, default='')
    # upload_user_id = models.CharField(max_length=100, blank=False)
    # original_image = ImageField(max_length=None, allow_empty_file=False)
    # case_id = models.CharField(max_length=20, blank=True, default='')
    # original_image = models.FileField(upload_to="images/")


class BloodFilmImage(models.Model):
    id = models.CharField(primary_key=True, max_length=30, default='none')
    case = models.ForeignKey(UploadCaseRequest, on_delete=models.CASCADE)
    original_image = models.ImageField(upload_to="images/")


class CaseIdRequest(models.Model):
    case_id = models.CharField(max_length=30)


class PatientDataRequest(models.Model):
    # age = models.Field(float)
    # weight = models.Field(float)
    gender = models.CharField(max_length=50, blank=False, default='')
    underlying_disease = models.CharField(
        max_length=50, blank=False, default='')
    drug_allergy = models.CharField(max_length=100, blank=False, default='')
    taking_medicine = models.CharField(max_length=100, blank=False, default='')
    anemia = models.CharField(max_length=100, blank=False, default='')
    urine_amount = models.CharField(max_length=50, blank=False, default='')
    urine_color = models.CharField(max_length=100, blank=False, default='')
    bleeding = models.CharField(max_length=100, blank=False, default='')
    fatigue = models.CharField(max_length=100, blank=False, default='')
    convulsions = models.CharField(max_length=100, blank=False, default='')
    asthma = models.CharField(max_length=50, blank=False, default='')
    comatose = models.CharField(max_length=100, blank=False, default='')
    refer = models.CharField(max_length=100, blank=False, default='')
    kidney_failure = models.CharField(max_length=50, blank=False, default='')
    malaria_type = models.CharField(max_length=100, blank=False, default='')
    blood_sugar = models.CharField(max_length=100, blank=False, default='')
    acidosis = models.CharField(max_length=100, blank=False, default='')
    pulmonary_edema = models.CharField(max_length=100, blank=False, default='')
    jaundice = models.CharField(max_length=50, blank=False, default='')
    malaria_amount = models.CharField(max_length=100, blank=False, default='')
    temperature = models.CharField(max_length=50, blank=False, default='')
    travel_history = models.CharField(max_length=100, blank=False, default='')
    province = models.CharField(max_length=100, blank=False, default='')
    # patient_type = models.CharField(max_length=100, blank=False, default='')
    # guildline = models.CharField(max_length=100, blank=False, default='')
