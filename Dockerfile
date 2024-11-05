# Use uma imagem base oficial do Node.js
FROM node:latest as node-builder

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instale as dependências
COPY . .
RUN yarn install

# Construa a aplicação
RUN yarn build

# Exponha a porta em que a aplicação será executada
EXPOSE 3333

# Defina o comando para criar o prisma client
RUN yarn prisma:generate

# Defina o comando para rodar a aplicação
CMD ["yarn", "dev"]
