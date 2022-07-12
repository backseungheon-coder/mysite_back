from venv import create


from rest_framework import serializers
from .models import  Images, Review,Tabs,Store,Store_now,Notice,K_State,User,Level,Group,Requests,Comments,CalAdd,FAQ,Cal_inner,Tabs
from django.contrib.auth.forms import UserCreationForm


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review 
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id','tab_id','content','update_at','update_date')


class TabsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tabs
        fields = ('id','title',)

class StoreadminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('store_name','store_tell','store_add','memo','state','now','created_at')

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('id','agency_id','agency_name','store_name','store_tell','store_add','memo','state','created_at','now_memo','now','cal_date','cal_name')

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','level','divide','group_user','agency_name','manager_name','agency_tell','last_login','group_user','date_joined','username','state')

class MemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('memo')

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ('id','levels')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id','group')

class GroupcreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('group',)

class UserForm(UserCreationForm):
    email = serializers.EmailField(label="이메일")

    class Meta:
        model = User
        fields = ("username", "password1","password2","agency_name",'agency_tell','manager_name','email','divide','level','group_user')

class Useredit(UserCreationForm):
    email = serializers.EmailField(label="이메일")

    class Meta:
        model = User
        fields = ("password",)

class RequestForm(serializers.ModelSerializer):

    class Meta:
        model = Requests
        fields = ('id','title','contents','writer','date')



class CommentsForm(serializers.ModelSerializer):

    class Meta:
        model = Comments
        fields = ('id','contents','writer','date')



class Cal_get_Form(serializers.ModelSerializer):

    class Meta:
        model = CalAdd
        fields = ('id','cal_title')


class FAQ_get_Form(serializers.ModelSerializer):

    class Meta:
        model = FAQ
        fields = ('id','faq_title','contents','answer','visdis','faq_catego','created_date','modified_date')

class FAQ_create_Form(serializers.ModelSerializer):

    class Meta:
        model = FAQ
        fields = ('faq_title','contents','visdis','faq_catego')

class Cal_create_Form(serializers.ModelSerializer):

    class Meta:
        model = CalAdd
        fields = ('cal_title',)

class Cal_get_inner_Form(serializers.ModelSerializer):

    class Meta:
        model = Cal_inner
        fields = ('id','cal_name','cal_sub','created_date',)

class DocumentForm(serializers.ModelSerializer):

     class Meta:
        model = Images
        fields = ('uploadedFile',)

class Notice_get_Form(serializers.ModelSerializer):

    class Meta:
        model = Notice
        fields = ('notice_title','visdis','popdis','important','contents','created_date','Notice_cate',)