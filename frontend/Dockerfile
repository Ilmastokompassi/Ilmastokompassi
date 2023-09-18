FROM node:18 as build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
