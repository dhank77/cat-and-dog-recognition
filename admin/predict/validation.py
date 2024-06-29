from rest_framework import serializers

class ImageForm(serializers.Serializer) :
    image = serializers.ImageField(required=True)

    def validate_image(self, value):
        valid_extensions = ['jpg', 'jpeg', 'png']
        ext = value.name.split('.')[-1].lower()
        if ext not in valid_extensions:
            raise serializers.ValidationError(f'Extension not allowed: {valid_extensions}')
        return value