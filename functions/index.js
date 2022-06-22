const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const messaging = admin.messaging();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);


let CATEGORIAS_CONST = [
  {id: 0, name: 'Fones e Headsets'},
  {id: 1, name: 'Celulares e Telefones'},
  {id: 2, name: 'Informatica'},
  {id: 3, name: 'Video game'},
  {id: 4, name: 'Eletronicos'},
  {id: 5, name: 'Automotivos'},
  {id: 6, name: 'Relogios E Joias'},
  {id: 7, name: 'Audio e Som'},
  {id: 8, name: 'Smartwacth'},
  {id: 9, name: 'Bebês e Crianças'},
  {id: 10, name: 'Ferramentas'},
  {id: 11, name: 'Casa e Cozinha'},
  {id: 12, name: 'Moda e Acessorios'},
  {id: 13, name: 'Salão e Barbearia'},
  {id: 14, name: 'Malas e Bolsas'},
  {id: 15, name: 'Piscinas e Boias'},
  {id: 16, name: 'Saúde e Beleza'},
  {id: 17, name: 'Petshop'},
  {id: 18, name: 'Esportes'},
  {id: 19, name: 'Livraria e Papelaria'},
];

let COLECOES_LIST = [
  //FONES E HEADSETS
  {id: 1, name: 'Fones com fio'},
  {id: 2, name: 'Fones bluetooth'},
  {id: 3, name: 'Headphone'},
  {id: 4, name: 'Headset'},
  {id: 5, name: 'Headset Gamer'},
  {id: 6, name: 'Headset Infantil'},
  {id: 7, name: 'Fones Ip'},
  {id: 8, name: 'Capas para Fone'},
  //CELULARES
  {id: 101, name: 'Celulares simples'},
  {id: 102, name: 'Bateria de Celular'},
  {id: 103, name: 'Cabos para Celular'},
  {id: 104, name: 'Carregadores'},
  {id: 105, name: 'Telefone com fio'},
  {id: 106, name: 'Telefone sem fio'},
  {id: 107, name: 'Pelicula Protetora'},
  {id: 108, name: 'Capas Xiaome'},
  {id: 109, name: 'Capas Iphone'},
  {id: 110, name: 'Capas Samsung'},
  {id: 111, name: 'Capas Anti Impacto'},
  {id: 112, name: 'Tripe e Suporte'},
  {id: 113, name: 'Gatilhos e Gamepad'},
  {id: 114, name: 'Acessorios para celular'},
  {id: 115, name: 'Peças para Celular'},
  {id: 116, name: 'Aparelhos para Manutenção'},
  //INFORMATICA
  {id: 201, name: 'Armazenamento e Discos Rigidos'},
  {id: 202, name: 'Equipamentos de Rede'},
  {id: 203, name: 'Teclados'},
  {id: 204, name: 'Mouses'},
  {id: 205, name: 'Webcans'},
  {id: 206, name: 'Peças para Computador'},
  {id: 207, name: 'Suportes e Coolers'},
  {id: 208, name: 'MousePads'},
  {id: 209, name: 'Microfone pra Computador'},
  {id: 210, name: 'Acessorios para Pc Gamer'},
  {id: 211, name: 'Caixas de som para Computador'},
  {id: 212, name: 'Cabos para Computador'},
  {id: 213, name: 'Nobreak'},
  {id: 214, name: 'Fonte pra Pc'},
  //VIDEO GAME
  {id: 301, name: 'Controles para Video game'},
  {id: 302, name: 'Acessorios para Xbox One'},
  {id: 303, name: 'Acessorios para Xbox 360'},
  {id: 304, name: 'Acessorios para Playstation 2'},
  {id: 305, name: 'Acessorios para Playstation 3'},
  {id: 306, name: 'Acessorios para Playstation 4'},
  {id: 307, name: 'Headset para Video game'},
  {id: 308, name: 'Jogos para Video game'},
  {id: 309, name: 'Video games portateis'},
  {id: 310, name: 'Games infantis'},
  {id: 311, name: 'Cabos para Videogame'},
  //ELETRONICOS
  {id: 401, name: 'Acessorios de Tv'},
  {id: 402, name: 'Antenas de Tv'},
  {id: 403, name: 'Controles de Tv'},
  {id: 404, name: 'Controles de Ar'},
  {id: 405, name: 'Controles de Dvd'},
  {id: 406, name: 'Liquidificadores'},
  {id: 407, name: 'Cafeteiras'},
  {id: 408, name: 'Panelas Eletricas'},
  {id: 409, name: 'Fogões'},
  {id: 410, name: 'Umidificadores'},
  {id: 411, name: 'Trituradores e Processadores'},
  {id: 412, name: 'Ferros de Passar'},
  {id: 413, name: 'Ventiladores'},
  {id: 414, name: 'Sanduicheiras'},
  {id: 415, name: 'Microondas'},
  {id: 416, name: 'Batedeira'},
  {id: 417, name: 'Balanças'},
  {id: 418, name: 'Luzes e Iluminação'},
  {id: 419, name: 'Baterias e Pilhas'},
  {id: 420, name: 'Lanternas'},
  {id: 421, name: 'Tomadas e Extensões'},
  {id: 422, name: 'Massageadores'},
  {id: 423, name: 'Cigarros Eletronicos'},
  {id: 424, name: 'Casa Inteligente'},
  {id: 425, name: 'Sistemas de Seguranças'},
  {id: 426, name: 'Cameras de Monitoramento'},
  {id: 427, name: 'Impressoras'},
  //AUTOMOTIVOS
  {id: 501, name: 'Som Automotivo'},
  {id: 502, name: 'Cameras Automotivas'},
  {id: 503, name: 'Lampadas Automotivas'},
  {id: 504, name: 'Suportes Automotivos para Celular'},
  {id: 505, name: 'Capas Automotivas'},
  {id: 506, name: 'Aromatizador'},
  {id: 507, name: 'Capas para Banco de Carro'},
  {id: 508, name: 'Tapates de Carro'},
  {id: 509, name: 'Aspirador Automotivo'},
  {id: 510, name: 'Capas para Volante'},
  {id: 511, name: 'Carregador Veicular'},
  {id: 512, name: 'Suporte Veicular de Moto'},
  {id: 513, name: 'GPS Veicular'},
  {id: 514, name: 'Compressor de Ar para Carro'},
  //RELOGIOS
  {id: 601, name: 'Relogio a prova dagua'},
  {id: 602, name: 'Relogio Femino'},
  {id: 603, name: 'Relogio Masculino'},
  {id: 604, name: 'Relogio Infantil'},
  {id: 605, name: 'Relogio com Calendario'},
  {id: 606, name: 'Relogio Esportivo'},
  {id: 607, name: 'Kits Relogios'},
  {id: 608, name: 'Relogio Led'},
  {id: 609, name: 'Relogio de Ponteiro'},
  {id: 610, name: 'Relogio de Parede'},
  //CAIXAS DE SOM
  {id: 701, name: 'Caixas de Som'},
  {id: 702, name: 'Mini Caixas de Som'},
  {id: 703, name: 'Radio a Pilha'},
  {id: 704, name: 'Radio Retro'},
  {id: 705, name: 'Instrumentos musicais'},
  {id: 706, name: 'Mesas de som'},
  {id: 707, name: 'Cabos Para Audio e Som'},
  {id: 708, name: 'Caixas Amplicadas'},
  {id: 709, name: 'Microfone Com fio'},
  {id: 710, name: 'Microfone Sem fio'},
  {id: 711, name: 'Tripe para Caixa e Microfone'},
  {id: 712, name: 'Acessorios para Instrumentos'},
  //SMARTWATCH
  {id: 801, name: 'SmartWacth a Prova Dagua'},
  {id: 802, name: 'SmartWatch que faz Ligação'},
  {id: 803, name: 'SmartWatch que pega Chip'},
  {id: 804, name: 'SmartBand'},
  {id: 805, name: 'Pulseiras 44mm'},
  {id: 806, name: 'Pulseiras 38mm'},
  //BEBES E CRIANÇAS
  {id: 901, name: 'Pop it'},
  {id: 902, name: 'Brinquedos de Pelucia'},
  {id: 903, name: 'Carrinho de controle Remoto'},
  {id: 904, name: 'Pista de Carrinhos'},
  {id: 905, name: 'Carrinhos de brinquedo'},
  {id: 906, name: 'Arma de Agua'},
  {id: 907, name: 'Arma de Dardos'},
  {id: 908, name: 'Jogos de Tabuleiro'},
  {id: 909, name: 'Roupas para Bebes'},
  {id: 910, name: 'Sapatos para Bebes'},
  {id: 911, name: 'Brinquedos para Bebes'},
  {id: 912, name: 'Roupas para Crianças'},
  {id: 913, name: 'Sapatos para Crianças'},
  {id: 914, name: 'Brinquedos para Crianças'},
  {id: 915, name: 'Andadores e Carrinhos'},
  {id: 916, name: 'Artigos de Maternidade'},
  {id: 917, name: 'Bolas e Balões'},
  //FERRAMENTAS
  {id: 1001, name: 'Furadeiras'},
  {id: 1002, name: 'Parafusadeiras'},
  {id: 1003, name: 'Serras Eletricas'},
  {id: 1004, name: 'Marteleres'},
  {id: 1005, name: 'Lixadeira e Esmerilhadeiras'},    
  {id: 1006, name: 'Kits de Ferramentas'},
  {id: 1007, name: 'Acessorios para Eletrica'},
  {id: 1008, name: 'Acessorios para Pintura'},
  {id: 1009, name: 'Ferramentas para Construção'},
  {id: 1010, name: 'Alicates'},
  {id: 1011, name: 'Martelos'},
  {id: 1012, name: 'Chaves e Kits'},
  //CASA E COZINHA
  {id: 1101, name: 'Jogos de Panelas'},
  {id: 1102, name: 'Jogos de Talheres'},
  {id: 1103, name: 'Panela de Pressão'},
  {id: 1104, name: 'Bomba de Garrafão'},
  {id: 1105, name: 'Balanças'},
  {id: 1106, name: 'Trituradores Manuais'},
  {id: 1107, name: 'Frigideiras'},
  {id: 1108, name: 'Potes'},
  {id: 1109, name: 'Vasilhas'},
  {id: 1110, name: 'Cesto Organizador'},
  {id: 1111, name: 'Varal e Prendedores'},
  {id: 1112, name: 'Mangueiras'},
  {id: 1113, name: 'Tapetes'},
  {id: 1114, name: 'Luminarias'},
  {id: 1115, name: 'Acessorios para churrasco'},
  {id: 1116, name: 'Pratos'},
  {id: 1117, name: 'Copos e Canecas'},
  {id: 1118, name: 'Jarras'},
  {id: 1119, name: 'Escorredores'},
  {id: 1101, name: 'Decoração para Casa'},
  {id: 1120, name: 'Porta Retratos'},
  {id: 1121, name: 'Artigos para Banheiro'},
  {id: 1122, name: 'Artigos de Jardim'},
  //MODA E ACESSORIOS
  {id: 1201, name: 'Roupas Feminina'},
  {id: 1202, name: 'Roupas Masculinas'},
  {id: 1203, name: 'Roupas Infantis'},
  {id: 1204, name: 'Roupas Intimas para Mulher'},
  {id: 1205, name: 'Fantasias'},
  {id: 1206, name: 'Bonés e Chapeis'},
  {id: 1207, name: 'Oculos'},
  {id: 1208, name: 'Bijuterias'},
  {id: 1209, name: 'Correntes e Pulseiras'},
  {id: 1210, name: 'Semi Joias'},
  {id: 1211, name: 'Cinta Modeladora'},
  {id: 1212, name: 'Tenis e Sapatos'},
  {id: 1213, name: 'Meias'},
  {id: 1214, name: 'Camisas de Time'},
  //SALAO E BARBEARIA
  {id: 1301, name: 'Secadores de Cabelo'},
  {id: 1302, name: 'Chapinhas e Modeladoras'},
  {id: 1303, name: 'Aparador de Barba'},
  {id: 1304, name: 'Maquina de Corte'},
  {id: 1305, name: 'Acessorios para Manicure'},
  {id: 1306, name: 'Depiladores Eletricos'},
  {id: 1307, name: 'Tesoura de Cabelo'},
  //MALAS E BOLSAS
  {id: 1401, name: 'Mochilas Femininas'},
  {id: 1402, name: 'Mochilas Masculinas'},
  {id: 1403, name: 'Mochilas Infantis'},
  {id: 1404, name: 'Bolsas'},
  {id: 1405, name: 'Polchetes'},
  {id: 1406, name: 'Malas'},
  {id: 1407, name: 'Bolsas Termicas'},
  //PISCINAS E BOIAS
  {id: 1501, name: 'Piscina para Adulto'},
  {id: 1502, name: 'Piscina para Crianças'},
  {id: 1503, name: 'Boias Grandes'},
  {id: 1504, name: 'Boias Pequenas'},
  //SAUDE E BELEZA
  {id: 1601, name: 'Medidor de Pressão'},
  {id: 1602, name: 'Oximetro'},
  {id: 1603, name: 'Termometro'},
  {id: 1604, name: 'Shakes e Suplementos'},
  {id: 1605, name: 'Vitaminas e Minerais'},
  {id: 1606, name: 'Cosmesticos'},
  {id: 1607, name: 'Perfumes'},
  {id: 1608, name: 'Maquiagens'},
  {id: 1609, name: 'Cilios'},
  {id: 1610, name: 'Acessorios para Maquiagem'},
  {id: 1611, name: 'Mascaras'},
  //

];

