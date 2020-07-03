import route from './src/routes';

route.listen(3333, () => {
    console.log("[SERVER] rurning at http://localhost:3333");
})