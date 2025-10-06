"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
const preguntas = [
    {
        pregunta: '¿Cual es el equipo con mas copas Libertadores?',
        correcta: 'Independiente',
        incorrectas: ['Boca', 'River', 'Estudiantes'],
        imagen: 'CopaLib.jpg'
    },
    {
        pregunta: '¿En que año se fundo el Club Atletico Independiente?',
        correcta: '1905',
        incorrectas: ['1910', '1899', '1920'],
        imagen: 'independiente.jpg'
    },
    {
        pregunta: '¿Que equipo es reconocido en Argentina como el Orgullo nacional?',
        correcta: 'Independiente',
        incorrectas: ['Boca', 'River', 'San Lorenzo'],
        imagen: 'Bandera_Argentina.jpg'
    },
    {
        pregunta: '¿Cual es el estadio de la foto?',
        correcta: 'Estadio Libertadores de América',
        incorrectas: ['La Bombonera', 'Monumental', 'Cilindro de Avellaneda'],
        imagen: 'Estadio-LDA.jpg'
    }
];
//para ir eliminando preguntas ya usadas
let preguntasRestantes = [...preguntas];
// Función para obtener una pregunta aleatoria
function obtenerPreguntaAleatoria() {
    if (preguntasRestantes.length === 0) {
        //reiniciar si ya se usaron todas
        preguntasRestantes = [...preguntas];
    }
    const indice = Math.floor(Math.random() * preguntasRestantes.length);
    const pregunta = preguntasRestantes[indice];
    //eliminar del array para que no se repita
    preguntasRestantes.splice(indice, 1);
    //mezclar opciones
    const opciones = [pregunta.correcta, ...pregunta.incorrectas].sort(() => Math.random() - 0.5);
    return {
        pregunta: pregunta.pregunta,
        correcta: pregunta.correcta,
        imagen: pregunta.imagen,
        opciones: opciones
    };
}
app.get('/api/pregunta', (req, res) => {
    const pregunta = obtenerPreguntaAleatoria();
    res.json(pregunta);
});
const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log(`API de Preguntados corriendo en http://localhost:${puerto}`);
});
