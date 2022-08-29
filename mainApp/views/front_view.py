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



class Dash_Front_view(APIView):

    def post(self, request ):
        user = get_object_or_404(User, pk=request.data.get('id'))

        group = (user.group_user)

        group_user = get_list_or_404(User, group_user=group)




        agency_count = 0
        store_count = 0
        day_agency_count = 0
        month_agency_count = 0
        
        group_store_list=[]
        group_store_count=0

        agency = group_user


        for x in group_user:

            try:
                store=get_list_or_404(Store,agency_id=x.id)
                for x in store:
                    group_store_list.append(x)
                group_store_count= group_store_count+len(store)
            except:
                print('none')

        for x in group_store_list:
            agency_count = agency_count+1

        

        d = datetime.datetime.now()

        for x in group_store_list:    
            if x.created_at.month == d.month:
                month_agency_count=month_agency_count+1

            if x.created_at.month == d.month and x.created_at.day == d.day:
                day_agency_count=day_agency_count+1
        
        data_agency  = 0
        list = []
        for x in agency:
            data_agency= 0
            for y in group_store_list:
                if y.agency_id == x:
                    data_agency=data_agency+1
            adata = {'name': str(x.agency_name), '실적': data_agency, 'pv': 2400, 'amt': 2400}
        
            
            list.append(adata)
            

        


        data= {
            "agency": agency_count,
            "store": group_store_count,
            "m_agency":month_agency_count,
            "d_agency":day_agency_count,
            "list": list,
        }
        return JsonResponse(data,safe=False)

        





class front_Notice_view(APIView):
    def get(self,request):
        # notice = Notice.objects.all()

        notice = Notice.objects.order_by('-created_date')
        important_list = []
        notice_list = []

        notice_file_list = []
        notice_file_data = []

        for x in notice:
            try:
                notice_file = get_list_or_404(Notice_file, n_file=x)
                for i in notice_file:
                    notice_data = {
                        'title':i.file_name,
                        'url':i.Notice_file.url,
                    }
                    notice_file_data.append(notice_data)
                data = {
                        'id':x.id,
                        'Notice_cate' : x.Notice_cate,
                        'notice_title':x.notice_title,
                        'contents':x.contents,
                        'created_date':x.created_date,
                        'important':x.important,
                        'popdis':x.popdis,
                        'visdis':x.visdis,
                        "_file" : notice_file_data,
                }

                notice_file_list.append(data)
            except:
                    data = {
                        'id':x.id,
                        'Notice_cate' : x.Notice_cate,
                        'notice_title':x.notice_title,
                        'contents':x.contents,
                        'created_date':x.created_date,
                        'important':x.important,
                        'popdis':x.popdis,
                        'visdis':x.visdis,
                        "_file" : [],
                    }
                    notice_file_list.append(data)

        for x in notice_file_list:
            if x['important'] == True:
                important_list.append(x)
            else:
                notice_list.append(x)
        notice = important_list + notice_list

        return JsonResponse(notice,safe=False)

        



  #-------------------------------------------------------------------------------------------------------------------------------

