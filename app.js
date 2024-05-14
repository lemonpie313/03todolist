import express from 'express';
import connect from './schemas/index.js';
import todoRouter from './routes/todos.router.js';
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3000;

connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express.static() : app.js 파일 기준으로 입력값('./assets') 경로에 있는 파일을 가공없이 그대로 전달하는 미들웨어
// > 미리 준비한 프론트엔드 파일을 바로 서빙 가능
//다른정보 입력 안하면 자동으로 localhost:3000에 index.html을 서빙
app.use(express.static('./assets'));

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hi!' });
});

app.use('/api', [router, todoRouter]);

//에러 처리 미들웨어
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
