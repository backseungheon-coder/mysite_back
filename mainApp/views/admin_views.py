from datetime import datetime
import http
from platform import python_branch
import re
from string import printable
from time import time
from tokenize import group
from tracemalloc import get_object_traceback
from turtle import title
from urllib import request
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
from urllib import parse

class Login_view(APIView):
      def post(self,request):
        

        serializer = RequestForm(
            data=request.data)

        if(request.data.get('mode') == 'get'):

                comment = Requests.objects.all()
                list = []

                for x in comment:
                    list.append(
                        {
                        'id':(x.id),
                        'title':x.title,
                        'contents':x.contents,
                        'writer':str(x.writer),
                        'date':x.date
                        }
                    )
                serializer = RequestForm(comment, many=True)
                
                return JsonResponse(list, safe=False)


class CommentList(APIView):
    def post(self,request):
        

        serializer = RequestForm(
            data=request.data)

        if(request.data.get('mode') == 'get'):

                comment = Requests.objects.all()
                list = []

                for x in comment:
                    list.append(
                        {
                        'id':(x.id),
                        'title':x.title,
                        'contents':x.contents,
                        'writer':str(x.writer),
                        'date':x.date
                        }
                    )
                serializer = RequestForm(comment, many=True)
                
                return JsonResponse(list, safe=False)

        elif(request.data.get('mode') == 'inner'):


                request_data = get_object_or_404(Requests, pk=request.data.get('id'))
                
                try:

                    comment= get_list_or_404(Comments, comments_id=request_data)
                    serializer = CommentsForm(comment, many=True)

                    return Response(serializer.data,status=status.HTTP_201_CREATED)

                
                
                except:


                    return Response(status=status.HTTP_201_CREATED)
        
        elif(request.data.get('mode') == 'comment_create'):

            request_data = get_object_or_404(Requests, pk=request.data.get('id'))
            user = get_object_or_404(User, pk=request.data.get('user_id'))
            comment_create = Comments.objects.create(
                comments_id=request_data,
                writer = user,
                contents = request.data.get('contents')                
            ) 
            comment_create.save()


            return Response(status=status.HTTP_201_CREATED)
                


        elif(request.data.get('mode') == 'add_main'):

                print(request.data.get('title'))
                print(request.data.get('sub'))
                store = get_object_or_404(Store, pk=request.data.get('store_id'))
                user  = get_object_or_404(User, pk=request.data.get('id'))
                reqeust_create = Requests.objects.create(
                    title=request.data.get('title'),
                    contents=request.data.get('sub'),
                    writer=user,
                    request_id=store
                )
                reqeust_create.save()



                # user_created = User.objects.create(
                #     group=request.data.get('group'),
                #     username=request.data.get('username'),
                # )

                # serializer = Useredit(data=request.data, instance=user_created)
                # if serializer.is_valid():
                #     serializer.password =(request.data.get('password1'))
                #     serializer.save()
                

                return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)


#------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



class FAQ_list(APIView):


    def get(self, request):
        
        faqadd = FAQ.objects.order_by('-created_date')
        serializer = FAQ_get_Form(faqadd, many=True)
        return Response(serializer.data)


    def post(self, request):
        
        
        
        if(request.data.get('mode') == 'create'):
            
            print(request.data.get('faq_title'),)
            user_created = FAQ.objects.create(
            faq_title=request.data.get('faq_title'),
            faq_catego=request.data.get('faq_catego'),
            visdis=request.data.get('visdis'),
            contents=request.data.get('contents'),
            )

            
            
            
            serializer = FAQ_create_Form(data=request.data, instance=user_created)
            if serializer.is_valid():
               
                serializer.save()
            
                return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        elif(request.data.get('mode') == 'edit'):
       
            
            faq = get_object_or_404(FAQ, pk=request.data.get('id'))

            

            faq.faq_title=request.data.get('faq_title')
            faq.faq_catego=request.data.get('faq_catego')
            faq.visdis=request.data.get('visdis')
            faq.contents=request.data.get('contents')
            faq.modified_date=datetime.today()
            faq.save()
            return Response( status=status.HTTP_201_CREATED)  



        elif(request.data.get('mode') == 'delete'):
            
            
            faq = get_object_or_404(FAQ, pk=request.data.get('id'))

            faq.delete();

            
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)




