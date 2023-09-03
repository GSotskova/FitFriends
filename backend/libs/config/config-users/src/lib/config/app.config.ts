import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const DEFAULT_RABBIT_PORT = 5672;

export interface ApplicationConfig {
  environment: string;
  port: number;
  rabbit: {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
  },
}

export default registerAs('application', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
    rabbit: {
      host: process.env.RABBIT_HOST,
      password: process.env.RABBIT_PASSWORD,
      port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
      user: process.env.RABBIT_USER,
      queue: process.env.RABBIT_QUEUE,
      exchange: process.env.RABBIT_EXCHANGE,
    }
  };

  const validationSchema = Joi.object<ApplicationConfig>({
    environment: Joi.string().valid('development', 'production', 'stage').required(),
    port: Joi.number().port().default(DEFAULT_PORT),
    rabbit: Joi.object({
      host: Joi.string().valid().hostname().required(),
      password: Joi.string().required(),
      port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
      user: Joi.string().required(),
      queue: Joi.string().required(),
      exchange: Joi.string().required(),
    })
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Application Config]: Environments validation failed. Please check .env file.
      Error message: Mongo.${error.message}`,
    );
  }

  return config;
});
