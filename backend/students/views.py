from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView , ListCreateAPIView
from rest_framework.views import APIView
from django.http.response import JsonResponse , Http404
from rest_framework.response import Response


# Create your views here.

# class allEditStudent(RetrieveUpdateDestroyAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
#     lookup_field = 'studentid'
    
# class listCreateApiView(ListCreateAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
    

class StudentView(APIView):
    
    def post(self, request):
        data = request.data 
        serializer = StudentSerializer(data = data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Create successfully", safe=False)
        return JsonResponse("False to add student", safe=False)
    
    def retreive_student(self, pk):
        try:
            student = Student.objects.get(studentid = pk)
            return student
        except:
            return JsonResponse("Failed", safe=False)
    
    def get(self, request, pk=None):
        
        if pk:
            data = self.retreive_student(pk)
            serializer = StudentSerializer(data)
        else:
            data = Student.objects.all()
            serializer = StudentSerializer(data, many =True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        student_update = Student.objects.get(studentid=pk)
        serializer = StudentSerializer(instance=student_update, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated successfully", safe=False)
        return JsonResponse("Failed to student updated")
    
    def delete(self,request, pk=None):
        student_delete = Student.objects.get(studentid=pk)
        student_delete.delete()
        return JsonResponse("Student deleted successfully", safe=False)