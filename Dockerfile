FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN sudo apt-get update
RUN apt-get install -y Xvfb google-chrome-stable nodejs
ADD package.json /srv/e2e-tests/
WORKDIR /srv/e2e-tests
RUN npm install -g protractor
RUN npm install
RUN webdriver-manager update --chrome
ADD . /srv/e2e-tests
ENTRYPOINT ["/bin/bash", "./docker-run.sh"]
CMD [""]
