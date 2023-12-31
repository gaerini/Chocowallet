from django.shortcuts import render, redirect
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from .models import Event, Spend
import datetime
import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

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
            start_date = '1900-12-12',
            finish_date = '1900-12-13',
            cost = 0,
        )
        first_spend = Spend.objects.create(
            author = new_user,
            date = 19001212,
            spend = 0,
        )
        auth.login(request, new_user, backend ="django.contrib.auth.backends.ModelBackend")

        welcome = "가입되었습니다!"
        return render(request, 'cover.html', {'welcome': welcome})
    
    return render(request, 'registration/signup.html')

def cover(request):
    if request.method == 'POST':
        username = request.POST['id']
        password = request.POST['pw']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user, backend="django.contrib.auth.backends.ModelBackend")

            if 'user_pk' in request.POST:
                user_pk = request.POST['user_pk']
                return redirect('calendar', user_pk)
            else:
                return redirect('calendar', user.pk)
        else:
            error = "아이디 또는 비밀번호가 틀립니다"
            return render(request, 'cover.html', {"error":error})

    return render(request, 'cover.html')


@login_required(login_url='/registration/login/')
def calendar(request, user_pk):
    user = User.objects.get(pk=user_pk)

    events = Event.objects.filter(author=user.id)
    first_thing = events.first()
    
    cost_sum = events.aggregate(Sum('cost'))
    expected_cost = cost_sum['cost__sum']
    
    realSpends = Spend.objects.filter(author=user) 
    spend_sum = realSpends.aggregate(Sum('spend'))
    sumForRealSpend = spend_sum['spend__sum'] or 0

    if request.method == 'POST':
        Event.objects.create(
            author=request.user,
            content=request.POST['content'],
            start_date = request.POST['start_date'],
            finish_date = request.POST['finish_date'],
            cost = request.POST['cost'],
            category = request.POST['category'],
            memo = request.POST['memo'],
        )

        return redirect('calendar', user_pk)
    
    events_list_ = [event.to_dict() for event in events]
    events_list = json.dumps(events_list_) 

    spend_list_ = [spend.toDict() for spend in realSpends]
    spends_list = json.dumps(spend_list_)
    spendCount = json.dumps(realSpends.count())

    print(events_list)

    return render(request, 'calendar.html', {"events":events, "events_list":events_list, "realSpends":realSpends, "spends_list":spends_list, "spendCount":spendCount, "first_thing":first_thing, "expected_cost":expected_cost, "sumForRealSpend":sumForRealSpend})


def spend(request):
    user = request.user
    user_pk = user.pk

    realSpends = Spend.objects.filter(author=user) 

    spend_sum = realSpends.aggregate(Sum('spend'))
    sumForRealSpend = spend_sum['spend__sum']

    if request.method == "POST":
        Spend.objects.create(
            author=request.user,
            spend = request.POST['spend'],
            date = request.POST['date'],
        )

        return redirect('calendar', user_pk)
    
    spend_list_ = [spend.toDict() for spend in realSpends]
    spends_list = json.dumps(spend_list_) 
    
    return render(request, 'calendar.html', {"sumForRealSpend":sumForRealSpend, "spends_list":spends_list})

def delete_event(request, event_pk):
    user = request.user
    user_pk = user.pk
    
    event = Event.objects.get(id=event_pk)
    event.delete()

    return redirect('calendar', user_pk)

@csrf_exempt
def edit(request, event_pk):
    user = request.user
    user_pk = user.pk

    event = Event.objects.get(pk=event_pk)
    
    if request.method == "POST":
        event = Event.objects.filter(pk=event_pk).update(  
            author = request.user,
            content = request.POST['content'],
            start_date = request.POST['start_date'],
            finish_date = request.POST['finish_date'],
            cost = request.POST['cost'],
            category = request.POST['category'],
            memo = request.POST['memo'],
        )
        return redirect('calendar', user_pk)

    events_list = [{
        'content' : event.content,
        'start_date': event.start_date.strftime('%y%m%d'),
        'finish_date':event.finish_date.strftime('%y%m%d'),
        'cost': event.cost,
        'category': event.category,
        'memo': event.memo
    }]
    
    event_list = json.dumps(events_list)

    return render(request, 'edit.html', {'user_pk':user_pk, 'event':event,"event_list":event_list})
    
def delete_spend(request, spend_pk) :
    user = request.user
    user_pk = user.pk

    spend = Spend.objects.get(pk= spend_pk)
    spend.delete()

    return redirect('calendar', user_pk)