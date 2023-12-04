
import Usuario from '../../models/Usuario.js'
import jwt from 'jsonwebtoken';

const secretKey =  'keysecret';



export const executelogin = async (req, res) => {
    const { username, password } = req.body;
    console.log("req.body", req.body)
    try {
        const usuario = await Usuario.findOne({ where: { username } });

        if (usuario && usuario.password === password) {
            const token = jwt.sign({ id_user: usuario.id_user }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};





