from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
   store_id = models.CharField(max_length=255)
   sku = models.CharField(max_length=255)
   product_name = models.CharField(max_length=255)
   price = models.DecimalField(max_digits=10, decimal_places=2)
   date = models.DateField() 

   def __str__(self):
        return self.product_name
   
class CSVFiles(models.Model):
    csv_file = models.FileField(upload_to = 'data/csvfile')
    upload_status = models.CharField(max_length=255)

    def __str__(self):
        return self.csv_file








