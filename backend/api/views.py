from django.db.models import Q
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,ProductSerializer,FilesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Product
import pandas as pd



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UploadCsvView(generics.CreateAPIView):
    serializer_class = FilesSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            csv_file = self.request.FILES['csv_file']
            df = pd.read_csv(csv_file)
            print(csv_file)
            for row in df.values:
                print(row)
                Product.objects.create(store_id= row[0],
                                sku=row[1],
                                product_name=row[2],
                                price=row[3],
                                date=row[4])
            serializer.save(upload_status = "success")
        else:
            serializer.save(upload_status = "failure")
            print(serializer.errors)

class SearchProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all().order_by('id') 
        filter_params = self.request.query_params.dict()
        for key, value in filter_params.items():
                queryset = queryset.filter(**{key : value})
        return queryset
       
class ProductEditView(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'pk'

class ProductDeleteView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()


   

   
  
       
      

    