const collProdutos = db.collection('Produtos');
const refUsuarios = db.collection('Usuario');
const collLojas = db.collection('Lojas');
const collNotificacoesAdm = db.collection('Notificacoes/Central/Adm');
const refNotificacaoUser = db.collection('Notificacoes').doc('Usuario');
const collCarteira = db.collection('Carteira');
const refFeedPrincipal = db.collection('Feeds').doc('FeedPrincipal');

function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  let hora = date.getHours();
  let min = date.getMinutes();
  if (String(d).toString().length === 1) {
      d = `0${d}`;
  }
  if(String(m).toString().length === 1) {
      m = `0${m}`;
  }
  
  if(String(hora).toString().length === 1) {
      hora = `0${hora}`;
  }
  if(String(min).toString().length === 1) {
      min = `0${min}`;
  }
  return `As ${hora}:${min} do dia ${d}/${m}/${y}`;
};

async function produtoEdit(obj, novo) {
    let batch = db.batch();
    let refProduto = collProdutos.doc(obj.id);
    //let refLojas = collLojas.doc(obj.idLoja);

    let produtoCategoria = obj.categoria;
    let produtoColecoes = obj.colecoes;

    let produtoAtalho = {
      nome: obj.nome, 
      id: obj.id, 
      path: obj.fotoPrincipal
    };

    let objProduto = {
      dataCadastro: Date.now()
    };

    console.log('Get feed Main');
    

    const doc = await refFeedPrincipal.get();
  if (doc.exists) {
    let dados = doc.data();
    let { categorias, produtosNovos, colecoes } = dados;

    let indexCategoriaFeed = -1;
    categorias.map((e, i) => {
      let ID = e.id;
      if (ID == produtoCategoria) {
        indexCategoriaFeed = i;
      }
    });


    if (novo) {

      console.log('Produto novo');

      //(OK) Atualizar Hora
      //batch.update(refProduto, objProduto, {merge: true});
      //(OK) Altera o FeedPrincipal, colocando o produto como atalho nas novidades
      if (produtosNovos.length === 0) {
        batch.update(refFeedPrincipal, {
          produtosNovos: [produtoAtalho]
        });
      } else {

        let indexItemPrdNovos = -1;

        produtosNovos.map((e_1, i_1) => {
          let ID_1 = e_1.id;
          if (ID_1 == obj.id) {
            indexItemPrdNovos = i_1;
          }
        });

        let novoArrayProdutosNovos = produtosNovos;

        console.log('ProdutosNovos: ' + produtosNovos.length);

        if (indexItemPrdNovos === -1) {
          //produto nao ta nos atalhos
          let novosProdsNovos = produtosNovos;
          novoArrayProdutosNovos = novosProdsNovos.unshift(produtoAtalho);

          if (novoArrayProdutosNovos.length > 20) {
            novoArrayProdutosNovos = novoArrayProdutosNovos.slice(0, 20);
          }
        } else {
          //produto ja tava mas foi atualizado
          produtosNovos.splice(indexItemPrdNovos, 1);
          novoArrayProdutosNovos = produtosNovos.unshift(produtoAtalho);
          if (novoArrayProdutosNovos.length > 20) {
            novoArrayProdutosNovos = novoArrayProdutosNovos.slice(0, 20);
          }
        }

        //(OK) Atualizar atalho de novidades
        batch.update(refFeedPrincipal, {
          produtosNovos: produtosNovos
        });
      }

      //(OK) Se prodto for novo Acrescenta um numero na sua categoria do FeedPrincipal, 
      //(OK) Altera o FeedPrincipal, colocando o produto como atalho na sua categoria
      if (indexCategoriaFeed == -1) {
        //primeiro produto nessa categoria no feed
        let arrayRecentes = [
          produtoAtalho
        ];

        let objectItemCategFeed = {
          id: produtoCategoria,
          name: CATEGORIAS_CONST[produtoCategoria].name,
          itens: 1,
          recentes: arrayRecentes
        };

        let arrayCateg = categorias;
        arrayCateg.unshift(objectItemCategFeed);

        if (arrayCateg.length > 20) {
          arrayCateg.slice(0, 20);
        }


        batch.update(refFeedPrincipal, {
          categorias: arrayCateg
        });


      } else {
        //atualizar contagem
        let recentes = categorias[indexCategoriaFeed].recentes;

        let itensContados = categorias[indexCategoriaFeed].itens;

        let indexRecentesCateg = -1;
        recentes.map((e_2, i_2) => {
          if (e_2.id == obj.id) {
            indexRecentesCateg = i_2;
          }
        });

        if (indexRecentesCateg === -1) {
          //produto nao ta nos atalhos
          recentes.unshift(produtoAtalho);

          if (recentes.length > 20) {
            recentes.slice(0, 20);
          }
        } else {
          //produto ja tava mas foi atualizado
          recentes.splice(indexRecentesCateg, 1);
          recentes.unshift(produtoAtalho);
        }



        let objectItemCategFeed2 = {
          id: produtoCategoria,
          name: CATEGORIAS_CONST[produtoCategoria].name,
          itens: itensContados + 1,
          recentes: recentes
        };

        let novoArrayCatg = [];

        for (let x = 0; x < categorias.length; x++) {
          const element = categorias[x];
          if (x == indexCategoriaFeed) {
            novoArrayCatg.push(objectItemCategFeed2);
          } else {
            novoArrayCatg.push(element);
          }
        }

        batch.update(refFeedPrincipal, {
          categorias: novoArrayCatg
        });

      }

      //(OK) Altera o FeedPrincipal, colocando o produto como atalho na sua Colecao
      //(OK) Se prodto for novo Acrescenta um numero na sua Colecao do FeedPrincipal
      obj.colecoes.map(id => {

        let indexColecaoFeedPrincioal = -1;

        colecoes.map((e_3, i_3) => {
          let ID_2 = e_3.id;
          if (ID_2 == id) {
            indexColecaoFeedPrincioal = i_3;
          }
        });



        if (indexColecaoFeedPrincioal === -1) {
          //primeiro produto nessa colecao
          let arrayRecentes_1 = [
            produtoAtalho
          ];

          let indxName = '';
          COLECOES_LIST.map(e_4 => {
            let ID_3 = e_4.id;
            if (ID_3 == id) {
              indxName = e_4.name;
            }
          });



          let objectItemColecoesFeed = {
            id: id,
            name: indxName,
            itens: 1,
            recentes: arrayRecentes_1
          };

          colecoes.unshift(objectItemColecoesFeed);

          if (colecoes.length > 20) {
            colecoes.slice(0, 20);
          }


          batch.update(refFeedPrincipal, {
            colecoes: colecoes
          });


        } else {
          //atualizar contagem
          let recentes_1 = colecoes[indexColecaoFeedPrincioal].recentes;
          let itensContadosColl = colecoes[indexColecaoFeedPrincioal].itens;

          let indexRecentesColl = -1;
          recentes_1.map((e_5, i_4) => {
            if (e_5.id == obj.id) {
              indexRecentesColl = i_4;
            }
          });

          if (indexRecentesColl === -1) {
            //produto nao ta nos atalhos
            recentes_1.unshift(produtoAtalho);

            if (recentes_1.length > 20) {
              recentes_1.slice(0, 20);
            }
          } else {
            //produto ja tava mas foi atualizado
            recentes_1.splice(indexRecentesColl, 1);
            recentes_1.unshift(produtoAtalho);
          }



          let indxNam = '';

          COLECOES_LIST.map(e_6 => {
            let ID_4 = e_6.id;
            if (ID_4 == id) {
              indxNam = e_6.name;
            }
          });

          console.log('Nome Colecao: ' + indxNam);

          let objectItemColecoesFeed2 = {
            id: id,
            name: indxNam,
            itens: itensContadosColl + 1,
            recentes: recentes_1
          };

          let novoArrayColl = [];

          for (let x_1 = 0; x_1 < colecoes.length; x_1++) {
            const element_1 = colecoes[x_1];
            if (x_1 === indexColecaoFeedPrincioal) {
              novoArrayColl.push(objectItemColecoesFeed2);
            } else {
              novoArrayColl.push(element_1);
            }
          }

          batch.update(refFeedPrincipal, {
            colecoes: novoArrayColl
          });


        }
      });


    } else {

      let indexFeedCategRecentes = -1;

      let recentes_3 = categorias[indexCategoriaFeed].recentes;

      recentes_3.map((e_7, i_5) => {
        let ID_5 = e_7.id;
        if (ID_5 == obj.id) {
          indexFeedCategRecentes = i_5;
        }
      });

      let novaVarRecentes = null;

      if (indexFeedCategRecentes === -1) {
        //produto ainda nao ta nos atalhos
        let newRecentes = recentes_3.unshift(produtoAtalho);

        if (newRecentes.length > 20) {
          newRecentes.slice(0, 20);
        }

        novaVarRecentes = newRecentes;

      } else {
        //produto ja ta nos atalhos
        let novoRecentes = recentes_3;
        novoRecentes.splice(indexFeedCategRecentes, 1);
        novoRecentes.unshift(produtoAtalho);

        novaVarRecentes = novoRecentes;
      }

      let itensContados_1 = categorias[indexCategoriaFeed].itens;

      let objectItemCategFeed2_1 = {
        id: produtoCategoria,
        name: CATEGORIAS_CONST[produtoCategoria].name,
        itens: itensContados_1,
        recentes: novaVarRecentes
      };

      let novoArrayCatg_1 = [];

      for (let x_2 = 0; x_2 < categorias.length; x_2++) {
        const element_2 = categorias[x_2];
        if (x_2 === indexCategoriaFeed) {
          novoArrayCatg_1.push(objectItemCategFeed2_1);
        } else {
          novoArrayCatg_1.push(element_2);
        }
      }

      batch.update(refFeedPrincipal, {
        categorias: novoArrayCatg_1
      });


      obj.colecoes.map(id_1 => {

        let indexColecaoFeedPrincioal_1 = -1;
        colecoes.map((e_8, i_6) => {
          if (e_8.id == id_1) {
            indexColecaoFeedPrincioal_1 = i_6;
          }
        });



        let recentesColl = colecoes[indexColecaoFeedPrincioal_1].recentes;


        let indexFeedCollRecentes = -1;
        recentesColl.map((e_9, i_7) => {
          if (e_9.id == obj.id) {
            indexFeedCollRecentes = i_7;
          }
        });

        let novaVarRecentesColl = null;

        if (indexFeedCollRecentes === -1) {
          //produto nao ta no atalho ainda
          let newRecentes_1 = recentesColl.unshift(produtoAtalho);

          if (newRecentes_1.length > 20) {
            newRecentes_1.slice(0, 20);
          }

          novaVarRecentesColl = newRecentes_1;

        } else {

          let novoRecentes_1 = recentesColl;
          novoRecentes_1.splice(indexFeedCollRecentes, 1);
          novoRecentes_1.unshift(produtoAtalho);

          novaVarRecentesColl = novoRecentes_1;

        }

        let itensContadosColl_1 = colecoes[indexColecaoFeedPrincioal_1].itens;



        let indxNam_1 = '';

        COLECOES_LIST.map(e_10 => {
          let ID_6 = e_10.id;
          if (ID_6 === id_1) {
            indxNam_1 = e_10.name;
          }
        });

        let objectItemColecoesFeed2_1 = {
          id: id_1,
          name: indxNam_1,
          itens: itensContadosColl_1,
          recentes: novaVarRecentesColl
        };

        let novoArrayColl_1 = [];

        for (let x_3 = 0; x_3 < colecoes.length; x_3++) {
          const element_3 = colecoes[x_3];
          if (x_3 === indexColecaoFeedPrincioal_1) {
            novoArrayColl_1.push(objectItemColecoesFeed2_1);
          } else {
            novoArrayColl_1.push(element_3);
          }
        }

        batch.update(refFeedPrincipal, {
          colecoes: novoArrayColl_1
        });

      });


    }


  }
  try {
    console.log('Commit batch');
    return batch.commit();

  } catch (error) {
    console.log('Erro ');
    console.log(error);
  }


    //( ) Se prodto for novo Acrescenta um numero no Documento da sua Loja, 

    //( ) Se prodto ja existe Acrescenta um timestamp na lista de alteracoes do produto

    //( ) *Notifica a central que edicoes no produto foram feitas

}

