from django.shortcuts import render
from django.http import HttpRequest

# Create your views here.

def cart(request):
    return render(request, 'cart.html')