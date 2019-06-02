'use strict';

const network_flows = require('./network_flows/network_flows.json');
const execSync = require('child_process').execSync;

const subscriber_rules = {};
const rules = [];  
let is_first_subscriber = 1;  
const netem_ids = [];
const experiment_config = network_flows[network_flows.length - 1];
const total_bandwidth = Math.floor(experiment_config.bandwidth/1000);
const bandwidth_per_subscriber = Math.floor(total_bandwidth/experiment_config.num_of_subscribers);
let prio_num = experiment_config.num_of_topics;
const prio_sum = (prio_num*(prio_num + 1))/2;

prio_num+=1;
network_flows.pop();


execSync('bash delete_prev_results.sh', {stdio: 'inherit'});

for(let i=3000; i<4000; i++) {
    netem_ids.push(i);
}

const transform_id = (id) => {
    id = parseInt(id);
    return  id + 1;   
}

network_flows.forEach((subscriber) => {
    
    let subscriber_id = subscriber.identifier.substring(3,subscriber.identifier.length); 
    let topic_id = subscriber.subscriptions[0].topic.substring(5, subscriber.subscriptions[0].topic.length);
    
    if(!(subscriber_id in subscriber_rules))
        subscriber_rules[subscriber_id] = [];

    let subscriber_rule = {};    

    subscriber_rule.subscriber_id = transform_id(subscriber_id);
    subscriber_rule.topic_id = `${subscriber_rule.subscriber_id}${parseInt(transform_id(topic_id))}`;
    subscriber_rule.port = subscriber.network_flow.port;
    subscriber_rule.priority = subscriber.priority;
    subscriber_rule.bandwidth = Math.floor((bandwidth_per_subscriber/prio_sum)) * (prio_num - subscriber.priority);
    subscriber_rule.netem_id = netem_ids[netem_ids.length-1];
    netem_ids.pop();
    subscriber_rule.drop_rate = Math.ceil(subscriber.drop_rate * 100);
    subscriber_rule.total_bandwidth = total_bandwidth;

    subscriber_rules[subscriber_id].push(subscriber_rule);
});

for(let key in subscriber_rules) {
    
    if(subscriber_rules.hasOwnProperty(key)) {
 
        let rules = subscriber_rules[key];

        rules.forEach((rule) => {

            execSync(`bash setup_rules.sh ${rule.subscriber_id} ${rule.topic_id} ${rule.port} \
            ${rule.priority} ${rule.netem_id} ${rule.drop_rate} ${is_first_subscriber} ${rule.bandwidth} ${rule.total_bandwidth}`,  {stdio: 'inherit'});

            is_first_subscriber = 0;
        });

    }


}