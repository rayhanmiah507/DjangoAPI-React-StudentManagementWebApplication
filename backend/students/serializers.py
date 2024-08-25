from .models import Student
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields =['studentid',
                 'firstName',
                 'lastName',
                 'registrationNo',
                 'email',
                 'course'
                 ]