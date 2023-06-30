from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Event(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users', default='', null = True)
    content = models.CharField(max_length=50)
    start_date = models.DateField()
    finish_date = models.DateField()
    cost = models.IntegerField()