class Front_StoreList(APIView):

    def get(self, request):
        
        stores = Store.objects.order_by('-created_time')
        
        serializer = StoreSerializer(stores, many=True)
        list = []




        for x in stores:
                    list.append(
                        {
                        'id':str(x.id),
                        'agency_id':str(x.agency_id),
                        'agency_name':x.agency_name,
                        'store_name':x.store_name,
                        'store_tell':x.store_tell,
                        'store_add':x.store_add,
                        'memo':x.memo,
                        'created_time':x.created_time,
                        'created_at':x.created_at,
                        'now':x.now,
                        'now_memo':x.now_memo,
                        'state':x.state,
                        'cal_name':x.cal_name,
                        'cal_date':x.cal_date,
                        'test1':'test1',
                        'test2':'test2',
                        }
                    )
                
        
        return JsonResponse(list, safe=False)

        return Response(status=status.HTTP_204_NO_CONTENT)

    

    
    def post(self, request):

  
    
        serializer = StoreSerializer(
            data=request.data)
        

        if(request.data.get('mode') == 'create'):
            

            user_data = get_object_or_404(User, pk=request.data.get('agency_id') )

            store_create = Store.objects.create(
                agency_id=user_data,
                agency_name=user_data.agency_name,
                store_name=request.data.get('store_name'),
                store_tell=request.data.get('store_tell'),
                store_add=request.data.get('store_add'),
                memo=request.data.get('memo'),
                state=request.data.get('state'),

            )

            return Response( status=status.HTTP_201_CREATED)  

        elif(request.data.get('mode') == 'get_front'):


            user = get_object_or_404(User, pk=request.data.get('id'))
            

            
            list=[]
            
            
            store_list = get_list_or_404(Store, agency_id=user)



            for x in store_list:
                    list.append(
                        {
                        'id':str(x.id),
                        'agency_id':str(x.agency_id),
                        'agency_name':x.agency_name,
                        'store_name':x.store_name,
                        'store_tell':x.store_tell,
                        'store_add':x.store_add,
                        'memo':x.memo,
                        'created_time':x.created_time,
                        'created_at':x.created_at,
                        'now':x.now,
                        'now_memo':x.now_memo,
                        'state':x.state,
                        'cal_name':x.cal_name,
                        'cal_date':x.cal_date,
                        'test1':'test1',
                        'test2':'test2',
                        

                        }
                    )
                
        
            return JsonResponse(list, safe=False)
        

        elif(request.data.get('mode') == 'memo'):
            store = get_object_or_404(Store, pk=request.data.get('id'))
            store.memo = request.data.get('memo')
            store.save()
            return Response( status=status.HTTP_201_CREATED) 
        
        elif(request.data.get('mode') == 'now'):
            store = get_object_or_404(Store, pk=request.data.get('id'))
            store.now = request.data.get('now')
            store.now_memo = request.data.get('now_memo')
            store.save()
            return Response( status=status.HTTP_201_CREATED)

        elif(request.data.get('mode') == 'edit'):
            store = get_object_or_404(Store, pk=request.data.get('id'))

            store.store_name = request.data.get('store_name')
            store.store_tell = request.data.get('store_tell')
            store.store_add = request.data.get('store_add')
            store.memo = request.data.get('memo')
            store.state = request.data.get('state')
            store.save()
            return Response( status=status.HTTP_201_CREATED)  
        
        elif(request.data.get('mode') == 'get'):
            store = get_object_or_404(Store, pk=request.data.get('id'))

           
            return Response(store.memo)
        
        elif(request.data.get('mode') == 'cal_get'):
            
            print(request.data.get('id'))
            try:
                # cal_store = Cal_store.objects.order_by('-created_date')
                store = get_object_or_404(Store, pk=request.data.get('id'))

                cal_store_data = get_list_or_404(Cal_store, cal_store=store)
                serializer = Cal_get_inner_Form(cal_store_data, many=True)

                return Response(serializer.data,status=status.HTTP_201_CREATED)
            except:
                print('안잡힘')
                return Response(None)

        
        
        return Response(status=status.HTTP_400_BAD_REQUEST)




class front_AgencyList(APIView):

    def get(self, request):
        
        agency = User.objects.order_by('-date_joined')

        for x in agency:
            
            try:
                x.date_joined = (x.date_joined).strftime("%Y-%m-%d")
            except:
                x.date_joined = '-'
           
            try:
                x.last_login = (x.last_login).strftime("%Y-%m-%d")
                
                # print('라스트' + x.last_login)
            except:
                x.last_login = '-'

        
        
    

        serializer = userSerializer(agency, many=True)
    
        return Response(serializer.data)


    def post(self,request):
        
        serializer = Useredit(data=request.data)
        
        print('hi')
        if request.data.get('mode')=='get':
            agency = get_object_or_404(User, pk=request.data.get('id'))
            

            data = {
                'id':agency.id,
                'username' : agency.username,
                'agency_name' : agency.agency_name,
                'agency_tell' : agency.agency_tell,
                'manager_name' : agency.manager_name,
                'email_addres' : agency.email_address,
                }
            return JsonResponse(data)


                        

        
        elif request.data.get('mode')=='get_log':
            agency = get_object_or_404(User, username=request.data.get('username'))
            


            data = {
                'id' : agency.id,
                'username' : agency.username,
                'agency_name' : agency.agency_name,
                'agency_tell' : agency.agency_tell,
                'manager_name' : agency.manager_name,
                'email_address' : agency.email_address,
                'level': agency.level.levels,
                }

            
            return JsonResponse(data)
        

        elif request.data.get('mode')=='change_normal':
            agency = get_object_or_404(User, pk=request.data.get('id'))

            agency.state = request.data.get('state')
            print(request.data.get('state'))
            print(agency.state)
            agency.save()
            return Response( status=status.HTTP_201_CREATED)

        elif request.data.get('mode')=='edit':

                agency = get_object_or_404(User, pk=request.data.get('id'))
                serializer = Useredit(data=request.data, instance=agency)
                agency.username = request.data.get('username')
                

                if request.data.get('password1') == None or request.data.get('password1') == '':
                    
                    agency.password = agency.password
                else:
                    # agency.password = (PasswordHasher().hash(request.data.get('password')))
      
                    if serializer.is_valid():
                        serializer.password =(request.data.get('password1'))

                        serializer.save()
                        
                    else: print(serializer.errors)
                

                agency.agency_name = request.data.get('agency_name')
                agency.agency_tell = request.data.get('agency_tell')
                agency.manager_name = request.data.get('manager_name')
                agency.email_addres = request.data.get('agency_email')
                agency.save()
                return Response( status=status.HTTP_201_CREATED)
           
          
        
        #return Response(status=status.HTTP_400_BAD_REQUEST)


