from datetime import datetime
import re
from time import time
from tokenize import group
from tracemalloc import get_object_traceback
from urllib import request
from django.shortcuts import render,get_list_or_404
from .models import Review
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework.generics import get_object_or_404 
from .serializers import ReviewSerializer,TabsSerializer,StoreSerializer,MemoSerializer,userSerializer,LevelSerializer,Cal_create_Form,Cal_get_inner_Form,GroupSerializer,FAQ_create_Form,UserForm,GroupcreateSerializer,Useredit,RequestForm,CommentsForm,Cal_get_Form,FAQ_get_Form
from .models import Review,Tabs,Store,User,Level,Group_user,Division,Requests,Comments,CalAdd,FAQ,Cal_inner
from django.utils import timezone
from django.http import JsonResponse 
from django.db.models import Q

class Login_view(APIView):
    def post(self,request):
        

        serializer = RequestForm(
            data=request.data)

        if(request.data.get('mode') == 'get'):

                print('hi')
                
                return JsonResponse( safe=False)