#------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




class Cal_list(APIView):

    def get(self, request):
        
        caladd = CalAdd.objects.all()
       
        serializer = Cal_get_Form(caladd, many=True)


        return Response(serializer.data)

    def post(self, request):

        if(request.data.get('mode') == 'create'):
            

            caladd_created = CalAdd.objects.create(
            cal_title=request.data.get('cal_title')
            )

            serializer = Cal_create_Form(data=request.data, instance=caladd_created)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)


        elif(request.data.get('mode') == 'load'):
            try:
                cal = get_list_or_404(Cal_inner, cal_inner=request.data.get('id'))  

                serializer = Cal_get_inner_Form(cal, many=True)

                return Response(serializer.data,status=status.HTTP_201_CREATED)
            except:
                print('안잡힘')
                return Response(None)


        
        

        elif(request.data.get('mode') == 'add_inner'):
            
    
        
            caladd = get_object_or_404(CalAdd, pk=request.data.get('id'))
           
            caladd_created = Cal_inner.objects.create(
                cal_inner=caladd,
                cal_name=request.data.get('title'),
                cal_sub=request.data.get('sub'),
                created_date=datetime.today(),
            )
            return Response(status=status.HTTP_201_CREATED)


        elif(request.data.get('mode') == 'inner_delete'):
            
            id = request.data.get('id')
            caladd_delete = get_object_or_404(Cal_inner, pk=id )
            caladd_delete.delete()
            

            return Response(status=status.HTTP_204_NO_CONTENT)
        
        elif(request.data.get('mode') == 'inner_edit'):

            id = request.data.get('id')

            caladd_delete = get_object_or_404(Cal_inner, pk=id )

            caladd_delete.cal_name = request.data.get('title_edit')
            caladd_delete.cal_sub = request.data.get('sub_edit')
            caladd_delete.save()
            
            return Response( status=status.HTTP_201_CREATED)

        elif(request.data.get('mode') == 'checked'):

            cal_inner = get_object_or_404(Cal_inner, id=request.data.get('id'))


            id_list = request.data.get('checked')

            for x in id_list:
                store = get_object_or_404(Store, pk=x)
                
                store.cal_name = cal_inner.cal_name
                store.cal_date = cal_inner.created_date
                store.save()

                calstore_created = Cal_store.objects.create(
                cal_name=cal_inner.cal_name,
                cal_sub=cal_inner.cal_sub,
                created_date=cal_inner.created_date,
                cal_store=store,
            )

            
            return Response(status=status.HTTP_201_CREATED)

     

#------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class StoreSearch(APIView):

    def post(self, request):

        store = Store.objects.all()
        
        search_name = request.data.get('search_name') 
        agecy_id = request.data.get('agecy_id')
        submit_date = request.data.get('submit_date')
        now_cate = request.data.get('now_cate')
        cal_cate = request.data.get('cal_cate')

        if search_name:
            store = store.filter(
                Q(store_name__icontains=search_name) | Q(store_tell__icontains=search_name) | Q(store_add__icontains=search_name)
            ).distinct()

        if agecy_id:
            store = store.filter(
                Q(agency_id__icontains=agecy_id) 
            ).distinct()

        if submit_date:
            store = store.filter(
                Q(created_at__icontains=submit_date) 
            ).distinct()

        if now_cate:
            store = store.filter(
                Q(now__icontains=now_cate)
            ).distinct()

    
        serializer = StoreSerializer(store, many=True)


        return Response(serializer.data)

        return Response( status=status.HTTP_201_CREATED)  


class StoreList(APIView):

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

class LevelList(APIView):

    def get(self, request):
        level = Level.objects.all()
       
        serializer = LevelSerializer(level, many=True)
        return Response(serializer.data)

class GroupList(APIView):

    def get(self, request):
        group = Group_user.objects.all()
      
        serializer = GroupSerializer(group, many=True)
        return Response(serializer.data)

