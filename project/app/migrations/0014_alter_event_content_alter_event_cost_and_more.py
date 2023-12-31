# Generated by Django 4.2.2 on 2023-07-10 06:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_event_memo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='content',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='event',
            name='cost',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='finish_date',
            field=models.DateField(default=datetime.datetime(2023, 7, 10, 15, 38, 6, 755984)),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_date',
            field=models.DateField(default=datetime.datetime(2023, 7, 10, 15, 38, 6, 755984)),
        ),
    ]
