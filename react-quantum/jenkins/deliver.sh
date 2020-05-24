set -x
yarn build
set +x

set -x
yarn start &&
echo $! > .pidfile
set +x