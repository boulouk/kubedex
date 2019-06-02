
HOST = "middleware.firedex"
PORT = "8888"


EXPERIMENT_DURATION = 60

NETWORK_FLOWS = 7
PRIORITIES = 3

NETWORK_FLOW_ALGORITHM = "greedy_split" # { random, greedy_split }
PRIORITY_ALGORITHM = "greedy_split_local" # { random, greedy_split }
DROP_RATE_ALGORITHM = "exponential" # { flat, linear, exponential }

TOLERANCE = 0.1

