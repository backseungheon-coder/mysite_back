from django.urls import path,include
from rest_framework.urlpatterns import format_suffix_patterns
from .views.admin_views import StoreList, StoreSearch,ReviewDetail,Excel_Create_View,Dash_Admin_view,Image_Del_View,Notice_view,TabView,TabDelete,LoadView,FileDownloadView,Num_a,Images_view,Store_del,AgencyList,LevelList,GroupList,Signupview,Agency_del,SearchView,CommentList,Cal_list,FAQ_list,Login_view
from .views.front_view import Dash_Front_view,front_Notice_view,Front_StoreList,front_AgencyList,front_Num_a,fornt_SearchView,fornt_StoreSearchView
from .views.main_views import mian_view_test
from django.conf.urls.static import static
from django.conf import settings
from . import views


urlpatterns = [

  
    #store
    path('manager/store/', StoreList.as_view()),
    path('manager/store_search/', StoreSearch.as_view()),
    path('manager/comments/', CommentList.as_view()),
    path('manager/store_del/<int:pk>', Store_del.as_view()),
    path('manager/tab_review/', TabView.as_view()),
    path('manager/tab_review/<int:pk>', TabDelete.as_view()),
    path('manager/review/<int:pk>', ReviewDetail.as_view()),

    #agency
    path('manager/agency/', AgencyList.as_view()),
    path('manager/agency_del/', Agency_del.as_view()),
    path('manager/agency/level', LevelList.as_view()),
    path('manager/agency/groups', GroupList.as_view()),
    path('manager/signup/', Signupview.as_view()),
    path('manager/search/', SearchView.as_view()),


    path('manager/agency_num/', Num_a.as_view()),
    #Cal
    path('manager/Cal/', Cal_list.as_view()),
    #FAQ
    path('manager/FAQ/', FAQ_list.as_view()),
    path('manager/FAQ/search/', FAQ_list.as_view()),

    path("manager/upload/", Images_view.as_view()),
    path("manager/fileread/", LoadView.as_view()),
    path("manager/img_del/", Image_Del_View.as_view()),
    path('manager/download/',
         FileDownloadView.as_view()),

    #Notice
    path("manager/notice/create/", Notice_view.as_view()),
    path("manager/notice/get/", Notice_view.as_view()),
    path("manager/notice/up/", Notice_view.as_view()),
    path("manager/notice/search/", Notice_view.as_view()),


    path("manager/create/excel/",Excel_Create_View.as_view()),

    #Dash
    path("manager/dash/",Dash_Admin_view.as_view()),

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
    path('front/store_search/', fornt_StoreSearchView.as_view()),
    
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