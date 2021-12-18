# Use an existing image as a base for this image
FROM alpine

# downloading and installing dependacies
RUN apk add --update redis

# startup command to execute when the image starts a container 
CMD ["redis-server"]
