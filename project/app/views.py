from django.shortcuts import render, redirect
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Event
import datetime

# Create your views here.

def login(request):
    if request.method == 'POST':
        username = request.POST['id']
        password = request.POST['pw']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('cover')
        error = "아이디 또는 비밀번호가 틀립니다"
        return render(request, 'registration/login.html', {"error":error})
    return render(request, 'registration/login.html')

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
        auth.login(request, new_user)

        return redirect('cover')
    return render(request, 'registration/signup.html')

def cover(request):
    return render(request, 'cover.html')

@login_required(login_url='/registration/login/')
def calendar(request, user_pk):
    user = User.objects.get(pk=user_pk)
    
    if request.method == 'POST':
        Event.objects.create(
            author=user,
            content=request.POST['content'],
            date=datetime(request.POST['date']),
            cost = request.POST['cost'],
        )
    
    events = Event.objects.get(author=user.id)

    return render(request, 'calendar.html', {"events":events})
