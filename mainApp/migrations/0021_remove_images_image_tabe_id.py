# Generated by Django 3.1.3 on 2022-06-15 04:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0020_auto_20220615_1346'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='images',
            name='image_tabe_id',
        ),
    ]
