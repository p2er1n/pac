#!/bin/sh

# $@ 代表 全部脚本参数，不包括脚本名

# $# 命令行参数长度

# default update

# update -> -Sy                      0

# upgrade -> -Su/-S                  0/more

# autoremove -> -Qdtq | -Rs          0

# install -> -S                      more

# uninstall -> -R                    more

# remove -> -Rn                      more

# search -> -Ss                      more

# info -> -Qi                        more

case "$1" in
    "" | "update")
	if [ $# -eq 1 ]
	then
	    shift
	fi
	if [ $# -gt 0 ]
	then
	    echo "pac: Warn: update doesn't need arguments!"
	fi
	pacman -Sy;;
    "autoremove")
	shift
	if [ $# -gt 0 ]
	then
	    echo "pac: Warn: autoremove doesn't need arguments!"
	fi	
	result=$(pacman -Qdtq)
	if [ -z "$result" ]
	then
	    echo "pac: No packages need to be removed!"
	    exit 1
	else
	    pacman -Rs $result
	fi
	;;
    "upgrade")
	shift
	if [ $# -eq 0 ]
	then
	    pacman -Su
	else
	    pacman -S "$@"
	fi
	;;
    "install")
	shift
	if [ $# -eq 0 ]
	then
	    echo "pac: install operator needs at least one target!"
	    exit 1
	else
	    pacman -S "$@"
	fi
	;;
    "uninstall")
	shift
	if [ $# -eq 0 ]
	then
	    echo "pac: uninstall operator needs at least one target!"
	    exit 1
	else
	    pacman -R "$@"
	fi
	;;
    "remove")
	shift
	if [ $# -eq 0 ]
	then
	    echo "pac: remove operator needs at least one target!"
	    exit 1
	else
	    pacman -Rn "$@"
	fi
	;;
    "search")
	shift
	if [ $# -eq 0 ]
	then
	    echo "pac: search operator needs at least one target!"
	    exit 1
	else
	    pacman -Ss "$@"
	fi
	;;
    "info")
	shift
	if [ $# -eq 0 ]
	then
	    echo "pac: info operator needs at least one target!"
	    exit 1
	else
	    pacman -Qi "$@"
	fi
	;;
    *)
	echo "pac: $1: not supported operator!"
	exit 1
	;;
esac
