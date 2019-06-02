
BROKER = {
    "gateway_host": "gateway.firedex",
     "broker_host": "broker.firedex",
    "tcp": 1883,
    "udp": 20000
}

TYPES = [ "deterministic", "random" ]

TOPICS = 3
TOPIC = {
    "deterministic": 3,
    "random": 0
}

SUBSCRIBERS = 1
SUBSCRIBER = {
    "scenario": [
        {
            "count": 1,
            "deterministic": {
                "count": 3,
                "utility_function": { "average": 5, "lower_bound": 0.01, "upper_bound": 100 }
            },
            "random": {
                "count": 0,
                "utility_function": { "average": 5, "lower_bound": 0.01, "upper_bound": 100 }
            }
        }
    ]
}

PUBLISHERS = 1
PUBLISHER = {
    "scenario": [
        {
            "count": 1,

            "deterministic": {
                "count": 3,
                "rate": { "average": 10, "lower_bound": 10, "upper_bound": 10 },
                "size": { "average": 100, "lower_bound": 100, "upper_bound": 100 }
            },
            "random": {
                "count": 0,
                "rate": { "average": 10, "lower_bound": 10, "upper_bound": 10 },
                "size": { "average": 100, "lower_bound": 100, "upper_bound": 100 }
            }
        }
    ]

}
