import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

export let RedisClient: RedisClientType;
export let PubSub: RedisClientType;
export default async function RedisInit() {
  RedisClient = createClient({
    password: process.env.REDIS_PASS,
    socket: {
      host: process.env.REDIS_HOST,
      port: 19090,
    },
  });
  PubSub = RedisClient.duplicate();
  await PubSub.connect();
  await RedisClient.connect();
}
