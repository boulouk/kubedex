#!/bin/bash

subscriber_id=$1
topic_id=$2
port=$3
priority=$4
netem_id=$5
drop_rate=$6
is_first_subscriber=$7
bandwidth=$8
total_bandwidth=$9

if [ $is_first_subscriber -eq 1 ] 
then
    tc qdisc del dev eth0 root
    tc qdisc add dev eth0 root handle 1: htb default 20
    tc class add dev eth0 parent 1: classid 1:1 htb rate $[$total_bandwidth + 100]kbit 

    #Default for acks 
    tc class add dev eth0 parent 1:1 classid 1:20 htb rate 100kbit prio 0
    tc qdisc add dev eth0 parent 1:20 handle 40: sfq perturb 10
fi    

tc class add dev eth0 parent 1:1 classid 1:$topic_id htb rate $[$bandwidth]kbit prio $priority
tc qdisc add dev eth0 parent 1:$topic_id handle $netem_id:0 netem loss $drop_rate%
tc filter add dev eth0 protocol ip parent 1:0 prio $priority u32  match ip dport $port 0xffff flowid 1:$topic_id




