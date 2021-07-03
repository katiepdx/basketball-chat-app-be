import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());
// app.use(express.static('public')); // helps serve index.html

// app.get('/', (req, res) => {
//   res.sendFile('index.html');
// });

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
