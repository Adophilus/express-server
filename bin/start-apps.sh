#! /usr/bin/env bash

_apps=($(ls apps))

for _app in ${_apps[@]}
do
  cd "apps/$_app"
  pnpm start &
  cd ../../
done

