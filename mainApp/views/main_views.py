from calendar import c
from datetime import datetime
import http
import re
from string import printable
from time import time
from tokenize import group
from tracemalloc import get_object_traceback
from turtle import title
from urllib import request, response
from webbrowser import get
from django.shortcuts import render,get_list_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework.generics import get_object_or_404 
from ..serializers import ReviewSerializer,TabsSerializer,Notice_get_Form,StoreSerializer,MemoSerializer,AccountSerializer,userSerializer,DocumentForm,LevelSerializer,Cal_create_Form,Cal_get_inner_Form,GroupSerializer,FAQ_create_Form,UserForm,GroupcreateSerializer,Useredit,RequestForm,CommentsForm,Cal_get_Form,FAQ_get_Form
from ..models import Review,Tabs,Store,User,Level,Notice,Notice_file,Group_user,Division,Requests,Comments,CalAdd,FAQ,Cal_inner,Cal_store,Images
from django.utils import timezone
import json
from django.http import JsonResponse ,HttpResponse
from argon2 import PasswordHasher
from django.db.models import Q
import datetime
from rest_framework.parsers import JSONParser
import os
from django.conf import settings 
from django.views.generic.detail import SingleObjectMixin
from django.http import FileResponse
from django.core.files.storage import FileSystemStorage
import mimetypes
import zipfile
import urllib
from urllib.parse import quote_plus
from urllib.parse import unquote_plus
import openpyxl



class mian_view_test(APIView):
    def get(self,request):
        
        print("test")
        
        return Response( status=status.HTTP_201_CREATED) 