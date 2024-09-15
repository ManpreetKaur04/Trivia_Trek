import aioredis
import json
import os

class RedisManager:
    def __init__(self, redis_url="redis://localhost"):
        self.redis_url = redis_url
        self.redis = None

    async def connect(self):
        self.redis = await aioredis.create_redis_pool(self.redis_url)

    async def get_session_data(self, user_id: str):
        session_data = await self.redis.get(user_id)
        if session_data:
            return json.loads(session_data)
        return {}

    async def set_session_data(self, user_id: str, data: dict):
        await self.redis.set(user_id, json.dumps(data))

    async def close(self):
        self.redis.close()
        await self.redis.wait_closed()


redis_manager = RedisManager()
