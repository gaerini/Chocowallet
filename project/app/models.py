from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Event(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')
    content = models.CharField(max_length=50)
    date = models.DateField()
    cost = models.IntegerField()
    