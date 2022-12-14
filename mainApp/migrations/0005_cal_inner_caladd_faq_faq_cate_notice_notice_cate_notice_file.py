# Generated by Django 3.1.3 on 2022-05-20 04:24

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0004_auto_20220518_1741'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cal_inner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateField(default=datetime.date.today)),
                ('cal_name', models.CharField(default='', max_length=300)),
                ('cal_sub', models.CharField(default='', max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('faq_title', models.CharField(default='', max_length=300)),
                ('contents', models.TextField(blank=True, default='', null=True)),
                ('visdis', models.BooleanField(default=True)),
                ('created_date', models.DateField(default=datetime.date.today)),
                ('modified_date', models.DateField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name='Notice_cate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Notice_cate_title', models.CharField(default='', max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Notice_file',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Notice_file', models.FileField(upload_to='')),
                ('file_name', models.CharField(default='', max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notice_title', models.CharField(default='', max_length=300)),
                ('visdis', models.BooleanField(default=True)),
                ('popdis', models.BooleanField(default=True)),
                ('contents', models.TextField(blank=True, default='', null=True)),
                ('created_date', models.DateField(default=datetime.date.today)),
                ('modified_date', models.DateField(default=datetime.date.today)),
                ('n_file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainApp.notice_file')),
                ('notice_cate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainApp.notice_cate')),
            ],
        ),
        migrations.CreateModel(
            name='FAQ_cate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('faq_cate_title', models.CharField(default='', max_length=300)),
                ('FAQ', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainApp.faq')),
            ],
        ),
        migrations.CreateModel(
            name='CalAdd',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cal_title', models.CharField(default='', max_length=300)),
                ('cal_inner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainApp.cal_inner')),
            ],
        ),
    ]