async function novaCompra(obj, refCompra) {

  let batch = db.batch();

  let {itensCompra, total, uidVendedor, hora, comissao, cashback, nomeVendedor, nomeCliente, id, uidCliente} = obj;

  let title = `Nova compra de R$ ${parseFloat(total).toFixed(2)}`;
  let txtMultItens = itensCompra.length > 1 ? ' e mais...' : '';
  let bodyNotificacao = `${itensCompra[0].quantidade} ${itensCompra[0].nome} ${txtMultItens}`;

  let descricaoTransacao = `Da compra de ${itensCompra[0].quantidade} ${itensCompra[0].nome} ${txtMultItens}`;
  let descricaoTransacaoAdm = `Da compra de ${nomeCliente} ${dateToYMD(new Date(hora))}`;

  //referencias
  let refNotificacao = collNotificacoesAdm.doc(id);

  

  let objCompraUpdate = {
    hora: Date.now()
  };

  let objCarteira = {
    id: id,
    titulo: 'Comissão',
    descricao: descricaoTransacaoAdm,
    tipo: 1,
    status: 1,
    pago: false,
    hora: Date.now(),
    valor: comissao
  };

  
  
  if(uidVendedor !== null && uidVendedor !== '') {
    let refCarteira = collCarteira.doc('Usuario').collection(uidVendedor).doc(id);


    //let refRevendas = db.collection('Revendas').doc('Usuario').collection(uidVendedor).doc(id);

    //batch.update(refRevendas, objCompraUpdate);
    batch.set(refCarteira, objCarteira);
  }

  //objetos

  let objNotificacaoCentral = {
    id: id,
    title: title,
    body: bodyNotificacao,
    type: 1,
    typeName: 'Compras',
    data: {
      id: id
    },
    hora: Date.now()
  };

  let refMinhasCompras = db.collection('MinhasCompras').doc('Usuario').collection(uidCliente).doc(id);
  let refCarteiraCashback = collCarteira.doc('Usuario').collection(uidCliente).doc(id);
  let objCashback = {
    id: id,
    titulo: 'Cashback',
    descricao: descricaoTransacao,
    tipo: 3,
    status: 1,
    pago: false,
    hora: Date.now(),
    valor: cashback
  };
  
  batch.set(refCarteiraCashback, objCashback);
  batch.update(refMinhasCompras, objCompraUpdate);

  batch.update(refCompra, objCompraUpdate);
  
  batch.set(refNotificacao, objNotificacaoCentral);

  try {
    return batch.commit();

  } catch (error) {
    console.log('Erro Commit: ' + error);
  }

}

