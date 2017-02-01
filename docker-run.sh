#!/bin/bash

xvfb-run --server-args='-screen 0, 1440x900x24' protractor config.js $*
