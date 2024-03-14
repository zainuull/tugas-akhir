// config.js
import developmentConfig from './env.development';
import productionConfig from './env.production';

const env = process.env.NODE_ENVV || process.env.NODE_ENV || 'development';
const config = env === 'production' ? productionConfig : developmentConfig;

export default config;
