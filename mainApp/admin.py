from cProfile import Profile
from django.contrib import admin
from .models import Review,Tabs,Store,Store_now,Images,K_State,User,Level,Division,Group_user,Requests,Comments,Notice_file,Notice,Cal_inner,CalAdd,FAQ_cate,FAQ,Cal_store
from django.contrib.auth.models import AbstractUser


# Register your models here.

class Review_admin(admin.TabularInline):
    model = Review

class Store_admin(admin.TabularInline):
    model = Store


class TabAdmin(admin.ModelAdmin):
    inlines = [Review_admin]


#---------------------------------------------공지사항--------------------------------------------------

class Notice_file_admin(admin.TabularInline):
    model = Notice_file

class NoticeAdmin(admin.ModelAdmin):
    inlines = [Notice_file_admin]
#---------------------------------------------공지사항--------------------------------------------------


#---------------------------------------------Cal--------------------------------------------------
class Cal_inner_admin(admin.TabularInline):
    model = Cal_inner


class CalAdmin(admin.ModelAdmin):
    inlines = [Cal_inner_admin,]
# ---------------------------------------------Cal--------------------------------------------------

class Store_admin(admin.TabularInline):
    model = Store


class User_admin(admin.ModelAdmin):
    inlines = [Store_admin,]

#---------------------------------------------FAQ--------------------------------------------------

#---------------------------------------------FAQ--------------------------------------------------

#---------------------------------------------Store--------------------------------------------------

class Image_admin(admin.TabularInline):
    model = Images

class Cal_sotre_admin(admin.TabularInline):
    model = Cal_store


class Store_admin(admin.ModelAdmin):
    inlines = [Cal_sotre_admin,Image_admin]

#---------------------------------------------Store--------------------------------------------------

#---------------------------------------------파일 업로드--------------------------------------------------
# class Image_admin(admin.TabularInline):
#     model = Images

# class Image_Table_admin(admin.ModelAdmin):
#     inlines = [Image_admin]
#---------------------------------------------업로드--------------------------------------------------

admin.site.register(Notice, NoticeAdmin)
admin.site.register(FAQ)
admin.site.register(CalAdd,CalAdmin )
# admin.site.register(Tabs, TabAdmin)
# admin.site.register(Level)
# admin.site.register(Division)
# admin.site.register(Group_user)
admin.site.register(Cal_store)
admin.site.register(User,User_admin)
admin.site.register(Store,Store_admin )
admin.site.register(Requests )
admin.site.register(Comments )
admin.site.register(Images )

