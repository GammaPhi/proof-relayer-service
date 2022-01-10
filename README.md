# Lamden Proof Relayer Service

## Usage

```bash
POST /relay
{
    "note": "e880dbfa6f10181ccac4728b9da4c138644a265004055699af8a5f381cd22c8ad8e031fc3c7ff574a477f462d031b26b773bc5f537a85893be4576c2f83a", 
    "denomination": 1000, 
    "token": "currency", 
    "recipient": "8b632e0598dafed9a5c09c22336bd0563dd9d0e25c72e443c3223faacc1a369d"
}
```

See [this file](src/config.js) for each valid denomination/token pair.

## Deploy to a VM

Ubuntu 18

```bash
# Change this first line
RELAYER_DNS=relayer.gammaphi.io

# Install apt dependencies
sudo apt update
sudo apt install -y git nginx

# Clone relayer repo
git clone https://github.com/GammaPhi/proof-relayer-service.git
cd lamden-relayer-service/

# Setup environment
cp .env.example .env

# Update environment variables in .env file
nano .env

# Install node
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt install -y nodejs
node --version # Should be Node 12

# Install node dependencies
sudo npm -i yarn -g
sudo yarn

# Start server in background
sudo npm i pm2 -g
pm2 start src/server.js

# Local test
curl localhost:5000/status
# Should return {"status": "ok"}

# Setup nginx
sudo cp nginx/server.conf /etc/nginx/sites-available/default 
sudo service nginx restart

# Setup SSL
sudo add-apt-repository ppa:certbot/certbot
sudo apt install -y python3-certbot-nginx
sudo certbot --nginx -d $RELAYER_DNS

# Final test

curl https://$RELAYER_DNS/status
# Should return {"status": "ok"}
```

## Local Development

Use Node 12

```bash
nvm use 12
```

Install dependencies

```bash
yarn
```

Configure environment

```bash
# Update environment variables accordingly
cp .env.example .env  
```

Run server locally

```bash
yarn server
```