import express from 'express';

const app: any = express();

const port: number = 3000;

app.get('/', (req: any, res: any) => {
  res.send('helloWorld');
});

app.listen(port, () => {
  console.log(`server is listening on ${port} !!!`);
});
