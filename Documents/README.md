# configure new main server

1. establish new EC2 from AWS. Your custom server must run a fresh installation of Ubuntu 18.04 x64 and must login as a root user.
2. create new Elastic IP and assign it to the new EC2 , so EC2 will not get new IP when restart it
3. add the new IP to RDS inbound rule to allow connect to RDS
4. point api2.telmeeth.com ,admin2.telmeeth.com to the new IP with A record from Route 53
5. login to the server as root & make new file : nano forge.sh
6. past all content in front_server_configuration.sh
7. bash forge.sh. This will configure your server with all telmeeth domains
8. copy your own SSH key with this command [pbcopy < ~/.ssh/id_rsa.pub] and past it in the server to
   root/.ssh/authorized_keys. this is allow you to login without password. logout from the server and run this command

```
ssh forge@api.telmeeth.com
```

9. Your sudo password is : lLGF6R3EiuyuRt8aOnZm and your user name is : forge
10. run below comman

```
sudo certbot --nginx
```

11. enter these domains for certbot api.telmeeth.com ,api2.telmeeth.com ,admin2.telmeeth.com
12. choose option 2 to force redirect all websites to HTTPS
13. add auto new ssl to cron [$ sudo crontab -e]

```
12 3 * * *   certbot renew --dry-run >> /var/log/letsencrypt/renew.log
```

14. run the following command to configure the project

```
git clone https://github.com/ahmed-almesbahi/php-telmeeth.git telmeeth.com
cd telmeeth.com
composer global require "fxp/composer-asset-plugin:^1.4.4"
composer install
```

- need to configure auto deploy with each push to github

sudo apt-get install supervisor
/etc/supervisor/conf.d/yii-queue-worker.conf

```
[program:yii-queue-worker]
process_name=%(program_name)s_%(process_num)02d
command=/usr/bin/php /home/forge/telmeeth.com/yii queue/listen --verbose=1 --color=0
autostart=true
autorestart=true
user=forge
numprocs=4
redirect_stderr=true
stdout_logfile=/home/forge/telmeeth.com/console/runtime/log/yii-queue-worker.log
```

mkdir /home/forge/telmeeth.com/console/runtime/log/
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl reload
sudo service supervisor restart

Code Push
appcenter apps create -d Telmeeth -o Android -p React-Native
appcenter apps create -d Telmeeth -o iOS -p React-Native

appcenter codepush release-react --help
appcenter codepush release-react -a masteryo/Telmeeth -d Production --plist-file ./ios/Telmeeth/Info.plist --debug --extra-bundler-option="--projectRoot=../../"
appcenter codepush release-react -a masteryo/Telmeeth -d Staging

node ../../node_modules/react-native/local-cli/cli.js bundle --projectRoot=../../ --platform ios \
--entry-file ./packages/mobile/index.js \
--bundle-output ./CodePush/main.jsbundle \
--assets-dest ./CodePush \
--dev false
appcenter codepush release -c ./CodePush -a masteryo/Telmeeth -d Production -t 1

IOS:
production : FlUcOtjFyRHav64dcP_t-WymfLZZG2cEbGsDMb
staging : Umwur0RrcMIS81DSW9O6s1JEy6BbfLxjdCNYO
