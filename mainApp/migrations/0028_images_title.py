# Generated by Django 3.1.3 on 2022-06-15 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0027_auto_20220615_1523'),
    ]

    operations = [
        migrations.AddField(
            model_name='images',
            name='title',
            field=models.CharField(default='', max_length=300),
        ),
    ]
