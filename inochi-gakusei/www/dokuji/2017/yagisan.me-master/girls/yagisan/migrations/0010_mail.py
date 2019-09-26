# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-31 23:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('yagisan', '0009_dialogueuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='Mail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('situation', models.CharField(max_length=150)),
                ('expression_first_text', models.CharField(max_length=50)),
                ('expression_first_strength', models.IntegerField()),
                ('expression_second_text', models.CharField(max_length=50)),
                ('expression_second_strength', models.IntegerField()),
                ('expression_third_text', models.CharField(max_length=50)),
                ('expression_third_strength', models.IntegerField()),
                ('moment_idea_text', models.CharField(max_length=150)),
                ('moment_idea_strength', models.IntegerField()),
                ('reason', models.CharField(max_length=150)),
                ('contradiction', models.CharField(max_length=150)),
                ('adaptive_thinking', models.CharField(max_length=150)),
                ('after_expression_first_strength', models.IntegerField()),
                ('after_expression_second_strength', models.IntegerField()),
                ('after_expression_third_strength', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='yagisan.User')),
            ],
        ),
    ]