async function atualizarCompra(obj, concluida) {
  let {uidVendedor, id, itensCompra, comissao, uidCliente, cashback, nomeCliente, hora} = obj;
  let batch = db.batch();

  let sTitle = `Cashback de R$ ${parseFloat(cashback).toFixed(2)} na conta`;
  let sBody = `Compra de ${itensCompra[0].quantidade} ${itensCompra[0].nome} Concluida`;

  let sBodyAdm = `Compra de ${nomeCliente} as ${dateToYMD(new Date(hora))} Concluida`;
  let sTitleAdm = `Comissão de R$ ${parseFloat(comissao).toFixed(2)} na conta`;

  let objCarteiraUpdate = {status: 2};

  if(!concluida) {
    sTitle = `Cashback cancelado`;
    sBody = `Compra de ${itensCompra[0].quantidade} ${itensCompra[0].nome} Cancelada`;
    objCarteiraUpdate = {status: 4};
  }

  let objNotificacao = {
    id: id,
    title: sTitle,
    body: sBody,
    type: 1,
    typeName: 'Compras',
    data: {
      id: id
    },
    hora: Date.now()
  };

  let objNotificacaoAdm = {
    id: id,
    title: sTitleAdm,
    body: sBodyAdm,
    type: 10,
    typeName: 'Bônus',
    data: {
      id: id
    },
    hora: Date.now()
  };

  if(cashback !== null && cashback !== undefined && cashback > 0) {
    let refNotCliente = refNotificacaoUser.collection(uidCliente).doc(id);
    let refCartCliente = collCarteira.doc('Usuario').collection(uidCliente).doc(id);
    batch.update(refCartCliente, objCarteiraUpdate);
    batch.set(refNotCliente, objNotificacao);
  }
  

  if(uidVendedor !== null && uidVendedor !== '') {
    let refNotificacao = refNotificacaoUser.collection(uidVendedor).doc(id);
    let refCarteira = collCarteira.doc('Usuario').collection(uidVendedor).doc(id);
    batch.update(refCarteira, objCarteiraUpdate);
    batch.set(refNotificacao, objNotificacaoAdm);
  }

  try {
    return batch.commit();
  } catch (error) {
    console.log('Erro Commit: ' + error);
  }
  
}

