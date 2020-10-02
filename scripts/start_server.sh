#!/bin/bash
cd /home/linux/

isExistApp = `pgrep httpd`
if [[ -n  $isExistApp ]]; then
    service httpd stop
fi
export PM2_HOME=/home/linux/.pm2  
yum remove -y httpd

pm2 delete all
pm2 start server.js