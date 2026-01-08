#!/bin/bash

echo "Cleaning backend build output..."

cd "$(dirname "$0")/.."

rm -r backend/out

echo "Backend build output cleared."
