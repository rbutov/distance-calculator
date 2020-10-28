from flask import Blueprint, request
from flask_inputs import Inputs
from api.helper import getGeoInfo, getDistance
from api.validation import getGeoCodeValidation, reverseGeoCodeValidation, calculateDistanceValidation

geo = Blueprint('geo', __name__)

@geo.route('/api/getGeoCode', methods=["GET"])
def getGeoCode():
    params = getGeoCodeValidation(request.args)

    if not params.validate():
        return params.errors, 400
    res = getGeoInfo(params.query.data)
    if res:
        return res, 200
    return '', 400

@geo.route('/api/reverseGeocode', methods=["GET"])
def reverseGeoCode():
    params = reverseGeoCodeValidation(request.args)

    if not params.validate():
        return params.error, 400

    res = getGeoInfo(params.geocode.data, 'latlng')
    if res:
        return res, 200
    return '', 400

@geo.route('/api/calculateDistance', methods=["GET"])
def calculateDistance():
    params = calculateDistanceValidation(request.args)

    if not params.validate():
        return params.errors, 400

    distance = getDistance(params.pointA.data, params.pointB.data)

    return '{}'.format(round(distance, 2)), 200
