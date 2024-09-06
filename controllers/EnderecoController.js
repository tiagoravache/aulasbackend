const axios = require('axios');
const { Endereco } = require('../models');
console.log(Endereco)

exports.createEnderecoCep = async (req, res) => {
    try {
        const { cep } = req.params;
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (response.data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }

        const { logradouro, complemento, bairro, cidade, estado, municipioibge } = response.data;

        novoEndereco = await Endereco.create({
            cep: cep,
            logradouro: logradouro,
            numero: req.body.Numero, 
            complemento: complemento || req.body.complemento,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            municipioIBGE: municipioibge,
        });

        res.status(201).json(novoEndereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o endereço', details: error.message });
    }};

exports.createEndereco = async (req, res) => {
    try {
        const {id, cep, logradouro, numero, complemento, bairro, cidade, estado, municipioIBGE} = req.body;
        
        const novoEndereco = await Endereco.create({
            id,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            municipioIBGE,
        });

        res.status(201).json(novoEndereco);
    }catch(error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao criar endereço', details: error.message});
    }
};

exports.getAllEnderecos = async (req, res) => {
    try {
        const enderecos = await Endereco.findAll();
        res.status(200).json(enderecos);
    }catch(error) {
        res.status(500).json({ error: 'Erro ao buscar endereços', details: error.message});
    }
};

exports.getEnderecoById = async (req, res) => {
    try {
        const { Id } = req.params;
        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado'});
        }

        res.status(200).json(enderecos);
    }catch(error) {
        res.status(500).json({ error: 'Erro ao buscar endereço', details: error.message});
    }
}

exports.updateEndereco = async (req, res) => {
    try {
        const { Id } = req.params;
        const {Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE} = req.body;

        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado'})
        }

        endereco.cep = cep;
        endereco.logradouro = logradouro;
        endereco.numero = numero;
        endereco.complemento = complemento;
        endereco.bairro = bairro;
        endereco.cidade = cidade;
        endereco.estado = estado;
        endereco.municipioIBGE = municipioIBGE;

        await endereco.save();

        res.status(200).json(enderecos)
    }catch(error) {
        res.status(500).json({ error: 'Erro ao buscar endereço', details: error.message})
    }
}

exports.deleteEndereco = async (req, res) => {
    try {
        const { Id } = req.params;
        const endereco = await Endereco.findByPk(Id)

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado'})
        }

        await endereco.destroy();

        res.status(204).send();
    }catch(error) {
        res.status(500).json({ error: 'Erro ao buscar endereço', details: error.message})
    }
}