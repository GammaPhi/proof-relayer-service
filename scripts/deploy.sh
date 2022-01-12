#/bin/sh -e

source .env

# Download latest code
COMMAND="cd proof-relayer-service/ && sudo git pull origin master"
gcloud compute ssh $INSTANCE_NAME --command="$COMMAND" --zone=$INSTANCE_ZONE

# Rebuild image
COMMAND="cd proof-relayer-service/ && sudo ./scripts/build_image.sh"
gcloud compute ssh $INSTANCE_NAME --command="$COMMAND" --zone=$INSTANCE_ZONE

# Restart service
COMMAND="cd proof-relayer-service/ && sudo docker-compose stop server && sudo docker-compose rm -f -v server && sudo docker-compose create --force-recreate server && sudo docker-compose start server"
gcloud compute ssh $INSTANCE_NAME --command="$COMMAND" --zone=$INSTANCE_ZONE
