# Generated by Django 4.2.2 on 2023-07-02 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_alter_spend_spend'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='category',
            field=models.CharField(default='', max_length=50),
        ),
    ]
