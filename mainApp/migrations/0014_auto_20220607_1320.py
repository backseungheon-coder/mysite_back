# Generated by Django 3.1.3 on 2022-06-07 04:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0013_uploadimg'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='email_addres',
            new_name='email_address',
        ),
    ]
