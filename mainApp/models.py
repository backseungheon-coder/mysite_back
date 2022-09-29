from asyncore import write
from pyexpat import model
from statistics import mode
from turtle import title, update
from django.db import models
from datetime import date
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
import os
from ckeditor.fields import RichTextField

class Tabs(models.Model):
    title = models.TextField(null=False,blank=False)
   

class Review(models.Model):

    tab_id = models.ForeignKey(Tabs, on_delete=models.CASCADE)
    content = models.TextField(null=True,blank=True)
    update_at = models.CharField(null=True, blank=True,max_length=200)
    update_date = models.DateField(auto_now=True)
    

class Division(models.Model):
    divide = models.TextField(max_length=10)
    def __str__(self):
        return self.divide


class Level(models.Model):
    levels = models.TextField(max_length=10)
    def __str__(self):
        return self.levels

class Group_user(models.Model):
    group  = models.CharField(max_length=10)


class User(AbstractUser):
    level = models.ForeignKey(Level, on_delete=models.CASCADE,null=True, blank=True)
    divide = models.ForeignKey(Division, on_delete=models.CASCADE,null=True, blank=True)
    group_user = models.ForeignKey(Group_user, on_delete=models.CASCADE,null=True, blank=True)
    agency_name = models.CharField(max_length=300,null=True, blank=True) #대리점명
    manager_name = models.CharField(max_length=300,null=True, blank=True) #담당자명
    agency_tell = models.CharField(max_length=300,null=True,blank=True) # 휴대전화
    certi_num = models.CharField(max_length=300,null=True,blank=True) # 인증번호
    store_count = models.IntegerField(null=True)
    state = models.CharField(max_length=10, default='정상') #대리점명

    needed_agreement = models.BooleanField(default=False)
    marketing_agreement = models.BooleanField(default=False)

    possLog = models.BooleanField(default=False)
    groups = None
    first_name = None
    last_name = None
    user_permissions = None
    email_address = models.EmailField( max_length=254,null=True,blank=True)



class Group(models.Model):
    group = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)

#검토현황
class Store_now(models.Model):
    now = models.CharField(max_length=300,null=True,blank=True)

    def __str__(self):
        return self.now

# 지역 정보
class K_State(models.Model):
    state = models.CharField(max_length=300,null=True,blank=True)

    def __str__(self):
        return self.state

class Uploadimg(models.Model):
    img_name = models.CharField(max_length=300)
    files = models.FileField(upload_to="documnet", null=True)
    upload_at = models.DateField(auto_now=True) 


    


 #가맹점 정보   
class Store(models.Model):
    
    
    agency_id = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    agency_name = models.CharField(max_length=300,null=False,blank=False)
    store_name = models.CharField(max_length=300,null=False,blank=False)
    store_tell = models.CharField(max_length=300,null=False,blank=False)
    store_add = models.CharField(max_length=300,null=False,blank=False)
    memo = models.TextField(null=True,blank=True)
    created_time = models.DateTimeField(default = timezone.now)
    created_at = models.DateField(default=date.today)
    now = models.CharField(max_length=300,null=False,blank=False,default='대기')
    now_memo = models.TextField(null=True,blank=True)
    state = models.CharField(max_length=300,null=False,blank=False)
    cal_name = models.CharField(max_length=300,null=True,blank=False)
    cal_date=models.DateField(null=True,blank=True)


    def __str__(self):
        return self.store_name


class Cal_store(models.Model):
    created_date = models.DateField(default=date.today)
    cal_name = models.CharField(max_length=300,null=False,blank=False,default='')
    cal_sub = models.CharField(max_length=300,null=False,blank=False,default='')
    cal_store = models.ForeignKey(Store, on_delete=models.CASCADE,null=True, blank=True)




class Requests(models.Model):
    request_id = models.ForeignKey(Store, on_delete=models.CASCADE,default=0)
    title = models.CharField(max_length=300,null=False,blank=False,default='')
    contents = models.TextField(null=True,blank=True,default='')
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)

    def __str__(self):
        return self.title

class Comments(models.Model):
    comments_id = models.ForeignKey(Requests, on_delete=models.CASCADE)
    contents = models.TextField(null=True,blank=True,default='')
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)




class FAQ(models.Model):
    faq_title = models.CharField(max_length=300,null=False,blank=False)
    contents =  models.TextField(null=True,blank=True)
    visdis = models.CharField(max_length=300,null=False,blank=False,default='1')
    answer = models.BooleanField(default=True)
    created_date = models.DateField(default=date.today)
    modified_date = models.DateField(default=date.today)
    faq_catego = models.TextField(null=True,blank=True,default='')


class FAQ_cate(models.Model):
    faq_cate_title = models.CharField(max_length=300,null=False,blank=False,default='')
    FAQ = models.ForeignKey(FAQ, on_delete=models.CASCADE,null=True, blank=True)
    




class Notice(models.Model):
    notice_title = models.CharField(max_length=300,null=False,blank=False,default='')
    visdis = models.BooleanField(default=True)
    popdis = models.BooleanField(default=True)
    important = models.BooleanField(default=True)
    contents = RichTextField()
    created_date = models.DateField(default=date.today)
    modified_date = models.DateField(default=date.today)
    Notice_cate = models.CharField(max_length=300,null=False,blank=False,default='')
    
class Notice_file(models.Model):
    Notice_file = models.FileField(upload_to = "Notice_project/")
    file_name = models.CharField(max_length=300,null=False,blank=False,default='')
    n_file = models.ForeignKey(Notice, on_delete=models.CASCADE,null=True, blank=True)



class CalAdd(models.Model):
    cal_title = models.CharField(max_length=300,null=False,blank=False,default='')

class Cal_inner(models.Model):
    created_date = models.DateField(default=date.today)
    cal_name = models.CharField(max_length=300,null=False,blank=False,default='')
    cal_sub = models.CharField(max_length=300,null=False,blank=False,default='')
    cal_inner = models.ForeignKey(CalAdd, on_delete=models.CASCADE,null=True, blank=True)
    

class Images(models.Model):
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    title= models.CharField(max_length=300,null=False,blank=False,default='')
    uploadedFile = models.FileField(upload_to = "drfProject/")
    dateTimeOfUpload = models.DateTimeField(auto_now = True)
