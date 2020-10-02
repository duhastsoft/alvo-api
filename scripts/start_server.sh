#!/bin/bash
cd /home/linux/
export PM2_HOME=/home/linux/.pm2 

isExistApp = `pgrep httpd`
if [[ -n  $isExistApp ]]; then
    service httpd stop
fi
 
yum remove -y httpd
pm2 delete all

pm2 start server.js