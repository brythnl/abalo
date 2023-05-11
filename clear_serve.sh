#!/bin/bash

php artisan optimize
php artisan route:cache
php artisan cache:clear
php artisan config:cache

php artisan serve