async function notificar(obj, uid, adm) {
  
  

  if(adm) {
    let collfToken = db.collection('Tokens').doc('Adm').collection('Devices');
    let snapShot = await collfToken.get();
    if(snapShot.size > 0) {
      let tokensAdm = [];
      snapShot.docs.map(doc => {
        let dados = doc.data();
        let {tokens} = dados;
        let token = tokens[0];
        tokensAdm.push(token);
      });

      console.log(`Tokens Adm: ${tokensAdm.toString()}`);

      let objMsg = {
        tokens: tokensAdm,
        notification: {
          body: obj.body,
          title: obj.title,
        },
      };

      return messaging.sendMulticast(objMsg).then(() => console.log(`Notificação aos adms enviada com sucesso`)).catch(error => console.log(`Notificação não enviada: ${error}`));

    } else return null;

  } else {
    let refToken = db.collection('Tokens').doc(uid);
    let docToken = await refToken.get();
    if(docToken.exists) {

      let dados = docToken.data();
      let {tokens} = dados;

      console.log(`Tokens: ${tokens}`);

      let objMsg = {
        token: tokens[0],
        notification: {
          body: obj.body,
          title: obj.title,
        },
      };

      return messaging.send(objMsg).then(() => console.log(`Notificação de usuario enviada com sucesso`)).catch(error => console.log(`Notificação não enviada: ${error}`));

    } else return null;
  }
  
}

