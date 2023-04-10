create database db_info_y

create table clientes (
  id serial primary key,
  nome varchar(50) not null,
  endereco varchar(100),
  telefone varchar(15),
  email varchar(50) not null
);

create table ordem(
  id serial primary key,
  id_cliente integer references clientes(id)
  on delete cascade,
  data_emissao date default now(),
  equipamento varchar(150) not null,
  defeito varchar(150) not null,
  servico varchar(150),
  tecnico varchar(30),
  valor decimal(10,2)
 
);




