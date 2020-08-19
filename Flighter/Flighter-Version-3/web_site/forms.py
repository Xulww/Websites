from django.db import models
from django.contrib.auth.models import User
from django import forms

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'password']
    
    def __init__(self, *args, **kwargs):
        self.register = kwargs.pop("register", None)
        super().__init__(*args, **kwargs)
        
        if self.register:
            self.fields['confirm_password'] = forms.CharField(widget=forms.PasswordInput())

    def clean(self):
        cleaned_data = super(UserForm, self).clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if self.register and password != confirm_password:
            raise forms.ValidationError("Password and confirm password do not match! Please try again")