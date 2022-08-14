# docker-node-redis-mysql
test project for the docker technology using mysql and redis

## Usage
_note: use this link to see the result of the application._

- http://localhost:5001
- http://localhost:5001/api/v1/users/Bret

```sh
docker-compose up  # start container 
docker-compose down -v # shutdown/remove container with volumes
docker system prune -a --volumes # cleanup/remove everything (images, containers, volumes & etc) in one go
```