async function avaliar(document) {
  
  const docProd = await collProdutos.doc(document.id).get();
  if(docProd.exists) {
    let batch = db.batch();
    let dadosProd = docProd.data();
    if(dadosProd.numAvaliacoes === null || dadosProd.numAvaliacoes === undefined) {
      batch.update(collProdutos.doc(document.id), {numAvaliacoes: 1, avaliacao: document.avaliacao});
    } else {
      let v = dadosProd.numAvaliacoes * dadosProd.avaliacao;
      let novoTotal = dadosProd.numAvaliacoes + 1;
      let novaMedia = (v + document.avaliacao) / novoTotal;
      batch.update(collProdutos.doc(document.id), {numAvaliacoes: novoTotal, avaliacao: novaMedia});
    }

    try {
      return batch.commit();
  
    } catch (error) {
      console.log('Erro Commit: ' + error);
    }

  }
}

async function termoPesquisado(document) {
  const {id, hora, termos, uid, nome} = document;
  const batch = db.batch();
  const termo = termos[0];
  const doc = await refUsuarios.doc(uid).get();
  if(doc.exists) {
    let dados = doc.data();
    const {termosPesquisados} = dados;
    if(termosPesquisados === null || termosPesquisados === undefined) {
      listaDeTermos.push({termos: termos, hora: Date.now()});
      batch.update(refUsuarios.doc(uid), {termosPesquisados: termos});
    } else {
      let indiceNaLista = -1;

      for (let i = 0; i < termosPesquisados.length; i++) {
        const elemento = termosPesquisados[i];
        if(termo === elemento.termo) {
          indiceNaLista = i;
          break;
        }
      }

      let listaDeTermos = termosPesquisados;

      if(indiceNaLista > -1) {
        listaDeTermos.splice(indiceNaLista, 1);
      }

      listaDeTermos.push({termos: termos, hora: Date.now()});
      listaDeTermos.sort((a, b) => {
        return b.hora - a.hora;
      });

      batch.update(refUsuarios.doc(uid), {termosPesquisados: listaDeTermos});

    }

    try {
      return batch.commit();
  
    } catch (error) {
      console.log('Erro Commit Termo Pesquisado: ' + error);
    }
  }
}

