from inertia import render
from admin.models import Images
from django.shortcuts import redirect, get_object_or_404
from .validation import ImageForm
from django.core.files.storage import FileSystemStorage
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.decorators import login_required
from skimage.io import imread
from skimage.transform import resize

import os
import pickle

UPLOAD_PATH = os.path.join(settings.BASE_DIR, 'media/')
MODEL_PATH = os.path.join(settings.BASE_DIR, 'models/')

print(MODEL_PATH)
model_svc_path = os.path.join(MODEL_PATH, 'model.pkl')
model_svc = pickle.load(open(model_svc_path, 'rb'))
labels = ["cat", "dog"]

@login_required
def index(request) :
    data = Images.objects.all(),
    return render(request, 'admin/predict/index', {
        'data': data
    })

@login_required
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
            
            image_path = UPLOAD_PATH + filename
            image_size = (15, 15)
            image_label = ''
            try:
                image_read = imread(image_path)
                image_resized = resize(image_read, image_size)
                if image_resized.shape == image_size + (3,): 
                    image_flattened = image_resized.flatten().reshape(1, -1)
                    result = model_svc.predict(image_flattened)
                    print(result[0])
                    image_label = labels[result[0]]
                else:
                    print(f"Incorrect image shape: {image_resized.shape}")
            except Exception as e:
                print(f"Error processing file: {e}")

            image = Images(
                created_at = timezone.now(),
                image = filename,
                convert_file = image_label,
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

@login_required
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