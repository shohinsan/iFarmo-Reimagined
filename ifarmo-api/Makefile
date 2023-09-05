run:
	node app.js

# Docker

docker-build:
	docker build --platform=linux/amd64 -t ifarmo-nodejs .
	docker images

docker-run: docker-build
	docker run --network ifarmobridge --platform=linux/amd64 -e "MYSQL_HOST=mysql" --name backend -td -p 8000:8000 ifarmo-nodejs

docker-push:
	docker login
	docker build -t insidious000/ifarmo-nodejs:latest .
	docker push insidious000/ifarmo-nodejs:latest
	docker build -t insidious000/ifarmo-nodejs:v1.0 .
	docker push insidious000/ifarmo-nodejs:v1.0

docker-clean:
	docker stop ifarmo-nodejs
	docker rm ifarmo-nodejs

# Compose

compose-up:
	docker-compose up --scale ifarmo=1 -d

# Network (Bridge)

network-create:
	docker network create --driver bridge ifarmobridge

network-inspect:
	docker network inspect ifarmobridge

network-ls:
	docker network ifarmobridge

network-prune:
	docker network prune

# Load Balancer (HAProxy)

lb-stats:
	echo "user = admin | password = admin"
	open http://localhost:1936

lb-test:
	open http://localhost

