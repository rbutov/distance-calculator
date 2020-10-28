from wtforms import Form, validators, StringField

class getGeoCodeValidation(Form):
    query = StringField('Query', [validators.required(), validators.length(min=1)])

class reverseGeoCodeValidation(Form):
    geocode = StringField('Geocode', [validators.required(), validators.length(min=1)])

class calculateDistanceValidation(Form):
    pointA = StringField('Point A', [validators.required(), validators.length(min=1)])
    pointB = StringField('Point B', [validators.required(), validators.length(min=1)])