class front_Num_a(APIView):





    def post(self, request):
        print('hi')
        group_list = []
        userlist = []
        level = Level.objects.all()
        group = Group_user.objects.all()

        agency = get_object_or_404(User, pk=request.data.get('id'))

        agency_list = User.objects.order_by()
        

        for x in agency_list:
            if x.group_user == agency.group_user:
                
                group_list.append(x)


        count = 0
        for x in group_list:

            print(group_list[count])
            try:
                if int(group_list[count].level.levels) > int(group_list[count+1].level.levels):
                    box = group_list[count]
                    group_list[count] = group_list[count+1]
                    group_list[count+1] = box
            except:
                print('done')
            
            count=count+1

        for x in group_list:
            
            try:
                x.date_joined = (x.date_joined).strftime("%Y-%m-%d")
            except:
                x.date_joined = '-'
           
            try:
                x.last_login = (x.last_login).strftime("%Y-%m-%d")
                
                # print('라스트' + x.last_login)
            except:
                x.last_login = '-'
        




        for x in group_list:

           

            userlist.append(
                {
                "id": x.id,
                "level": str(x.level),
                "divide": str(x.divide),
                "group_user": str(x.group_user),
                "agency_name": x.agency_name,
                "manager_name": x.manager_name,
                "agency_tell": x.agency_tell,
                "last_login": x.last_login,
                "date_joined":x.date_joined,
                "username": x.username,
                "state": x.state,
                'counter':0
                }
            )

        data= {
            "userlist":userlist,
            "group":GroupSerializer(group, many=True).data,
            "level":LevelSerializer(level, many=True).data,

        }
        # return Response( status=status.HTTP_201_CREATED)
        return JsonResponse(data, safe=False)
        

        return Response( status=status.HTTP_201_CREATED)
     
class fornt_StoreSearchView(APIView):
    

    def post(self, request):

        
        try:
            search_name = request.data.get('search_name')

            agency_id = request.data.get('agency_id')

            submit_date = request.data.get('submit_date')

            now_cate = request.data.get('now_cate')

            cal_cate = request.data.get('cal_cate')



            user = get_object_or_404(User, pk=request.data.get('id'))
                

                
            list=[]
                
            store = Store.objects.all()
            


            if search_name:
                store = store.filter(
                    Q(store_name__icontains=search_name) | Q(store_tell__icontains=search_name) | Q(store_add__icontains=search_name)
                ).distinct()

            if request.data.get('agency_id') != '':
                agency_name = get_object_or_404(User, id=ag_id).agency_name
                store = store.filter(
                    Q(agency_name__icontains=agency_name) 
                ).distinct()

            if submit_date:
                store = store.filter(
                    Q(created_at__icontains=submit_date) 
                ).distinct()

            if now_cate:
                store = store.filter(
                    Q(now__icontains=now_cate)
                ).distinct()

            


            store_list = get_list_or_404(store, agency_id=user)


            for x in store_list:
                list.append(
                    {
                        'id':x.id,
                        'agency_id':x.agency_id,
                        'agency_name':x.agency_name,
                        'store_name':x.store_name,
                        'store_tell':x.store_tell,
                        'store_add':x.store_add,
                        'memo':x.memo,
                        'created_time':x.created_time,
                        'created_at':x.created_at,
                        'now':x.now,
                        'now_memo':x.now_memo,
                        'state':x.state,
                        'cal_name':x.cal_name,
                        'cal_date':x.cal_date,
                        'test1':'test1',
                        'test2':'test2',
                            

                    }
                )

        
        
            serializer = StoreSerializer(list, many=True)

            return Response(serializer.data)
        
        except:


            return Response( status=status.HTTP_201_CREATED)




        return Response( status=status.HTTP_201_CREATED)

class fornt_SearchView(APIView):

    def post(self, request):
        group_list = []
        # agency = User.objects.all()
        search_name = request.data.get('search_name')  # 정렬기준
        search_num = request.data.get('search_num')
        select = request.data.get('select')
        search_email = request.data.get('search_email')
        agency = get_object_or_404(User, pk=request.data.get('id'))
        agency_list = User.objects.order_by()

        
        if search_name:
               agency_list = agency_list.filter(
                    Q(username__icontains=search_name) | Q(manager_name__icontains=search_name) | Q(agency_name__icontains=search_name)  # 제목검색
               ).distinct()
        
        if search_num:
               agency_list = agency_list.filter(
                    Q(agency_tell__icontains=search_num)   # 제목검색
               ).distinct()

        if select:
               agency_list = agency_list.filter(
                    Q(state__icontains=select)   # 제목검색
               ).distinct()
        
        if search_email:
               agency_list = agency_list.filter(
                    Q(email_address__icontains=search_email)   # 제목검색
               ).distinct()
        

  

        for x in agency_list:
            if x.group_user == agency.group_user:
                
                group_list.append(x)

        

        
        
        
        for x in group_list:
            
            try:
                x.date_joined = (x.date_joined).strftime("%Y-%m-%d")
            except:
                x.date_joined = '-'
           
            try:
                x.last_login = (x.last_login).strftime("%Y-%m-%d")
                
                # print('라스트' + x.last_login)
            except:
                x.last_login = '-'
   
        serializer = userSerializer(group_list, many=True)


        return Response(serializer.data)