import dramatiq
from dramatiq.brokers.redis import RedisBroker
from .settings import Config

# Use Redis URL from the settings
redis_url = Config.DRAMATIQ_BROKER_URL

# Set up Redis Broker for Dramatiq
broker = RedisBroker(url=redis_url)

# Configuring Dramatiq with the broker
dramatiq.set_broker(broker)

# Example Task
@dramatiq.actor
def example_task(message):
    print(f"Processing: {message}")
    # Task logic here

# Additional task definitions can be added here
