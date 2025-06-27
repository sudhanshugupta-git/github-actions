# AWS Deployment steps:

1. Update and install docker

- sudo apt update // Update package

- sudo apt install -y docker.io // install docker (docker.io is the Ubuntu package for Docker Engine.)

- sudo systemctl start docker // start docker

- docker -v // check

2. Run Backend

- sudo docker pull sudhanshugpta/backend-app:v2

# any one of give 2

- sudo docker run --rm -p 3000:3000 -e DB_USERNAME="admin" -e DB_PASSWORD="12345678" -e DB_NAME="sakila" -e DB_HOST="cx-assignment.cno640scc61q.ap-south-1.rds.amazonaws.com" -e DB_DIALECT="mysql" -e URL="api/v1" -e SERVER_PORT="3000" sudhanshugpta/backend-app:v2

- sudo docker run --rm -p 3000:3000 \
  -e DB_USERNAME="admin" \
  -e DB_PASSWORD="12345678" \
  -e DB_NAME="sakila" \
  -e DB_HOST="cx-assignment.cno640scc61q.ap-south-1.rds.amazonaws.com" \
  -e DB_DIALECT="mysql" \
  -e URL="api/v1" \
  -e SERVER_PORT="3000" \
  sudhanshugpta/backend-app:v2

3. Run frontend

- sudo docker pull sudhanshugpta/frontend-app:v3

# any one of give 2

- sudo docker run --rm -p 5173:5173 \
  -e VITE_API_BASE_URL=http://ec2-13-233-144-161.ap-south-1.compute.amazonaws.com:3000/api/v1 \
  sudhanshugpta/frontend-app:v3

- sudo docker run --rm -p 5173:5173 -e VITE_API_BASE_URL=http://ec2-13-233-144-161.ap-south-1.compute.amazonaws.com:3000/api/v1 sudhanshugpta/frontend-app:v3

# Adding data to mysql

# for root login, we use: mysql -u root -p // but here we'll not use this

- mysql -h cx-assignment.cno640scc61q.ap-south-1.rds.amazonaws.com -P 3306 -u admin -p

- SOURCE C:/Users/cx-sudhanshu/Downloads/Sudhanshu Gupta/sakila-db/sakila-schema.sql;

- SOURCE C:/Users/cx-sudhanshu/Downloads/Sudhanshu Gupta/sakila-db/sakila-data.sql;
