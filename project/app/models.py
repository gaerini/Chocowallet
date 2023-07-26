from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import datetime

# Create your models here.
class Event(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users', default='', null = True)
    content = models.CharField(blank=True, max_length=50)
    memo = models.TextField(blank=True)
    start_date = models.DateField()
    finish_date = models.DateField()
    cost = models.IntegerField(null=True, blank=True, default=0)
    category = models.CharField(max_length=50, default='')

    def __str__(self):
        return f'{self.author}-{self.content}'
    
    def to_dict(self):
        return {
            'content': self.content, 
            'start_date': self.start_date.isoformat(), 
            'finish_date': self.finish_date.isoformat(),
            'cost' : self.cost,
            'event_pk': self.pk,
            'memo' : self.memo,
            'category': self.category,
        }

class Spend(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_for_spend', default='')
    date = models.IntegerField(default=00000000)
    spend = models.IntegerField()

    def toDict(self):
        return {
            'date': self.date, 
            'spend': self.spend,
            'spend_pk': self.pk
        }