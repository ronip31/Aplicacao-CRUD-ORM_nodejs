CREATE TABLE Veiculo (
    placa_veiculo VARCHAR(10) PRIMARY KEY,
    modelo_veiculo VARCHAR(255) NOT NULL,
    preco_veiculo DECIMAL(10, 2) NOT NULL,
    cpf_proprietario VARCHAR(11) NOT NULL,
    tipo_veiculo_id INT,
    FOREIGN KEY (tipo_veiculo_id) REFERENCES TipoVeiculo(id_tipo),
    FOREIGN KEY (cpf_proprietario) REFERENCES Proprietario(cpf)
);


CREATE TABLE TipoVeiculo (
    id_tipo INT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

INSERT INTO TipoVeiculo (id_tipo, descricao) VALUES
(1, 'popular'),
(2, 'luxo'),
(3, 'super luxo');

CREATE TABLE Proprietario (
    cpf VARCHAR(11) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    fone VARCHAR(15) NOT NULL
);

CREATE TABLE Token (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    cpf_proprietario VARCHAR(11) NOT NULL,
    FOREIGN KEY (cpf_proprietario) REFERENCES Proprietario(cpf)
);
