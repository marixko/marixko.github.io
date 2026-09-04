---
title: "7.1 - Planejamento e execução de uma noite de observação"
course: astro-obs
---

## Da ideia ao dado

Uma observação bem-sucedida é decidida muito antes da noite: na proposta, no cálculo de viabilidade e no plano de calibração. Esta aula percorre o ciclo completo, da submissão de tempo ao backup dos dados de manhã.

### Conteúdo

- A proposta de tempo
- Fase 2: blocos de observação
- Modos de observação
- Antes da noite
- Durante a noite
- Calibrações e encerramento

## A proposta de tempo

O acesso a telescópios passa por um **comitê de alocação** (TAC), que avalia propostas competitivas. Uma proposta tem:

- **justificativa científica**: a pergunta, por que importa, por que agora, por que este telescópio;
- **justificativa técnica**: alvos, magnitudes, instrumento e modo, e um cálculo de **tempo de exposição** com uma *exposure time calculator* que mostre que o S/N pretendido é atingível nas condições realistas do sítio;
- **lista de alvos** com coordenadas, magnitudes, e a época do ano em que são observáveis daquele hemisfério;
- **viabilidade**: *seeing* necessário, fase da Lua, número de noites, e um plano B se as condições não colaborarem.

A taxa de aprovação típica é de 20 a 30 por cento.

## Fase 2: blocos de observação

Aprovado o tempo, prepara-se a **fase 2**: os **blocos de observação** (OBs), que especificam exatamente o que o telescópio fará. Cada OB contém a configuração do instrumento, as exposições, e as **restrições** sob as quais ele pode ser executado (*seeing* máximo, transparência, distância à Lua, massa de ar máxima, faixa horária). Prepara-se também uma **carta de identificação** (*finding chart*) para cada alvo, com a orientação do campo, a estrela guia e, em espectroscopia, o ângulo da fenda.

## Modos de observação

- **Clássico / visitante**: o astrônomo vai ao telescópio (ou opera remotamente) e conduz as suas noites. Máxima flexibilidade para reagir aos dados; risco total do clima.
- **Serviço / fila** (*service*, *queue*): a equipe do observatório executa os OBs quando as condições casam com as restrições. Melhor aproveitamento das melhores noites, menos flexibilidade, e é preciso que os OBs sejam autossuficientes.
- **Alvo de oportunidade** (ToO): interrompe o programa em andamento para observar um transiente. Requer gatilho e critérios pré-aprovados.

## Antes da noite

Checklist da tarde:

- **Previsão**: meteorologia, umidade, vento, cobertura de nuvens, e monitor de *seeing* se houver.
- **Efemérides**: nascer/pôr do Sol e da Lua, crepúsculo astronômico, tempo sideral no início e no fim da noite, e a ordem em que os alvos ficam bem posicionados (o **plano de noite**).
- **Configuração do instrumento**: filtros, rede, largura de fenda, binning, ganho.
- **Plano de calibração**: quantos *bias*, *flats* (dome à tarde, twilight no crepúsculo), *arcs*, quantas **estrelas padrão** (fotométricas ou espectrofotométricas e telúricas) e em que massas de ar.
- **Alvos padrão de apoio**: campos de padrões acessíveis em várias massas de ar, estrelas de foco, campos para modelo de apontamento.

## Durante a noite

Sequência típica:

1. **Abertura da cúpula** ao pôr do Sol (respeitando limites de umidade e vento), equalização térmica.
2. **Foco**: sequência de exposições curtas de uma estrela em foco variável; escolhe-se o que minimiza a FWHM. Refazer ao longo da noite quando a temperatura cai.
3. **Modelo de apontamento** e verificação da guiagem.
4. **Twilight flats** no crepúsculo, com o telescópio movendo entre exposições para eliminar estrelas.
5. **Aquisição do alvo**: identificar pelo *finding chart*; em espectroscopia, tomar uma imagem "através da fenda" e ajustar a posição, ou usar um **offset cego** a partir de uma estrela brilhante próxima.
6. **Exposições de ciência**, com a estrela guia travada; entre elas, checar em tempo real: contagens de pico (não saturar), FWHM, S/N estimado, fundo de céu.
7. **Estrelas padrão** intercaladas ao longo da noite, cobrindo a faixa de massa de ar.
8. **Log de observação**: registrar cada exposição com hora, alvo, tempo, massa de ar, *seeing*, condições, e qualquer anomalia. O log é parte do dado; sem ele, a redução meses depois fica adivinhando.
9. **Adaptar**: se o *seeing* piora, trocar para alvos brilhantes ou fotometria de banda larga; se entram nuvens, passar a alvos que toleram noite não fotométrica (fotometria diferencial) ou a calibrações.

## Calibrações e encerramento

- **Bias e darks**: podem ser tomados a qualquer hora com a cúpula fechada.
- **Dome flats**: à tarde ou de manhã.
- **Arcs**: junto de cada configuração espectroscópica usada, idealmente antes e depois de cada alvo, na mesma posição do telescópio (flexão).
- Ao amanhecer: **twilight flats** de manhã se os da tarde falharam, fechar a cúpula antes do nascer do Sol.
- **Backup dos dados** em pelo menos dois lugares antes de sair.
- **Completar o log** e anotar o que fazer diferente na próxima noite.

A etiqueta importa: respeitar os limites de segurança da cúpula, não forçar operação em condições marginais de umidade ou vento, e deixar o instrumento e o log em ordem para o próximo grupo.
