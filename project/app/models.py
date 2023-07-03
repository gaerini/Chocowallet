from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Event(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users', default='', null = True)
    content = models.CharField(max_length=50)
    start_date = models.DateField()
    finish_date = models.DateField()
    cost = models.IntegerField()

    def __str__(self):
        return f'{self.author}-{self.content}'
    
    def to_dict(self):
        return {
            'content': self.content, 
            'start_date': self.start_date.isoformat(), 
            'finish_date': self.finish_date.isoformat(),
            'cost' : self.cost
        }

class Spend(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_for_spend', default='')
    date = models.IntegerField(default=1)
    spend = models.IntegerField()

    def toDict(self):
        return {
            'date': self.date, 
            'spend': self.spend 
        }