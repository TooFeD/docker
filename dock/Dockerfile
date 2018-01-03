# author
FROM ubuntu
MAINTAINER Vitalii Yatsenko

# set the base image

# update sources list
RUN apt-get clean
RUN apt-get update

# install basic apps, one per line for better caching
RUN apt-get install -qy git
RUN apt-get install -qy locales
RUN apt-get install -qy nano
RUN apt-get install -qy tmux
RUN apt-get install -qy wget
RUN apt-get install -qy curl
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs

# cleanup
RUN apt-get -qy autoremove

# add scripts to the container
# ADD .bashrc /root/.bashrc
# ADD .profile /root/.profile

# add the application to the container
RUN git clone https://github.com/TooFeD/tic-tac-toe.github.io.git
# ADD app /app
# ADD test.sh test.sh
EXPOSE 8082


ENV APP_HOME /tic-tac-toe.github.io
WORKDIR $APP_HOME
RUN npm install
CMD npm start