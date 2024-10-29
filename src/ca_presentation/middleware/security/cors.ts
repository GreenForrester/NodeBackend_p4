
//task move white list urls to .env
const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:3100/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //allowedHeaders: ['Content-Type', 'Authorization'],
    //credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;