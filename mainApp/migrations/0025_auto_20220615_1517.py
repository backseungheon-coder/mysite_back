# Generated by Django 3.1.3 on 2022-06-15 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0024_auto_20220615_1406'),
    ]

    operations = [
        migrations.AlterField(
            model_name='images',
            name='uploadedFile',
            field=models.FileField(upload_to='<django.db.models.fields.related.ForeignKey>/'),
        ),
    ]
