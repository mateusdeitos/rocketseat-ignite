import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
	host: string;
}

getConnectionOptions().then(options => {
	// É gambi, o host de options é somente leitura, então é criado um novo obj baseado no options e alterado o host. 'newOptions' é uma referência à options, então ao alterar o host de 'newOptions', o host em 'options' tmb é alterado
	const newOptions = options as IOptions;
	newOptions.host = 'database_main'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
	createConnection({
		...options,
	});
});