# Generated by Django 4.2.2 on 2023-07-10 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_alter_event_finish_date_alter_event_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='cost',
            field=models.IntegerField(default=0),
        ),
    ]