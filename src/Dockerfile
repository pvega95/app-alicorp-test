FROM node:lts as builder

### STAGE 1: Build #### We label our stage as ‘builder’
#FROM node:alpine as builder

COPY package.json package-lock.json ./
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
#RUN npm install

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm install

RUN npm run ng build -- --output-hashing=all


### STAGE 2: Setup ###
FROM nginx:stable

## Copy our default nginx config
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

#RUN mv -f /usr/share/nginx/html/app-alicorp-test/* /usr/share/nginx/html/

RUN cp -R /usr/share/nginx/html/app-alicorp-test/* /usr/share/nginx/html/

RUN rm -rf /usr/share/nginx/html/app-alicorp-test

WORKDIR /usr/share/nginx/html/