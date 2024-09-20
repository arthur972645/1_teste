import Usuarios from "../models/usuariosModls.js";
import bcrypt from "bcrypt";


export const cadastrar = async (request, response) => {
  const { nome, email, senha} = request.body
  console.log(request.body);  
  const emailAlreadyExists = await Usuarios.findOne({
    where: { email },
  });

  if (emailAlreadyExists) {
    return response
      .status(409)
      .json({ message: "E-mail já cadastrado" });
  }

  
  
    try {

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);
  
      const newUser = {
        nome,
        email,
        senha: hashedPassword,
      };
  
      await Usuarios.create(newUser);
  
      response.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Erro ao cadastrar usuário na aplicação" });
    }
  };

export const login = async (request, response) => {
  const { email, senha } = request.body;
  if(!email){
      return response.status(401).json({message: "O email é obirgatorio"})
  }
  if(!senha){
      return response.status(401).json({message: "A senha é obrigatoria"})
  }

  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
      return response.status(404).json({ message: "Usuário não encontrado" });
  }
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if(!senhaCorreta){
      return response.status(401).json({ message: "senha inválida" });
  }
  try {
      response.status(200).json({ message: "Login realizado com sucesso" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "erro ao processar informação" });
    }
  
};

export const getAll = async (request, response) => {
    const users = await Usuarios.findAll();
    return response.json(users);
}