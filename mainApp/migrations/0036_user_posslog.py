# Generated by Django 3.1.3 on 2022-09-29 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0035_auto_20220928_1558'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='possLog',
            field=models.BooleanField(default=False),
        ),
    ]
