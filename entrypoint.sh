#!/bin/sh

# Falha ao encontrar qualquer erro
set -e

# Aguarda o banco de dados estar disponível
echo "Esperando o banco de dados iniciar..."
until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USERNAME"; do
  sleep 2
done

# Executa as migrações do Prisma
echo "Executando as migrações do Prisma..."
yarn prisma migrate dev

# Inicia o servidor da aplicação
echo "Iniciando o servidor da aplicação..."
exec "$@"  # Isso executa o comando CMD fornecido no Dockerfile, como 'yarn dev'
