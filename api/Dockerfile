FROM continuumio/anaconda3

WORKDIR /app

COPY . /app

RUN python -m pip install -r requirements.txt

EXPOSE 5000

CMD ["python","app.py"]