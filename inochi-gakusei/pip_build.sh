#!/bin/bash

cd ~/.local/lib/python2.7/site-packages/openssl-1.0.2q
./config --prefix=${HOME}/.local -fPIC
gmake
gmake test
gmake install

cd /home/inochi-gakusei/.local/lib/python2.7/site-packages/Python-2.7.15
env CXX=/usr/bin/g++ ./configure --prefix=${HOME}/.local --enable-unicode=ucs4
gmake
gmake install

csh
source ~/.cshrc

cd  ~/.local/lib/python2.7/site-packages
python get-pip.py

echo 'python version'
which python
echo 'ssl version'
python -c 'import ssl; print ssl.OPENSSL_VERSION'
echo 'python version'
python --version
echo 'list of library'
python -m pip freeze