class Num_a(APIView):


    def get(self, request):
        
        group = Group_user.objects.all()
        level = Level.objects.all()
        store = Store.objects.all()
        userlist = []

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






        
        for x in agency:

           

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
        for x in store:
            for z in userlist:
                if z['username']==str(x.agency_id):
                    z['counter']=z['counter']+1
            

        data= {
            "userlist":userlist,
            "group":GroupSerializer(group, many=True).data,
            "level":LevelSerializer(level, many=True).data,

        }
        # return Response( status=status.HTTP_201_CREATED)
        return JsonResponse(data, safe=False)

class AgencyList(APIView):

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

        
        if request.data.get('mode')=='get':
            agency = get_object_or_404(User, pk=request.data.get('id'))
            

            data = {
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

class SearchView(APIView):

    def post(self, request):
        
        agency = User.objects.all()
        search_name = request.data.get('search_name')  # 정렬기준
        search_num = request.data.get('search_num')
        select = request.data.get('select')
        search_email = request.data.get('search_email')

        if search_name:
               agency = agency.filter(
                    Q(username__icontains=search_name) | Q(manager_name__icontains=search_name) | Q(agency_name__icontains=search_name)  # 제목검색
               ).distinct()
        
        if search_num:
               agency = agency.filter(
                    Q(agency_tell__icontains=search_num)   # 제목검색
               ).distinct()

        if select:
               agency = agency.filter(
                    Q(state__icontains=select)   # 제목검색
               ).distinct()
        
        if search_email:
               agency = agency.filter(
                    Q(email_addres__icontains=search_email)   # 제목검색
               ).distinct()
        
        
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



class Signupview(APIView):
    
    def post(self, request):
        if request.data.get('mode') == 'under' :
            
            agency = get_object_or_404(User, pk=request.data.get('id'))

            levels=(agency.level.id+1)
            levels = get_object_or_404(Level, id=levels)
            group_link=(agency.group_user)
            divides = get_object_or_404(Division, id=1)

            user_created = User.objects.create(
                group=request.data.get('group'),
                username=request.data.get('username'),
                password=request.data.get('password1'),
                agency_name=request.data.get('agency_name'),
                agency_tell=request.data.get('agency_tell'),
                manager_name=request.data.get('manager_name'),
                email=request.data.get('agency_email'),
                level=levels,
                divide=divides,
                group_user=group_link
            )

            serializer = Useredit(data=request.data, instance=user_created)
            if serializer.is_valid():
                serializer.password =(request.data.get('password1'))
                serializer.save()
            

            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            divides = get_object_or_404(Division, id=1)
            levels = get_object_or_404(Level, id=1)

            group_link = Group_user.objects.create(
                group=request.data.get('group')
                
            )

            

            user_created = User.objects.create(
                group=request.data.get('group'),
                username=request.data.get('username'),

                password=request.data.get('password1'),

                agency_name=request.data.get('agency_name'),
                agency_tell=request.data.get('agency_tell'),
                manager_name=request.data.get('manager_name'),
                email=request.data.get('agency_email'),
                level=levels,
                divide=divides,
                group_user=group_link
            )

            serializer = Useredit(data=request.data, instance=user_created)
            if serializer.is_valid():
                serializer.password =(request.data.get('password1'))
                serializer.save()
            

            return Response(status=status.HTTP_204_NO_CONTENT)

class Agency_del(APIView):

    def post(self, reqeust, format=None):
        pk = reqeust.data.get('id')
        agency = get_object_or_404(User, pk=pk)
        
        agency.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class Store_del(APIView):

    def delete(self, reqeust,pk, format=None):
        store = get_object_or_404(Store, pk=pk)
        
        store.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

            
        
class TabView(APIView):
    def get(self, request):
       
        tabs = Tabs.objects.all()
        serializer = TabsSerializer(tabs, many=True)
        return Response(serializer.data)

    def post(self, request):

        serializer = TabsSerializer(
            data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TabDelete(APIView):


    def delete(self, reqeust, pk, format=None):

        tabs = get_object_or_404(Tabs, pk=pk)

        tabs.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, pk, format=None):
           
            tabs = get_object_or_404(Tabs, pk=pk)
            tabs.title = request.data['title']
            tabs.save()
            return Response( status=status.HTTP_201_CREATED)  

class ReviewDetail(APIView):
    
    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist :
            raise Http404
    
    def get(self, request, pk):
        reviews = Review.objects.all()

        reviews = reviews.filter(tab_id=pk)
        
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def  put(self, reqeust, pk, format=None):
        review = self.get_object(pk)
        serializer = ReviewSerializer(review, data=reqeust.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQEUST)

    def delete(self, reqeust, pk, format=None):
        review = self.get_object(pk)
        review.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)




