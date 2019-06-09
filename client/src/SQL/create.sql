CREATE TABLE empresa_aliada (
     id_empresa_aliada SERIAL,
     nombre_empresa VARCHAR(30) NOT NULL,
     fecha_creacion_empresa DATE,
     descripcion_empresa VARCHAR(100),
     fk_lugar VARCHAR(40) NOT NULL,
     CONSTRAINT fk_lugar_empresa FOREIGN KEY (fk_lugar)
     REFERENCES lugar (id_lugar),
     CONSTRAINT pk_id_empresa_aliada PRIMARY KEY (id_empresa_aliada)
)

CREATE TABLE proyecto (
     id_proyecto SERIAL,
     nombre_proyecto VARCHAR(30) NOT NULL,
     duracion_proyecto DATE NOT NULL,
     fk_lugar VARCHAR(40) NOT NULL,
     fk_compra_cliente INTEGER,
     fk_mineral INTEGER NOT NULL ,
     fk_yacimiento INTEGER NOT NULL UNIQUE,
     CONSTRAINT pk_id_proyecto PRIMARY KEY (id_proyecto),
     CONSTRAINT fk_lugar_proyecto FOREIGN KEY (fk_lugar)
     REFERENCES lugar (id_lugar),
     CONSTRAINT fk_compra_cliente_proyecto FOREIGN KEY (fk_compra_cliente)
     REFERENCES compra_cliente (id_compra_cliente),
     CONSTRAINT fk_mineral_proyecto FOREIGN KEY (fk_mineral)
     REFERENCES mineral (id_mineral),
     CONSTRAINT fk_yacimiento_proyecto FOREIGN KEY (fk_yacimiento)
     REFERENCES yacimiento (id_yacimiento)
)--NO ESTOY CLARO SI YACIMIENTO VA UNIQUE, OSEA SI SOLO SE HACE UN PROYECTO DE UN YACIMIENTO Y YA


CREATE TABLE etapa_explotacion (
     id_etapa SERIAL,
     nombre_etapa VARCHAR(30) NOT NULL,
     duracion_etapa DATE NOT NULL,
     descripcion_etapa VARCHAR(40),
     costo_etapa INTEGER NOT NULL ,
     numero_etapa INTEGER NOT NULL,
     fk_proyecto NUMBER(20),
     CONSTRAINT pk_id_etapa_explotacion PRIMARY KEY (id_etapa),
     CONSTRAINT fk_proyecto_etapa FOREIGN KEY (fk_proyecto)
     REFERENCES proyecto (id_proyecto)
)


CREATE TABLE presentacion (
     id_presentacion SERIAL,
     nombre_presentacion VARCHAR(30) NOT NULL,
     CONSTRAINT pk_id_presentacion PRIMARY KEY (id_presentacion)
)

CREATE TABLE compra_aliado (
     id_compra_aliado SERIAL,
     fecha_compra_aliado DATE NOT NULL,
     monto_total INTEGER NOT NULL,
     fk_empresa_aliada INTEGER NOT NULL,
     fk_proyecto INTEGER NOT NULL,
      CONSTRAINT pk_id_compra_aliado PRIMARY KEY (id_compra_aliado),
     CONSTRAINT fk_empresa_compra_aliado FOREIGN KEY (fk_empresa_aliada)
     REFERENCES empresa_aliada (id_empresa),
     CONSTRAINT fk_proyecto_compra_aliado FOREIGN KEY (fk_proyecto)
     REFERENCES proyecto (id_proyecto)
)

CREATE TABLE detalle_compra_aliado (
     id_detalle_compra_aliado SERIAL,
     cantidad INTEGER NOT NULL,
     precio INTEGER NOT NULL,
     fk_compra_aliado INTEGER NOT NULL,
     fk_mineral_metalico INTEGER,
     fk_mineral_no_metalico INTEGER,
     CONSTRAINT pk_id_detalle_compra_aliado PRIMARY KEY (id_detalle_compra_aliado),
     CONSTRAINT fk_compra_aliado_detalle FOREIGN KEY (fk_compra_aliado)
     REFERENCES empresa_aliada (id_empresa),
     CONSTRAINT fk_mineral_metalico_compra_aliado FOREIGN KEY (fk_mineral_metalico)
     REFERENCES mineral_metalico (id_mineral_metalico),
     CONSTRAINT fk_mineral_no_metalico_compra_aliado FOREIGN KEY (fk_mineral_no_metalico)
     REFERENCES mineral_no_metalico (id_mineral_no_metalico)
)
--revisar

CREATE TABLE pago (
     id_pago SERIAL,
     fecha_pago DATE NOT NULL,
     monto_total_pagado INTEGER NOT NULL,
     fk_compra_cliente INTEGER NOT NULL,
     CONSTRAINT pk_id_pago PRIMARY KEY (id_pago),
     CONSTRAINT fk_compra_cliente_pago FOREIGN KEY (fk_compra_cliente)
     REFERENCES compra_cliente (id_compra_cliente)
)

