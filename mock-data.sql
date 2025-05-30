-- Insert mock data for medicos table
INSERT INTO users (name, email, password, crm, telefone, remember_token, created_at, updated_at)
VALUES 
('Dr. João Silva', 'joao.silva@clinica.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CRM/SP 123456', '(11) 98765-4321', NULL, NOW(), NOW()),
('Dra. Maria Oliveira', 'maria.oliveira@clinica.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CRM/SP 654321', '(11) 98765-1234', NULL, NOW(), NOW()),
('Dr. Carlos Souza', 'carlos.souza@clinica.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CRM/SP 789012', '(11) 98765-5678', NULL, NOW(), NOW()),
('Dra. Ana Costa', 'ana.costa@clinica.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CRM/SP 210987', '(11) 98765-8765', NULL, NOW(), NOW()),
('Dr. Pedro Santos', 'pedro.santos@clinica.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CRM/SP 345678', '(11) 98765-3456', NULL, NOW(), NOW());

-- Insert mock data for pacientes table
INSERT INTO pacientes (name, email, cpf, telefone, created_at, updated_at)
VALUES 
('Luiz Ferreira', 'luiz.ferreira@gmail.com', '123.456.789-01', '(11) 98765-1111', NOW(), NOW()),
('Mariana Alves', 'mariana.alves@gmail.com', '234.567.890-12', '(11) 98765-2222', NOW(), NOW()),
('Ricardo Nunes', 'ricardo.nunes@gmail.com', '345.678.901-23', '(11) 98765-3333', NOW(), NOW()),
('Patricia Lima', 'patricia.lima@gmail.com', '456.789.012-34', '(11) 98765-4444', NOW(), NOW()),
('Fernando Rocha', 'fernando.rocha@gmail.com', '567.890.123-45', '(11) 98765-5555', NOW(), NOW()),
('Camila Dias', 'camila.dias@gmail.com', '678.901.234-56', '(11) 98765-6666', NOW(), NOW()),
('Gustavo Martins', 'gustavo.martins@gmail.com', '789.012.345-67', '(11) 98765-7777', NOW(), NOW()),
('Juliana Barbosa', 'juliana.barbosa@gmail.com', '890.123.456-78', '(11) 98765-8888', NOW(), NOW()),
('Roberto Castro', 'roberto.castro@gmail.com', '901.234.567-89', '(11) 98765-9999', NOW(), NOW()),
('Tatiana Gonçalves', 'tatiana.goncalves@gmail.com', '012.345.678-90', '(11) 98765-0000', NOW(), NOW());

-- Insert mock data for consultas table
INSERT INTO agendamentos (medico_id, paciente_id, data_hora, observacoes, status, created_at, updated_at)
VALUES 
(1, 1, '2023-06-15 09:00:00', 'Paciente com dores abdominais', 'agendado', NOW(), NOW()),
(2, 2, '2023-06-15 10:30:00', 'Consulta de rotina', 'agendado', NOW(), NOW()),
(3, 3, '2023-06-16 14:00:00', 'Acompanhamento pós-operatório', 'agendado', NOW(), NOW()),
(4, 4, '2023-06-16 15:30:00', 'Exame de rotina', 'agendado', NOW(), NOW()),
(5, 5, '2023-06-17 08:00:00', 'Paciente com enxaqueca', 'agendado', NOW(), NOW()),
(1, 6, '2023-06-17 11:00:00', 'Avaliação de exames', 'agendado', NOW(), NOW()),
(2, 7, '2023-06-18 13:00:00', 'Consulta de retorno', 'agendado', NOW(), NOW()),
(3, 8, '2023-06-18 16:30:00', 'Paciente com alergia', 'agendado', NOW(), NOW()),
(4, 9, '2023-06-19 09:30:00', 'Acompanhamento crônico', 'agendado', NOW(), NOW()),
(5, 10, '2023-06-19 10:00:00', 'Consulta pediátrica', 'agendado', NOW(), NOW()),
(1, 3, '2023-06-20 08:30:00', 'Segunda opinião', 'agendado', NOW(), NOW()),
(2, 5, '2023-06-20 14:00:00', 'Avaliação de tratamento', 'agendado', NOW(), NOW()),
(3, 7, '2023-06-21 10:00:00', 'Consulta de rotina', 'agendado', NOW(), NOW()),
(4, 9, '2023-06-21 11:30:00', 'Controle de medicação', 'agendado', NOW(), NOW()),
(5, 2, '2023-06-22 15:00:00', 'Exame de vista', 'agendado', NOW(), NOW());
