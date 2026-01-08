#!/bin/bash
set -e

echo "Compiling backend..."
cd "$(dirname "$0")/.."
mkdir -p backend/out
cd backend/src

javac -d ../out $(find . -name "*.java")

echo "Running backend..."

java -cp ../out agentnavigation.Main
