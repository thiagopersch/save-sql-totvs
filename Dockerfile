# Use uma imagem base oficial do Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN yarn install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Construa a aplicação
RUN yarn build

# Exponha a porta em que a aplicação será executada
EXPOSE 3333

# Defina o comando para criar o prisma client
RUN yarn prisma:generate

# Defina o comando para rodar a aplicação
CMD ["yarn", "dev"]
