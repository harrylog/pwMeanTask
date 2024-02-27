FROM node:16 as fe
# build fe
WORKDIR /app
#cd fe
# WORKDIR /app/planetWatchersFe
#copy source files
COPY planetWatchersFe /app/planetWatchersFe
# COPY . .

WORKDIR /app/planetWatchersFe

RUN npm install

RUN npm run build --prod

#copy fe
# WORKDIR /app/planetWatchersFe/dist/planet-watchers-fe

# COPY . /app/be/public


FROM node:16 as be 
WORKDIR /app

# COPY package.json .

COPY be /app/be

WORKDIR /app/be
RUN npm install


COPY --from=fe /app/planetWatchersFe/dist /app/be/public

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]