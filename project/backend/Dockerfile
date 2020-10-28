FROM python:3.8.6-buster

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

RUN mkdir /usr/app
WORKDIR /usr/app

COPY ./requirements.txt /usr/app
RUN pip install -r requirements.txt

COPY . /usr/app

EXPOSE 5000
