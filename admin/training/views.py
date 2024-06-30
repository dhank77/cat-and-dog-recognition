import os
import pickle
import numpy as np

from django.conf import settings
from inertia import render
from skimage.io import imread
from skimage.transform import resize
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

def index(request):
    categories = ["cat", "dog"]
    return render(request, 'admin/training/index', props={
        'categories' : categories
    })

def run(request) :
    input_dir = f"{settings.BASE_DIR}/datasets/"
    categories = ["cat", "dog"]
    
    data = []
    labels = []
    image_size = (15, 15)

    for index, category in enumerate(categories):
        category_path = os.path.join(input_dir, category)
        for file in os.listdir(category_path):
            image_path = os.path.join(category_path, file)
            try:
                image_read = imread(image_path)
                image = resize(image_read, image_size)
                if image.shape == image_size + (3,):
                    data.append(image.flatten())
                    labels.append(index)
                else:
                    print(f"Skipping file {file} due to incorrect shape: {image.shape}")
            except Exception as e:
                print(f"Error processing file {file}: {e}")

    data = np.array(data)
    labels = np.array(labels)

    print("Shape of data:", data.shape)  # To verify the shape of the data
    print("Shape of labels:", labels.shape)

    if data.size == 0:
        raise ValueError("No valid image data found.")

    X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, shuffle=True, stratify=labels)

    classifier = SVC()

    param_grid = {'C': [1, 10, 100, 1000], 'gamma': [0.1, 0.01, 0.001, 0.0001]}
    grid = GridSearchCV(classifier, param_grid)
    grid.fit(X_train, y_train)

    best_estimator = grid.best_estimator_
    y_predict = best_estimator.predict(X_test)
    score = accuracy_score(y_test, y_predict)

    print("Accuracy score:", score)

    pickle.dump(best_estimator, open(f"{settings.BASE_DIR}/models/model.pkl", "wb"))
            