async function editarAvaliacao(document, avaliacaoAntiga) {
  
  const docProd = await collProdutos.doc(document.id).get();
  if(docProd.exists) {
    let batch = db.batch();
    let dadosProd = docProd.data();
    if(dadosProd.numAvaliacoes === null || dadosProd.numAvaliacoes === undefined) {
      //batch.update(collProdutos.doc(document.id), {numAvaliacoes: 1, avaliacao: document.avaliacao});
    } else {
      let v = (dadosProd.numAvaliacoes * dadosProd.avaliacao) - avaliacaoAntiga;
      let novoTotal = dadosProd.numAvaliacoes;
      let novaMedia = (v + document.avaliacao) / novoTotal;
      batch.update(collProdutos.doc(document.id), {numAvaliacoes: novoTotal, avaliacao: novaMedia});
    }

    try {
      return batch.commit();
  
    } catch (error) {
      console.log('Erro Commit: ' + error);
    }

  }
}

async function visualizarProduto(uid, document) {

  let produtoObj = {
    nome: document.nome, 
    id: document.id, 
    foto: document.foto,
    dataHora: Date.now()
  };

  let batch = db.batch();

  const doc = await refUsuarios.doc(uid).get();
  if(doc.exists) {
    let dados = doc.data();
    if(dados.vistoPorUltimo === null || dados.vistoPorUltimo === undefined) {
      let listaNova = [];
      listaNova.push(produtoObj);
      batch.update(refUsuarios.doc(uid), {vistoPorUltimo: listaNova});
      //refUsuarios.doc(uid).update({vistoPorUltimo: listaNova});
    } else {

      let listVistoPorUltimo = dados.vistoPorUltimo;
      let indiceNaLista = -1;

      for (let i = 0; i < listVistoPorUltimo.length; i++) {
        const elemento = listVistoPorUltimo[i];
        if(document.id === elemento.id) {
          indiceNaLista = i;
          break
        }
      }

      if(indiceNaLista > -1) {
        listVistoPorUltimo.splice(indiceNaLista, 1);
      }

      listVistoPorUltimo.push(produtoObj);
      listVistoPorUltimo.sort((a, b) => {
        return b.dataHora - a.dataHora;
      });

      //refUsuarios.doc(uid).update({vistoPorUltimo: listVistoPorUltimo});
      batch.update(refUsuarios.doc(uid), {vistoPorUltimo: listVistoPorUltimo});

    }
  }

  const docProd = await collProdutos.doc(document.id).get();
  if(docProd.exists) {
    let dadosProd = docProd.data();
    if(dadosProd.views === null || dadosProd.views === undefined) {
      batch.update(collProdutos.doc(document.id), {views: 1});
    } else {
      let v = dadosProd.views + 1;
      batch.update(collProdutos.doc(document.id), {views: v});
    }
  }

  try {
    return batch.commit();

  } catch (error) {
    console.log('Erro Commit: ' + error);
  }

}

async function favoritar(uid, document) {

  let batch = db.batch();

  let produtoObj = {
    nome: document.nome, 
    id: document.id, 
    foto: document.foto,
    dataHora: Date.now()
  };

  const doc = await refUsuarios.doc(uid).get();
  if(doc.exists) {
    let dados = doc.data();

    if(dados.produtosFavoritos === null || dados.produtosFavoritos === undefined) {
      let listaNova = [];
      listaNova.push(produtoObj);
      //refUsuarios.doc(uid).update({produtosFavoritos: listaNova});
      batch.update(refUsuarios.doc(uid), {produtosFavoritos: listaNova});
    } else {

      let list = dados.produtosFavoritos;
      let indiceNaLista = -1;

      for (let i = 0; i < list.length; i++) {
        const elemento = list[i];
        if(document.id === elemento.id) {
          indiceNaLista = i;
          break
        }
      }

      if(indiceNaLista > -1) {
        list.splice(indiceNaLista, 1);
      }

      list.push(produtoObj);
      list.sort((a, b) => {
        return b.dataHora - a.dataHora;
      });

      //refUsuarios.doc(uid).update({produtosFavoritos: list});
      batch.update(refUsuarios.doc(uid), {produtosFavoritos: list});

    }
  }

  const docProd = await collProdutos.doc(document.id).get();
  if(docProd.exists) {
    let dadosProd = docProd.data();
    if(dadosProd.favoritos === null || dadosProd.favoritos === undefined) {
      batch.update(collProdutos.doc(document.id), {favoritos: 1});
    } else {
      let v = dadosProd.favoritos + 1;
      batch.update(collProdutos.doc(document.id), {favoritos: v});
    }
  }


  try {
    return batch.commit();

  } catch (error) {
    console.log('Erro Commit: ' + error);
  }

}

