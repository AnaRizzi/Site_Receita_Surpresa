const url = 'https://receitasurpresa.azurewebsites.net/receita'; //endereço da API
const div_receita = document.getElementById('receita');
const home = document.getElementById('conteudo');
let receita;

//Para receber a API
const fetchAPI = async (urlApi) => {
	let response = await fetch(urlApi);
	const textResponse = await response.text();
	console.log(textResponse)
	return JSON.parse(textResponse);			//devolve a api no formato JSON
}

function exibirReceita(){
	div_receita.innerHTML = "";

	//IMAGEM
	let div_imagem = document.createElement('div');
	div_imagem.setAttribute('class', 'div-img-receita');
	let imagem = document.createElement('img');
	imagem.setAttribute('class', 'img-receita');
	imagem.setAttribute('src', `img/${receita.Imagem}`);
	div_imagem.appendChild(imagem);

	//TÍTULO
	let titulo = document.createElement('h1');
	titulo.setAttribute('class', 'titulo');
	titulo.innerHTML = receita.Nome;

	//INFORMAÇOES
	let div_infos = document.createElement('div');
	div_infos.setAttribute('class', 'infos');

	let tempo_preparo = document.createElement('p');
	if (receita.Tempo_Preparo != null){
		tempo_preparo.setAttribute('class', 'tempo');
		tempo_preparo.innerHTML = `Tempo de preparo: ${receita.Tempo_Preparo}`;
	}

	let rendimento = document.createElement('p');
	if (receita.Rendimento != null){
		rendimento.setAttribute('class', 'rendimento');
		rendimento.innerHTML = `Rendimento: ${receita.Rendimento}`;
	}

	let dificuldade = document.createElement('p');
	if (receita.Dificuldade != null){
		dificuldade.setAttribute('class', 'dificuldade');
		dificuldade.innerHTML = `Nível de dificuldade: ${receita.Dificuldade}`;
	}

	//INGREDIENTES
	let ingredientes = document.createElement('u');
	let ing_titulo = document.createElement('h3');
	ing_titulo.innerHTML = "Ingredientes"
	ingredientes.appendChild(ing_titulo);
	receita.Ingredientes.forEach((item) => {
		let lista = document.createElement('li');
		lista.innerHTML = item;
		ingredientes.appendChild(lista);
	})

	let ingredientes_recheio = document.createElement('u');
	if (receita.IngredientesRecheio.length != 0){
		let ing_rec_titulo = document.createElement('h3');
		ing_rec_titulo.innerHTML = "Ingredientes do Recheio"
		ingredientes_recheio.appendChild(ing_rec_titulo);

		receita.IngredientesRecheio.forEach((item) => {
		let lista_rec = document.createElement('li');
		lista_rec.innerHTML = item;
		ingredientes_recheio.appendChild(lista_rec);
		})	
	}


	let ingredientes_cobertura = document.createElement('u');
	if (receita.IngredientesCobertura.length != 0){
		let ing_cob_titulo = document.createElement('h3');
		ing_cob_titulo.innerHTML = "Ingredientes da Cobertura"
		ingredientes_cobertura.appendChild(ing_cob_titulo);

		receita.IngredientesCobertura.forEach((item) => {
		let lista_cob = document.createElement('li');
		lista_cob.innerHTML = item;
		ingredientes_cobertura.appendChild(lista_cob);
		})
	}

	//PREPARO
	let preparo = document.createElement('div');
	preparo.setAttribute('class', 'preparo');

	let prep_titulo = document.createElement('h3');
	prep_titulo.innerHTML = "Modo de Preparo"
	preparo.appendChild(prep_titulo);

	let listaPreparo = receita.Preparo.split(" - ");
	listaPreparo.forEach((item) => {
		let prep_corpo = document.createElement('p');
		prep_corpo.innerHTML = item;
		preparo.appendChild(prep_corpo);
	})

	//BOTÃO DE VOLTAR
	let div_voltar = document.createElement('div');
	div_voltar.setAttribute('class', 'div-voltar');
	let voltar = document.createElement('button');
	voltar.setAttribute('class', 'voltar');
	voltar.setAttribute('onclick', 'voltar()');
	voltar.innerHTML = "VOLTAR";
	div_voltar.appendChild(voltar);


	//div_receita.appendChild(voltar);
	div_receita.appendChild(div_imagem);
	div_receita.appendChild(titulo);
	div_receita.appendChild(div_infos);
	div_infos.appendChild(tempo_preparo);	
	div_infos.appendChild(rendimento);	
	div_infos.appendChild(dificuldade);
	div_receita.appendChild(ingredientes);
	div_receita.appendChild(ingredientes_recheio);
	div_receita.appendChild(ingredientes_cobertura);
	div_receita.appendChild(preparo);
	div_receita.appendChild(div_voltar);
}



//evento principal
async function pegarReceita(tipo){
	const urlCompleta = `${url}/${tipo}`;
	receita = await fetchAPI(urlCompleta);
	exibirReceita();
	home.className += "esconder";
	div_receita.className = div_receita.className.replace("esconder", "");
}


function voltar(){
	div_receita.className += "esconder";
	home.className = div_receita.className.replace("esconder", "");
}