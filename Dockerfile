FROM ubuntu:22.04
RUN apt update && apt upgrade -y && apt install python3 -y
WORKDIR /srv
COPY ./* ./
CMD ["python3", "-m", "http.server", "5000"]
