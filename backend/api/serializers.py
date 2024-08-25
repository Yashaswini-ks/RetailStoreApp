from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product,CSVFiles



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id","store_id", "sku", "product_name", "price", "date"]
        extra_kwargs = {"store_id": {"read_only": True}}

class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVFiles
        fields = ["id","csv_file","upload_status"]
        extra_kwargs = {"upload_status": {"read_only": True}}


         