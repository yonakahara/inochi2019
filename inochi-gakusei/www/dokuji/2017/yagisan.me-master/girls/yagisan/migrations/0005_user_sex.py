# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-08 23:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yagisan', '0004_question_questionuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='sex',
            field=models.IntegerField(null=True),
        ),
    ]