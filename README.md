**_To build docker images :_**

// compiler le projet
sudo docker build -t api .

// et run le docker
sudo docker run -p 5000:5000 api

// pour stop le docker on liste les processus docker

sudo docker ps

// on stop celui qu'on veut

sudo docker stop 515155d1qz151zq
