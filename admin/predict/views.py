from inertia import render
from admin.models import Images
from django.shortcuts import redirect
from .validation import ImageForm
from django.core.files.storage import FileSystemStorage
from django.utils import timezone


def index(request) :
    data = Images.objects.all(),
    return render(request, 'admin/predict/index', {
        'data': data
    })

def create(request) :
    if request.method == 'POST' :
        data = request.POST.dict()
        files = request.FILES.dict()
        data.update(files)
        serializer = ImageForm(data=data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            fs = FileSystemStorage()
            filename = fs.save(f'uploads/{image.name}', image)

            image = Images(
                created_at = timezone.now(),
                image = filename,
                convert_file = 'tes',
                convert_type = 'tes',
                user_id = request.user.id
            )
            image.save()

            return redirect('/admin')
        else :
            return render(request, 'admin/predict/create', props={
                'errors' : serializer.errors
            })
    else :
        return render(request, 'admin/predict/create')

def delete(request, id) :
    image = Images.objects.get(id=id)
    if(image.delete()) :
        flash = {
            'type' : 'success',
            'messages' : 'Success delete image'
        }
        return redirect('/admin', props={
            'flash' : flash
        })