async function desFavoritar(uid, document) {

  let batch = db.batch();

  let produtoObj = {
    nome: document.nome, 
    id: document.id, 
    foto: document.foto,
    dataHora: Date.now()
  };

  const doc = await refUsuarios.doc(uid).get();
  if(doc.exists) {
    let dados = doc.data();
    if(dados.produtosFavoritos === null || dados.produtosFavoritos === undefined) {
      
    } else {

      let list = dados.produtosFavoritos;
      let indiceNaLista = -1;

      for (let i = 0; i < list.length; i++) {
        const elemento = list[i];
        if(document.id === elemento.id) {
          indiceNaLista = i;
          break
        }
      }

      if(indiceNaLista > -1) {
        list.splice(indiceNaLista, 1);
      }

      list.sort((a, b) => {
        return b.dataHora - a.dataHora;
      });

      //refUsuarios.doc(uid).update({produtosFavoritos: list});
      batch.update(refUsuarios.doc(uid), {produtosFavoritos: list});

    }
  }

  const docProd = await collProdutos.doc(document.id).get();
  if(docProd.exists) {
    let dadosProd = docProd.data();
    if(dadosProd.favoritos === null || dadosProd.favoritos === undefined) {
      //batch.update(collProdutos.doc(document.id), {favoritos: 1});
    } else {
      let v = dadosProd.favoritos - 1;
      batch.update(collProdutos.doc(document.id), {favoritos: v});
    }
  }


  try {
    return batch.commit();

  } catch (error) {
    console.log('Erro Commit: ' + error);
  }

}


exports.produtoEditado = functions.firestore.document('Produtos/{prodId}').onWrite((change, context) => {
    
    let prodNovo = !change.before.exists;
    const document = change.after.exists ? change.after.data() : null;
    const documentAntigo = change.before.data();

    console.log(`Produto Novo: ${prodNovo}`);

    console.log(`Documento Novo: ${JSON.stringify(document)}`);
    console.log(`Documento Antigo: ${JSON.stringify(documentAntigo)}`);


    if(document !== null) {


        if(documentAntigo !== null) {

          if(documentAntigo.views < document.views) {
            console.log(`views diferente: novo (${document.views})  antigo (${documentAntigo.views}) `);
            return null;
          }

          if(documentAntigo.avaliacao < document.avaliacao) {
            console.log(`avaliacao diferente: novo (${document.avaliacao})  antigo (${documentAntigo.avaliacao}) `);
            
            return null;
          }

          if(documentAntigo.numAvaliacoes < document.numAvaliacoes) {
            console.log(`numer avaliacao diferente: novo (${document.avaliacao})  antigo (${documentAntigo.avaliacao}) `);
            
            return null;
          }

          if(documentAntigo.comentarios < document.comentarios) {
            console.log(`comentarios diferente: novo (${document.comentarios})  antigo (${documentAntigo.comentarios}) `);

            return null;
          }

          if(documentAntigo.compartilhamentos < document.compartilhamentos) {
            console.log(`compartilhamentos diferente: novo (${document.compartilhamentos})  antigo (${documentAntigo.compartilhamentos}) `);
            
            return null;
          }

          if(documentAntigo.favoritos < document.favoritos) {
            console.log(`favoritos diferente: novo (${document.favoritos})  antigo (${documentAntigo.favoritos}) `);
            
            return null;
          }

          if(documentAntigo.ultimosComentarios !== document.ultimosComentarios) {
            console.log(`ultimosComentarios diferente: novo (${document.ultimosComentarios})  antigo (${documentAntigo.ultimosComentarios}) `);
            
            //return null;
          }

        }

        console.log('Produto Editado');
        return produtoEdit(document, prodNovo);

    } else {
        //produto excluido
        //produtoExcluido();
    }
});

exports.compra = functions.firestore.document('Compras/{compraId}').onWrite((change, context) => {

    let compraNova = !change.before.exists;
    const document = change.after.exists ? change.after.data() : null;

    if(compraNova) {
        //compra nova
        return novaCompra(document, change.after.ref);
    } else {

      if(document !== null) {
        //compra editada
        let antigoDocument = change.before.data();
        if(document.status === 5 && antigoDocument.status !== 5) {
          //concluida
          return atualizarCompra(document, true);
        } 
        if(document.status === 3 && antigoDocument.status !== 3) {
          //cancelada
          return atualizarCompra(document, false);
        }
      } else {
        //compra excluida
      }

    }
});

exports.notificacao = functions.firestore.document('Notificacoes/{tipo}/{uid}/{id}').onWrite((change, context) => {
  let nova = !change.before.exists;
  const document = change.after.exists ? change.after.data() : null;

  let uid = context.params.uid;
  let id = context.params.id;
  let tipo = context.params.tipo;

  if(nova) {
    
    if(tipo === 'Central') {
      return notificar(document, uid, true);
    } else {
      return notificar(document, uid, false);
    }

  } else {

    return null;

  }
});

exports.produtoView = functions.firestore.document('ProdutoView/Usuarios/{uid}/{id}').onWrite((change, context) => {
  const document = change.after.data();
  
  if(document === null || document === undefined) return;

  let uid = context.params.uid;
  
  return visualizarProduto(uid, document);

});

exports.novoFavorito = functions.firestore.document('Favoritos/Usuarios/{uid}/{id}').onWrite((change, context) => {
  let adicionado = !change.before.exists;
  let uid = context.params.uid;
  if(adicionado) {
    const document = change.after.data();
    return favoritar(uid, document);
  } else {
    const document = change.before.data();
    return desFavoritar(uid, document);
  }
});

exports.novaAvaliacao = functions.firestore.document('Avaliacoes/Usuarios/{uid}/{id}').onWrite((change, context) => {
  let adicionado = !change.before.exists;
  let uid = context.params.uid;
  if(adicionado) {
    //criado
    const document = change.after.data();
    return avaliar(document);
    
  } else {
    //editado
    const document = change.after.data();
    const antiga = change.before.data();
    const {avaliacao} = antiga;

    return editarAvaliacao(document, avaliacao);
    
  }
});

exports.novaPesquisa = functions.firestore.document('Pesquisa/{id}').onWrite((change, context) => {
  let adicionado = !change.before.exists;
  let id = context.params.id;
  if(adicionado) {
    //criado
    const document = change.after.data();
    return termoPesquisado(document)
    
  } 
});

