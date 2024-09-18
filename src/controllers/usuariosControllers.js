import Usuarios from "../models/usuariosModls.js";
import bcrypt from "bcrypt";


export const cadastrar = async (request, response) => {
    const { nome , email, senha } = request.body;
  
    if (!nome || !email || !senha) {
      return response
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }
  
    try {
      const emailAlreadyExists = await Usuarios.findOne({
        where: { email },
      });
  
      if (emailAlreadyExists) {
        return response
          .status(409)
          .json({ message: "E-mail já cadastrado" });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);
  
      const newUser = {
        name: nome,
        email,
        senha: hashedPassword,
      };
  
      await Usuarios.create(newUser);
  
      response.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      response.status(500).json({ message: "Erro ao cadastrar usuário na aplicação" });
    }
  };

export const login = async (request, response) => {
    const { email, senha } = request.body;

    if (!email || !senha) {
        return response
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

    try{
        const user = await Usuarios.findOne({ where: { email } });

        if (!user) {
            return response.status(404).json({ message: "E-mail não encontrado" });
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if(!senhaCorreta){
            return response.status(401).json({ message: "senha inválida" });
        }

        response.status(200).json({ message: "Login realizado com sucesso" });
       
    }catch(error){ 
        response.status(500).json({ message: "Erro ao logar na aplicação" });
    }
}
export const getAll = async (request, response) => {
    const users = await Usuarios.findAll();
    return response.json(users);
}