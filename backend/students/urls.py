
from django.urls import path
from .views import *

urlpatterns = [
    # path('student/<int:studentid>/', allEditStudent.as_view()),
    # path('student/', listCreateApiView.as_view()),
    path('students/', StudentView.as_view()),
    path('students/<int:pk>/', StudentView.as_view()),
   
]
