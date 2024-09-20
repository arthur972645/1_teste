import "dotenv/config"
import express from "express"
import cors from "cors"

//importar conexão do banco
import conn from "./config/conn.js"

//Importar os modelos do banco de dados
import Usuarios from "./models/usuariosModls.js"


//*IMPORTAÇÃO DAS ROTAS
import UsuariosRotas from "./routes/UsuarioRoutes.js"



const PORT = 5555
const app = express()


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Conexão com o banco
conn
.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor on PORT: ${PORT}`)
    })
})
.catch((error) => console.error(error))

//utilizar rotas
app.use("/teste", UsuariosRotas)

app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada" });
  });