# Create your views here.




class Front_view(APIView):
    def get(self,pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist :
            raise Http404

    def post(self, request , pk):

        return Response(status=status.HTTP_204_NO_CONTENT)
# -----------------------------------------------공지사항-----------------------------------------------------------
class Notice_view(APIView):
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



    def post(self, request):
        print(request.data.get('notice_cate'))

        if(request.data.get('mode')=='post'):
            if request.data.get('visdis')=='true':
                visdis=True
            else:
                visdis=False            
            if request.data.get('popdis')=='true':
                popdis=True
            else:
                popdis=False
            if request.data.get('important')=='true':
                important=True
            else:
                important=False

            notice_create = Notice.objects.create(
                notice_title=request.data.get('notice_title'),
                visdis=visdis,
                popdis=popdis,
                important=important,
                contents=request.data.get('contents'),
                Notice_cate=request.data.get('notice_cate'),
            )
            print(notice_create.id)
            return JsonResponse(notice_create.id,safe=False)
        
        elif(request.data.get('mode')=='uploade'):
            counter = (request.data.get('counter'))
            print(counter)
            print(request.data.get('id'))
            notice = get_object_or_404(Notice, pk=request.data.get('id'))

            for x in range (int(request.data.get('counter'))):
                print(request.data.get('files'+str(x)).name)
        
            for x in range(int(counter)):

                notice_file = Notice_file.objects.create(
                    file_name = request.data.get('files'+str(x)).name,
                    Notice_file=request.data.get('files'+str(x)),
                    n_file = notice
                )

            notice_file.save()  

            return Response(status=status.HTTP_204_NO_CONTENT)
        
        elif(request.data.get('mode')=='delete'):

            print(request.data.get('id'))
            notice = get_object_or_404(Notice, pk=request.data.get('id'))

            notice.delete();

            print('hi')

            return Response(status=status.HTTP_204_NO_CONTENT)

# -----------------------------------------------파일업로드-----------------------------------------------------------
class Images_view(APIView):
    def post(self, request):
        counter = (request.data.get('counter'))
        store = get_object_or_404(Store, pk=request.data.get('id'))
        # Basedir = (settings.MEDIA_ROOT)
        # name = store.store_name
        # path = (Basedir+'\drfProject/'+str(name))

        # os.makedirs(path, exist_ok=True)
        for x in range (int(request.data.get('counter'))):
            print(request.data.get('files'+str(x)).name)
      
        for x in range(int(counter)):
            # request.data.get('files'+str(x)).name = str(store.id) +'_'+str(datetime.now())+'_'+str(x)+'.jpg'

            images = Images.objects.create(
                title = request.data.get('files'+str(x)).name,
                uploadedFile=request.data.get('files'+str(x)),
                store_id = store
            )

        images.save()  

        return Response(status=status.HTTP_204_NO_CONTENT)




class LoadView(APIView):
    def post(self, request):
        store = get_object_or_404(Store, pk=request.data.get('id'))
        image_list = get_list_or_404(Images, store_id=store )

        url_list = []

        for x in image_list:
            print(x)
            url_list.append(
                {
                    'url':parse.unquote(x.uploadedFile.url),
                    'id':x.id
                }
                
                )
            print(url_list)
        return JsonResponse(url_list,safe=False)
        return Response(status=status.HTTP_204_NO_CONTENT)


class Image_Del_View(APIView):
    def post(self, request):
        image = get_object_or_404(Images, pk=request.data.get('id'))

        print(image.uploadedFile.url)
    
       
        file_path = settings.BASE_DIR
        del_path=(str(file_path)+str(parse.unquote(image.uploadedFile.url)))
        os.remove(del_path)
        image.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)



