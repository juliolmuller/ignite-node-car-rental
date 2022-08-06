import { app } from './server';

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`>>> Application available at http://localhost:${port}`);
});
