import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const promise = prisma.recipient.createMany({
  data:  [
    {
      "name": "Mário Samuel Giovanni Nascimento",
      "federalId": "062.944.942-22",
      "pixKey": "mario_samuel_nascimento@hotmail",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Samuel Osvaldo Sales",
      "federalId": "140.545.907-72",
      "pixKey": "samuel.osvaldo.sales@huios.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Vitor Juan Thomas Novaes",
      "federalId": "416.887.889-99",
      "pixKey": "vitor_novaes@lojasrayton.com",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Davi Anderson André Ramos",
      "federalId": "396.136.494-09",
      "pixKey": "davi.anderson.ramos@maccropropaganda.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Rafael Diego Carvalho",
      "federalId": "862.101.730-04",
      "pixKey": "rafael_carvalho@2registrocivil.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Elisa Pietra Santos",
      "federalId": "676.865.154-43",
      "pixKey": "elisa_pietra_santos@beminvestir.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Benedito Henry da Conceição",
      "federalId": "059.767.042-04",
      "pixKey": "benedito-daconceicao95@vitalliimoveis.com",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Alessandra Aparecida Porto",
      "federalId": "654.367.219-66",
      "pixKey": "alessandraaparecidaporto@viacabonet.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Ayla Simone de Paula",
      "federalId": "419.194.818-00",
      "pixKey": "ayla_simone_depaula@andressamelo.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Betina Natália Emilly Souza",
      "federalId": "938.419.285-60",
      "pixKey": "betinanataliasouza@viamoc.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Renan Augusto Costa",
      "federalId": "425.541.407-66",
      "pixKey": "renanaugustocosta@directnet.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Tomás Severino Yuri Viana",
      "federalId": "113.548.260-86",
      "pixKey": "tomas_viana@lavorosjc.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Márcia Raimunda da Silva",
      "federalId": "694.985.082-40",
      "pixKey": "marcia-dasilva72@biconsult.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Ricardo Hugo da Luz",
      "federalId": "963.727.497-93",
      "pixKey": "ricardo_hugo_daluz@construtoraplaneta.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Carolina Laura Ester Cardoso",
      "federalId": "005.380.671-95",
      "pixKey": "carolina.laura.cardoso@vbrasildigital.net",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "VALIDADO"
    },
    {
      "name": "Maria Silvana Esther Alves",
      "federalId": "625.247.464-96",
      "pixKey": "maria-alves79@cressem.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Lavínia Isadora Duarte",
      "federalId": "635.880.442-13",
      "pixKey": "laviniaisadoraduarte@hotmmail.com",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Caleb Renan Francisco Gomes",
      "federalId": "708.930.596-17",
      "pixKey": "calebrenangomes@vilasites.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Levi Erick Guilherme Barbosa",
      "federalId": "862.523.532-80",
      "pixKey": "levi_erick_barbosa@torrez.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Francisca Simone Malu da Cunha",
      "federalId": "892.923.450-01",
      "pixKey": "francisca_simone_dacunha@vilarreal.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Sophia Allana Brito",
      "federalId": "787.622.387-79",
      "pixKey": "sophia.allana.brito@agltda.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Joana Agatha dos Santos",
      "federalId": "798.710.593-70",
      "pixKey": "joana-dossantos95@hpelzer.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Edson João Vieira",
      "federalId": "040.654.777-78",
      "pixKey": "edson.joao.vieira@rcstechnology.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Erick Marcos Vinicius Baptista",
      "federalId": "005.367.374-36",
      "pixKey": "erick_marcos_baptista@andrade.com",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Osvaldo Marcos Nogueira",
      "federalId": "046.986.038-38",
      "pixKey": "osvaldo.marcos.nogueira@caej.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Eduardo Leandro Marcelo Aragão",
      "federalId": "406.209.525-47",
      "pixKey": "eduardo_leandro_aragao@dc4.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Fabiana Analu Isabelly Almada",
      "federalId": "689.190.642-37",
      "pixKey": "fabiana.analu.almada@lojaprincezinha.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Roberto Heitor Caio Silveira",
      "federalId": "989.017.784-67",
      "pixKey": "roberto_silveira@engeseg.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Julia Sarah Carla da Rosa",
      "federalId": "672.055.955-92",
      "pixKey": "julia-darosa71@br.festo.com",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    },
    {
      "name": "Lívia Isabela Caldeira",
      "federalId": "974.110.552-55",
      "pixKey": "livia.isabela.caldeira@ci.com.br",
      "pixKeyType": "EMAIL",
      "personNature": "NATURAL",
      "status": "RASCUNHO"
    }
  ]
});

Promise.all([promise]);