FROM node:20.4.0-slim

RUN apt-get update && \
    apt-get install -y locales git procps python3 gcc g++
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
RUN npm install -g typescript
ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo