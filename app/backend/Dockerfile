FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /src
ADD /pyData /src/api
ADD requirements.txt /src/api/requirements.txt
WORKDIR /src/api
RUN pip install -r requirements.txt
RUN export FLASK_APP=server.py
EXPOSE 5000
