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
from datetime import datetime


import os
import pickle
import cv2

UPLOAD_PATH = os.path.join(settings.BASE_DIR, 'media/')
MODEL_PATH = os.path.join(settings.BASE_DIR, 'models/')

model_svc_path = os.path.join(MODEL_PATH, 'model.pkl')
model_svc = pickle.load(open(model_svc_path, 'rb'))
labels = ["cat", "dog"]

cat_face_path = os.path.join(MODEL_PATH, 'cat_face2.xml')
dog_face_path = os.path.join(MODEL_PATH, 'dog_face.xml')

xml_cat = cv2.CascadeClassifier(cat_face_path)
xml_dog = cv2.CascadeClassifier(dog_face_path)


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
            
            current_time = datetime.now().strftime('%Y%m%d%H%M%S')
            extension = os.path.splitext(image.name)[1]
            new_filename = f"{current_time}{extension}"
            fs = FileSystemStorage()
            fs.save(f'uploads/{new_filename}', image)
            
            image_path = UPLOAD_PATH + 'uploads/' + new_filename
            image_cv = cv2.imread(image_path)
            if image_cv is None:
                print(f"Error: Unable to read image from {image_path}")
                return
            
            gray_image = cv2.cvtColor(image_cv, cv2.COLOR_BGR2GRAY)

            image_size = (15, 15)
            image_label = ''
            try:
                image_read = imread(image_path)
                image_resized = resize(image_read, image_size)
                if image_resized.shape == image_size + (3,): 
                    image_flattened = image_resized.flatten().reshape(1, -1)
                    result = model_svc.predict(image_flattened)
                    image_label = labels[result[0]]
                else:
                    print(f"Incorrect image shape: {image_resized.shape}")
            except Exception as e:
                print(f"Error processing file: {e}")
                
            if (image_label == 'cat') :
                objects = xml_cat.detectMultiScale(image_cv, scaleFactor=1.1, minNeighbors=3, minSize=(30, 30))
            else :
                objects = xml_dog.detectMultiScale(image_cv, scaleFactor=1.1, minNeighbors=3, minSize=(30, 30))

            print(f"Found {len(objects)} objects")
            for (x, y, w, h) in objects:
                cv2.rectangle(image_cv, (x, y), (x+w, y+h), (255, 0, 0), 2)
            
            filename_cv2 = f'uploads/cv/annotated_{new_filename}'
            output_path = f'{UPLOAD_PATH}{filename_cv2}'
            
            try:
                cv2.imwrite(output_path, image_cv)
                print(f"Annotated image saved to {output_path}")
            except Exception as e:
                print(f"Error saving annotated image: {e}")

            image = Images(
                created_at = timezone.now(),
                image = 'uploads/' + new_filename,
                convert_file = image_label,
                convert_type = filename_cv2,
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