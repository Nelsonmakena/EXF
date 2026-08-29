#!/bin/bash

set -e

echo "=== RoyalGarage Deployment Started ==="

cd ~/royalgarage

echo "Pulling latest code..."
git pull

echo "Building frontend..."
cd ROYALGARAGE
npm run build

echo "Updating production frontend..."
sudo rm -rf /var/www/royalgarage/*
sudo cp -r dist/* /var/www/royalgarage/

echo "Updating backend..."
cd ../ROYALGARAGEBACKEND
npm install

echo "Restarting backend..."
sudo systemctl restart royalgarage-backend

echo "=== Deployment Complete ==="
