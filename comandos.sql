create database appveiculo;

-- Script para criar a tabela Veiculo com relação com Proprietario
CREATE TABLE TipoVeiculo (
    id_tipo INT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

INSERT INTO TipoVeiculo (id_tipo, descricao) VALUES
(1, 'popular'),
(2, 'luxo'),
(3, 'super luxo');

CREATE TABLE Veiculo (
    placa_veiculo VARCHAR(10) PRIMARY KEY,
    modelo_veiculo VARCHAR(255) NOT NULL,
    preco_veiculo DECIMAL(10, 2) NOT NULL,
    tipo_veiculo_id INT,
    FOREIGN KEY (tipo_veiculo_id) REFERENCES TipoVeiculo(id_tipo)
);

CREATE TABLE Proprietario (
    cpf VARCHAR(11) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    fone VARCHAR(15) NOT NULL
);

CREATE TABLE ProprietarioVeiculo (
    cpf_proprietario VARCHAR(11),
    placa_veiculo VARCHAR(10),
    PRIMARY KEY (cpf_proprietario, placa_veiculo),
    FOREIGN KEY (cpf_proprietario) REFERENCES Proprietario(cpf),
    FOREIGN KEY (placa_veiculo) REFERENCES Veiculo(placa_veiculo)
);

SELECT `cpf`, `nome`, `fone` FROM `Proprietario` AS `Proprietario`;

select * from tipoveiculo;
select * from veiculo;
select * from proprietario;
select * from ProprietarioVeiculo;
SELECT `placa_veiculo`, `modelo_veiculo`, `preco_veiculo`, `tipo_veiculo_id` FROM `Veiculo` AS `Veiculo`;

SELECT `ProprietarioVeiculo`.`cpf_proprietario`, `ProprietarioVeiculo`.`placa_veiculo`, `Veiculo`.`placa_veiculo` AS `Veiculo.placa_veiculo`, `Veiculo`.`modelo_veiculo` AS `Veiculo.modelo_veiculo`, `Veiculo`.`preco_veiculo` AS `Veiculo.preco_veiculo`, `Veiculo`.`tipo_veiculo_id` AS `Veiculo.tipo_veiculo_id`, `Veiculo->TipoVeiculo`.`id_tipo` AS `Veiculo.TipoVeiculo.id_tipo`, `Veiculo->TipoVeiculo`.`id_tipo` AS `Veiculo.TipoVeiculo.id_tipo`, `Veiculo->TipoVeiculo`.`descricao` AS `Veiculo.TipoVeiculo.descricao` FROM `ProprietarioVeiculo` AS `ProprietarioVeiculo` LEFT OUTER JOIN `Veiculo` AS `Veiculo` ON `ProprietarioVeiculo`.`placa_veiculo` = `Veiculo`.`placa_veiculo` LEFT OUTER JOIN `TipoVeiculo` AS `Veiculo->TipoVeiculo` ON `Veiculo`.`tipo_veiculo_id` = `Veiculo->tipo_veiculo_id` WHERE `ProprietarioVeiculo`.`cpf_proprietario` = '5959595995';]


SELECT `ProprietarioVeiculo`.`cpf_proprietario`, `ProprietarioVeiculo`.`placa_veiculo`, `Veiculo`.`placa_veiculo` AS `Veiculo.placa_veiculo`, `Veiculo`.`modelo_veiculo` AS `Veiculo.modelo_veiculo`, `Veiculo`.`preco_veiculo` AS `Veiculo.preco_veiculo`, `Veiculo`.`tipo_veiculo_id` AS `Veiculo.tipo_veiculo_id`, `Veiculo->tipo_veiculo_id` AS `Veiculo.TipoVeiculo.id`, `Veiculo->TipoVeiculo`.`id_tipo` AS `Veiculo.TipoVeiculo.id_tipo`, `Veiculo->TipoVeiculo`.`descricao` AS `Veiculo.TipoVeiculo.descricao` FROM `ProprietarioVeiculo` AS `ProprietarioVeiculo` LEFT OUTER JOIN `Veiculo` AS `Veiculo` ON `ProprietarioVeiculo`.`placa_veiculo` = `Veiculo`.`placa_veiculo` LEFT OUTER JOIN `TipoVeiculo` AS `Veiculo->TipoVeiculo` ON `Veiculo`.`tipo_veiculo_id` = `Veiculo->TipoVeiculo`.`id` WHERE `ProprietarioVeiculo`.`cpf_proprietario` = '5959595995';
