from django.urls import path,include
from rest_framework.urlpatterns import format_suffix_patterns
from .views.admin_views import StoreList, ReviewDetail,Excel_Create_View,Dash_Admin_view,Image_Del_View,Notice_view,TabView,TabDelete,LoadView,FileDownloadView,Num_a,Images_view,Store_del,AgencyList,LevelList,GroupList,Signupview,Agency_del,SearchView,CommentList,Cal_list,FAQ_list,Login_view
from .views.front_view import Dash_Front_view,front_Notice_view,Front_StoreList,front_AgencyList,front_Num_a,fornt_SearchView,fornt_StoreSearchView
from django.conf.urls.static import static
from django.conf import settings
from . import views


urlpatterns = [

    path('admin/store/', StoreList.as_view()),
    path('admin/comments/', CommentList.as_view()),
    path('admin/store_del/<int:pk>', Store_del.as_view()),
    path('admin/tab_review/', TabView.as_view()),
    path('admin/tab_review/<int:pk>', TabDelete.as_view()),
    path('admin/review/<int:pk>', ReviewDetail.as_view()),

    #agency
    path('admin/agency/', AgencyList.as_view()),
    path('admin/agency_del/', Agency_del.as_view()),
    path('admin/agency/level', LevelList.as_view()),
    path('admin/agency/groups', GroupList.as_view()),
    path('admin/signup/', Signupview.as_view()),
    path('admin/search/', SearchView.as_view()),

    path('admin/agency_num/', Num_a.as_view()),

    #Cal
    path('admin/Cal/', Cal_list.as_view()),

    #FAQ
    path('admin/FAQ/', FAQ_list.as_view()),

    path("admin/upload/", Images_view.as_view()),
    path("admin/fileread/", LoadView.as_view()),
    path("admin/img_del/", Image_Del_View.as_view()),
    path('admin/download/',
         FileDownloadView.as_view()),

    #Notice
    path("admin/notice/create/", Notice_view.as_view()),
    path("admin/notice/get/", Notice_view.as_view()),
    path("admin/notice/up/", Notice_view.as_view()),


    path("admin/create/excel/",Excel_Create_View.as_view()),

    #Dash
    path("admin/dash/",Dash_Admin_view.as_view()),

#------------------------------------------------------------프론트-------------------------------------------------------

    path("front/dash/",Dash_Front_view.as_view()),
    path("front/notice/get/", front_Notice_view.as_view()),
    path("front/store/", Front_StoreList.as_view()),
    path("front/agency/", front_AgencyList.as_view()),
    
    path("front/upload/", Images_view.as_view()),
    path("front/fileread/", LoadView.as_view()),
    path("front/img_del/", Image_Del_View.as_view()),
    path('front/download/',FileDownloadView.as_view()),
    path('front/comments/', CommentList.as_view()),

    path('front/store_del/<int:pk>', Store_del.as_view()),
    path('front/tab_review/', TabView.as_view()),
    path('front/tab_review/<int:pk>', TabDelete.as_view()),
    path('front/review/<int:pk>', ReviewDetail.as_view()),
    path('front/Cal/', Cal_list.as_view()),


    #agency
    path('front/agency/', AgencyList.as_view()),
    path('front/agency_del/', Agency_del.as_view()),
    path('front/agency/level', LevelList.as_view()),
    path('front/agency/groups', GroupList.as_view()),
    path('front/signup/', Signupview.as_view()),
    path('front/search/', fornt_SearchView.as_view()),
    path('front/store/search', fornt_StoreSearchView.as_view()),

    path('front/agency_num/', front_Num_a.as_view()),

    path('front/FAQ/', FAQ_list.as_view()),


    path("front/create/excel/",Excel_Create_View.as_view()),


]

if settings.DEBUG: 
    urlpatterns += static(
        settings.MEDIA_URL, 
        document_root = settings.MEDIA_ROOT
    )

urlpatterns = format_suffix_patterns(urlpatterns)