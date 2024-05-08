import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
from firebase_admin import storage
# Use a service account
cred = credentials.Certificate('serviceAccount.json')
firebase_admin.initialize_app(
    cred, {'storageBucket': 'malaria-4500e.appspot.com'})
# cred = credentials.Certificate('serviceAccount.json')
# firebase_admin.initialize_app(cred, {'storageBucket': 'gs://malaria-4500e.appspot.com'})

db = firestore.client()
auth = firebase_admin.auth
bucket = storage.bucket()
