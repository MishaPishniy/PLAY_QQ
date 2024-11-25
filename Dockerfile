FROM mcr.microsoft.com/playwright:v1.48.2-noble

WORKDIR /PLAY_QQ

COPY . .

RUN npm install

CMD ["npx", "playwright", "test"]