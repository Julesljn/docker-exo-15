FROM node:20-alpine

WORKDIR /app

# Copie des fichiers de configuration
COPY package*.json ./
COPY tsconfig.json ./

# Installation des dépendances
RUN npm ci

# Copie du code source
COPY . .

# Création du fichier .env par défaut
RUN echo "PORT=3000\nHOST=0.0.0.0\nMINECRAFT_RCON_HOST=localhost\nMINECRAFT_RCON_PORT=25575\nMINECRAFT_RCON_PASSWORD=your_password" > .env

# Build de l'application
RUN npm run build

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "build/index.js"] 