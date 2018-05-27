#!/bin/bash
#Created by Nilupul Sandeepa on 26/05/2018
devices=$(adb devices)
if echo "$devices" | grep -w "device";
then
  echo "Android device with debugging enabled found"
  device=$(echo "$devices" | grep -w "device")
  ionic cordova run android --$device
else
  run.sh
  echo "Please connect your android device with USB debuggin enabled."
fi