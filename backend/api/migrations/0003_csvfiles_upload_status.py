# Generated by Django 5.1 on 2024-08-23 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_csvfiles_product"),
    ]

    operations = [
        migrations.AddField(
            model_name="csvfiles",
            name="upload_status",
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