CREATE TABLE pago_pago (
     id_pago_pago SERIAL,
     monto_total_pagado INTEGER NOT NULL,
     fk_tipo_pago INTEGER,
     fk_pago INTEGER,
     CONSTRAINT pk_id_pago_pago PRIMARY KEY (id_pago_pago),
     CONSTRAINT pk_tipo_pago PRIMARY KEY (fk_tipo_pago),
     CONSTRAINT pk_pago PRIMARY KEY (fk_pago),
     CONSTRAINT fk_tipo_pago_pago FOREIGN KEY (fk_tipo_pago)
     REFERENCES tipo_pago (id_tipo_pago),
     CONSTRAINT fk_pago_pago FOREIGN KEY (fk_pago)
     REFERENCES pago (id_pago)
)

CREATE TABLE tipo_pago_banco (
     id_tipo_pago_banco SERIAL PRIMARY KEY,
     fk_tipo_pago INTEGER,
     fk_banco INTEGER,
     CONSTRAINT pk_id_tipo_pago_banco PRIMARY KEY (id_tipo_pago_banco),
     CONSTRAINT pk_tipo_pago PRIMARY KEY (fk_tipo_pago),
     CONSTRAINT pk_banco PRIMARY KEY (fk_banco),
     CONSTRAINT fk_tipo_pago_tipo_banco FOREIGN KEY (fk_tipo_pago)
     REFERENCES tipo_pago (id_tipo_pago),
     CONSTRAINT fk_banco_tipo_pago FOREIGN KEY (fk_banco)
     REFERENCES banco (id_banco)
)

CREATE TABLE telefono (
     id_telefono SERIAL, 
     nro_telefono INTEGER NOT NULL UNIQUE,
     fk_empleado INTEGER,
     fk_empresa INTEGER,
     fk_empresa_aliada INTEGER,
     fk_persona INTEGER,
     CONSTRAINT pk_id_telefono PRIMARY KEY (id_telefono),
     CONSTRAINT fk_empleado_telefono FOREIGN KEY (fk_empleado)
     REFERENCES empleado (id_empleado),
     CONSTRAINT fk_empresa_telefono FOREIGN KEY (fk_empresa)
     REFERENCES empresa (id_empresa),
     CONSTRAINT fk_empresa_aliada_telefono FOREIGN KEY (fk_empresa_aliada)
     REFERENCES empresa_aliada (id_empresa_aliada),
     CONSTRAINT fk_persona_telefono FOREIGN KEY (fk_persona)
     REFERENCES persona (id_persona)
)


CREATE TABLE correo (
     id_correo SERIAL,
     correo_electronico VARCHAR(40) NOT NULL UNIQUE,
     fk_empleado INTEGER,
     fk_empresa INTEGER,
     fk_persona INTEGER,
     CONSTRAINT pk_id_correo PRIMARY KEY (id_correo),
     CONSTRAINT fk_empleado_correo FOREIGN KEY (fk_empleado)
     REFERENCES empleado (id_empleado),
     CONSTRAINT fk_empresa_correo FOREIGN KEY (fk_empresa)
     REFERENCES empresa (id_empresa),
     CONSTRAINT fk_persona_persona FOREIGN KEY (fk_persona)
     REFERENCES persona (id_persona)
)

CREATE TABLE status_compra_cliente (
     id_status_compra_cliente SERIAL,
     fecha_cambio DATE NOT NULL,
     fk_tipo_status INTEGER,
     fk_compra_cliente INTEGER,
     CONSTRAINT pk_id_status_compra_cliente PRIMARY KEY (id_status_compra_cliente,fk_tipo_status,fk_compra_cliente),
     CONSTRAINT fk_tipo_status_compra_cliente FOREIGN KEY (fk_tipo_status)
     REFERENCES tipo_status (id_tipo_status),
     CONSTRAINT fk_compra_cliente_status_compra FOREIGN KEY (fk_compra_cliente)
     REFERENCES compra_cliente (id_compra_cliente)
)


CREATE TABLE tipo_status(
     id_tipo_satus SERIAL,
     nombre_tipo_status VARCHAR(30) NOT NULL,
     CONSTRAINT pk_id_tipo_status PRIMARY KEY (id_tipo_satus)
)

CREATE TABLE status_mineral_yacimiento(
     id_status_mineral_yacimiento SERIAL,
     fecha_cambio DATE NOT NULL,
     fk_tipo_status INTEGER,
     fk_mineral_yacimiento INTEGER,
     CONSTRAINT pk_id_status_mineral_yacimiento PRIMARY KEY (id_status_mineral_yacimiento,fk_tipo_status,fk_mineral_yacimiento),
     CONSTRAINT fk_tipo_status_mineral_yacimiento FOREIGN KEY (fk_tipo_status)
     REFERENCES tipo_status (id_tipo_status),
     CONSTRAINT fk_mineral_yacimiento_status_mineral FOREIGN KEY (fk_mineral_yacimiento)
     REFERENCES mineral_yacimiento (id_mineral,id_yacimiento)
)
CREATE TABLE status_proyecto (
     id_status_proyecto SERIAL PRIMARY KEY,
     fecha_cambio DATE NOT NULL,
     fk_tipo_status INTEGER,
     fk_proyecto INTEGER,
     CONSTRAINT pk_status_proyecto PRIMARY KEY (id_status_proyecto,fk_tipo_status,fk_proyecto),
     CONSTRAINT fk_tipo_status_proyecto FOREIGN KEY (fk_tipo_status)
     REFERENCES tipo_status (id_tipo_status),
     CONSTRAINT fk_proyecto_status FOREIGN KEY (fk_proyecto)
     REFERENCES proyecto (id_proyecto)
)




