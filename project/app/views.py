from django.shortcuts import render, redirect
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from .models import Event, Spend
import datetime

# Create your views here.

def logout(request):
    auth.logout(request)
    return redirect('cover')

def signup(request):
    if request.method == 'POST':
        username = request.POST['id']
        password = request.POST['pw']

        exist_user = User.objects.filter(username=username)

        if exist_user:
            error = "이미 존재하는 유저입니다."
            return render(request, 'registration/signup.html', {"error":error})
        
        new_user = User.objects.create_user(username=username, password=password)
        first_event = Event.objects.create(
            author= new_user,
            content = ' ',
            date = '1900-12-12',
            cost = 0,
        )
        auth.login(request, new_user, backend ="django.contrib.auth.backends.ModelBackend")

        return redirect('cover')
    return render(request, 'registration/signup.html')

def cover(request):
    if request.method == 'POST':
        username = request.POST['id']
        password = request.POST['pw']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user, backend ="django.contrib.auth.backends.ModelBackend")
            return redirect('cover')
        error = "아이디 또는 비밀번호가 틀립니다"
        return render(request, 'cover.html', {"error":error})
    return render(request, 'cover.html')

@login_required(login_url='/registration/login/')
def calendar(request, user_pk):
    user = User.objects.get(pk=user_pk)
    
    events = Event.objects.filter(author=user.id)
    first_thing = events.first()
    
    sum = events.aggregate(Sum('cost'))
    expected_cost = sum['cost__sum']

    if request.method == 'POST':
        Event.objects.create(
            author=request.user,
            content=request.POST['content'],
            date = request.POST['date'], #수정해야함
            cost = request.POST['cost'],
        )
        return redirect('calendar', user_pk)

    return render(request, 'calendar.html', {"events":events, "first_thing":first_thing, "expected_cost":expected_cost})

