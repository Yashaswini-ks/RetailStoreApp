from django.urls import path
from . import views

urlpatterns = [
    path("upload/", views.UploadCsvView.as_view(), name="upload-csv"),
    path("product/search/",views.SearchProductView.as_view(), name="search-product"),
    path("product/edit/<int:pk>/",views.ProductEditView.as_view(), name="edit-product")
]