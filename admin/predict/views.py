from inertia import render, share
from admin.models import Images
from django.shortcuts import redirect, get_object_or_404
from .validation import ImageForm
from django.core.files.storage import FileSystemStorage
from django.utils import timezone
from django.conf import settings

import os

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
            request.session['type'] = "success"
            request.session['messages'] = "Success add image"
            
            return redirect('/admin/predict')
        else :
            return render(request, 'admin/predict/create', props={
                'errors' : serializer.errors
            })
    else :
        return render(request, 'admin/predict/create')

def delete(request, id) :
    image = get_object_or_404(Images, id=id) 
    image_path = os.path.join(settings.MEDIA_ROOT, image.image)
    if os.path.exists(image_path):
        os.remove(image_path)
        
    if image.delete() :
        request.session['type'] = "success"
        request.session['messages'] = "Success delete image"
    else :
        request.session['type'] = "error"
        request.session['messages'] = "Error delete image"
         
    return redirect('/admin/predict')