#!/bin/sh

# $@ 代表 全部脚本参数，不包括脚本名

# $# 命令行参数长度

# default update

# update -> -Sy                      0

# upgrade -> -Su                     0/more

# autoremove -> -Qdtq | -R           0

# install -> -S                      more

# search -> -Ss                      more

# info -> -Qi                        more

if [ $# -eq 0 ]
then
    pacman -Sy
    exit
elif [ $# -eq 1 ]
then
    case "$1" in
	"update")
	    pacman -Sy;;
	"autoremove")
	    result=$(pacman -Qdtq)
	    if [ -z "$result" ]
	    then
		echo "No packages need to be removed!"
		exit 1
	    else
		pacman -R "$result"
	    fi;;
	"upgrade")
	    pacman -Su;;
	"install" | "search" | "info")
	    echo "$1 needs more than one arguments!"
	    exit 1;;
	*)
	    echo "$1: not supported operator!"
	    exit 1;;
    esac
    exit
else
    op=$1
    shift
    case "$op" in
	"upgrade")
	    pacman -S "$@";;
	"install")
	    pacman -S "$@";;
	"search")
	    pacman -Ss "$@";;
	"info")
	    pacman -Qi "$@";;
	"update" | "autoremove")
	    echo "$op doesn't need any argument, but given $# arguments!"
	    exit 1;;
	*)
	    echo "$op: not supported operator!"
	    exit 1;;
    esac
fi
    
