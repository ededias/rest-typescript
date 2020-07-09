import route from './src/routes';

const port = 3000;

route.listen(port, () => {
    console.log("[SERVER] rurning at http://localhost:3333");
});