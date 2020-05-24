set -x
npm run start
set +x

set -x
npm start &
sleep 1
echo $! > .pidfile
set +x
