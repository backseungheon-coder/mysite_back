from django.urls import path,include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import StoreList, ReviewDetail,Excel_Create_View,Dash_Admin_view,Image_Del_View,Notice_view,TabView,TabDelete,LoadView,FileDownloadView,Num_a,Images_view,Store_del,AgencyList,LevelList,GroupList,Signupview,Agency_del,SearchView,CommentList,Cal_list,FAQ_list,Login_view
from django.conf.urls.static import static
from django.conf import settings
from . import views


urlpatterns = [



    path('store/', StoreList.as_view()),
    path('comments/', CommentList.as_view()),
    path('store_del/<int:pk>', Store_del.as_view()),
    path('tab_review/', TabView.as_view()),
    path('tab_review/<int:pk>', TabDelete.as_view()),
    path('review/<int:pk>', ReviewDetail.as_view()),



    #agency

    path('agency/', AgencyList.as_view()),
    path('agency_del/', Agency_del.as_view()),
    path('agency/level', LevelList.as_view()),
    path('agency/groups', GroupList.as_view()),
    path('signup/', Signupview.as_view()),
    path('search/', SearchView.as_view()),

    path('agency_num/', Num_a.as_view()),

    #Cal
    path('Cal/', Cal_list.as_view()),

    #FAQ
    path('FAQ/', FAQ_list.as_view()),

    path("upload/", Images_view.as_view()),
    path("fileread/", LoadView.as_view()),
    path("img_del/", Image_Del_View.as_view()),
    path('download/',
         FileDownloadView.as_view()),

    #Notice
    path("notice/create/", Notice_view.as_view()),
    path("notice/get/", Notice_view.as_view()),
    path("notice/up/", Notice_view.as_view()),


    path("create/excel/",Excel_Create_View.as_view()),

    #Dash
    path("dash/",Dash_Admin_view.as_view()),

]

if settings.DEBUG: 
    urlpatterns += static(
        settings.MEDIA_URL, 
        document_root = settings.MEDIA_ROOT
    )

urlpatterns = format_suffix_patterns(urlpatterns)