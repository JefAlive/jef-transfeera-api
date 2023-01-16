export interface Config {
  port: number;
}

const config: Config = {
  port: +(process.env.PORT || 3000)
};

export { config };