class FileDownloadView(SingleObjectMixin, APIView):
        
    def post(self, request):
        if request.data.get('mode') == 'down':
            store_id = request.data.get('id')
            store = get_object_or_404(Store,pk=store_id)
            image_list = get_list_or_404(Images, store_id=store )
            Basedir = str(settings.BASE_DIR)
            print(Basedir)
            counter = 0
            list_img = []
            
            for x in image_list:
                print(unquote_plus(x.uploadedFile.url))
                # print(x.title)
                list_img.append(unquote_plus(Basedir+x.uploadedFile.url))

            file_path = settings.MEDIA_ROOT
            with zipfile.ZipFile(file_path + "\\output.zip", "w", compression=zipfile.ZIP_DEFLATED) as new_zip:
            
                for x in list_img:
                    
                    new_zip.write(x,arcname=image_list[counter].title)
                    counter=counter+1
            new_zip.close()

            filename = "/media/output.zip"
           
            return JsonResponse(filename,safe=False)
        
            return Response(status=status.HTTP_204_NO_CONTENT)

        elif request.data.get('mode') == 'del':
            file_path = settings.MEDIA_ROOT
            os.remove(file_path + "\\output.zip")
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        

#---------------------------------------------엑셀 다운로드---------------------------------


def excel_create(filepath):

    store = Store.objects.order_by('-created_time')
        
    wb = openpyxl.Workbook()

    write_ws = wb.active
    write_ws['A1'] = '대리점'
    write_ws['B1'] = '건축사명'
    write_ws['C1'] = '휴대전화'
    write_ws['D1'] = '주소'
    write_ws['E1'] = '지역'
    write_ws['F1'] = '특이사항유무'
    write_ws['G1'] = '검토현황'
    write_ws['H1'] = '최종정산'

    for x in store:
        print(x.cal_date)
        write_ws.append([x.agency_name,x.store_name,x.store_tell,x.store_add,x.state,x.memo,x.now,x.cal_date])

    wb.save(filepath)
    filename = "/media/test.xlsx"
    
    return(filename)



class Excel_Create_View(APIView):
    def post(self, request):
        if request.data.get('mode') == 'create':

            file_path = settings.MEDIA_ROOT
            filepath = file_path+"/test.xlsx"
            
            filename = excel_create(filepath)

            return JsonResponse(filename,safe=False)

        elif request.data.get('mode') == 'del':
            file_path = settings.MEDIA_ROOT
            
            os.remove(file_path + "/test.xlsx")
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_204_NO_CONTENT)

#--------------------------------------------------------대시보드 --------------------------------------------------------------------

class Dash_Admin_view(APIView):
    def get(self,pk):
        agency_count = 0
        store_count = 0
        day_agency_count = 0
        month_agency_count = 0

        agency = User.objects.all();
        store = Store.objects.all();

        for x in agency:
            agency_count = agency_count+1

        for x in store:
            store_count = store_count + 1

        d = datetime.datetime.now()

        for x in store:    
            if x.created_at.month == d.month:
                month_agency_count=month_agency_count+1

            if x.created_at.month == d.month and x.created_at.day == d.day:
                day_agency_count=day_agency_count+1
        
        data_agency  = 0
        list = []
        for x in agency:
            data_agency= 0
            for y in store:
                if y.agency_id == x:
                    data_agency=data_agency+1
            adata = {'name': str(x.agency_name), '실적': data_agency, 'pv': 2400, 'amt': 2400}
        
            list.append(adata)

        data= {
            "agency": agency_count,
            "store": store_count,
            "m_agency":month_agency_count,
            "d_agency":day_agency_count,
            "list": list,
        }
        return JsonResponse(data,safe=False)

    def post(self, request , pk):

        return Response(status=status.HTTP_204_NO_CONTENT)

