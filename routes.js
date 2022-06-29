// Criar usuário
app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
// Verificar se username é valido
const userExists = await User.findOne({username});

if (userExists) return res.status(400).send({error: "Username already in use."});

//Criar novo usuário no banco
const user = await User.create({
 username,
 password:  hash
})

res.status(201).send({
 id: user.id,
 username: user.username
});    
} catch (err) {       
    res.status(400)
    next(err);
  }
});

// Criptografar a senha
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);
