FROM mcr.microsoft.com/playwright:focal
RUN pip3 install playwright
ADD . /app
ADD ./assets /tmp
WORKDIR /app
CMD ["/bin/bash", "python3 -m http.server 8000; python3 d.py"]
