# Generated by Django 4.2.2 on 2023-07-03 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_merge_0010_event_category_0010_spend_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spend',
            name='date',
            field=models.IntegerField(default=0),
        ),
    ]