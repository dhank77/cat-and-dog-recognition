from inertia import render
from .models import Images

def index(request) :
    data = Images.objects.all(),
    return render(request, 'admin/index', {
        'data': data
    })
