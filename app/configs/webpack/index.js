// ОБъявляем webpack для плагина
var webpack = require('webpack');

// Экспортируем настройки
module.exports = function(param) {

	return {

		// Какой модуль будем собирать
		// Внимание, если файл является точкой входа (entry),
		// то он не может подключаться внутри другого модуля
		entry: {
			app: ['babel-polyfill', `${param._path}/app/resource/scripts/index`],
		},

		// Куда его будем выводить
		output: {
			path: `${param._path}/web/public/scripts`,

			// На выходе указываем, что в путях внутри файлов
			// будет подставляться publicPath
			publicPath: '/public/scripts/',

			// Объявляем глобальную переменную (в модуле она указана через exports)
			//library: 'app',

			// Имя выходного файла
			// применяя шаблон name, будет создаваться файл,
			// с именем, соответствующим имени в entry
			filename: '[name].js'
		},

		// Включаем режим отладки у лоадеров (loaders)
		debug: true,

		// Включаю вотчер файлов watch: true
		watch: true,

		// Настройки вотчера файлов
		watchOptions: {

			// Задержка перед тем, как пересобрать файлы
			// По-умолчанию 300ms
			aggregateTimeout: 100
		},

		// Инструменты разработчика
		// source-maps типа eval, это самые быстрые
		devtool: 'eval',

		// Плагины
		// Подключается на разных стадиях компиляции
		// и что-то делает
		plugins: [

			// Плагин, который прерывает сборку,
			// при возникновении ошибки
			new webpack.NoErrorsPlugin(),

			// Плагин, через который можно любую переменную
			// передать в сборку
			new webpack.DefinePlugin({
				ENV: JSON.stringify(param.ENV)
			}),

			// Передаем переменную окружения,
			// в нашем случае только NODE_ENV
			// теперь мы можем ее использовать в js
			// new webpack.EnvironmentPlugin([
			// 	'NODE_ENV'
			// ]),

			// ВЫКЛЮЧИЛИ, Т.К ИСПОЛЬЗУЕМ EQUIRE.ENSURE
			// Плагин ищет в модулях (entry) одинаковые вызовы кода
			// и собирает их в один файл, который является чем-то вроде библиотеки
			//new webpack.optimize.CommonsChunkPlugin({

				// Имя куска сборки
				//name: 'lib'

				// Имя файла, куска сборки
				// filename: libChunks

				// По умолчанию в общий код выносится то,
				// что используется везде,
				// Указывая minChunks мы говорим в скольких файлах
				// должно быть повторение кода, чтобы вынести его в кусок
				// Кроме цифр можно указать функцию, которая решит,
				// передавать в кусок часть кода или нет
				// minChunks: NUMBER
			//})

		],

		// Указывает, где искать модуль (из entry),
		// если не указан путь (например нет даже ./)
		// extendions какой тип файла искать
		// Можно добавить alias, как связку модуля и его пути
		resolve: {
			//modulesDirectories: ['node_modules'],
			//extendions: ['', '.js']
		},

		// Указывает, где искать лоадеры,
		// если не указан путь
		resolveLoaders: {
			//modulesDirectories: ['node_modules'],
			//moduleTemplates: ['*-loader'],
			//extendions: ['', '.js']
		},

		// Модули для сборки
		module: {

			preLoaders: [

				// es-lint конфигурация в файле .eslintrc
				{
					test: /\.js$/,
					include: [
			        	`${param._path}/app/resource/scripts/`,
			        	`${param._path}/src/bundles/*/resource/scripts/`
			        ],
			        //exclude: /node_modules/,
			        loader: 'eslint-loader'
			    }
			],

			// В лоадерах тоже используются модули-лоадеры
			// Лоадер - трансформатор, получает исходный код и возвращает,
			// измененный код
			loaders: [
				{
					// Проверяет расширение файла
					test: [/\.js$/, /\.es6$/],

					// Проверяем для проверки пути, к просматриваемому файлу
					//include: []

					// Исключая
					exclude: /node_modules/,

					// Название модуля
					// Можно передавать параметры,
					// и цепочки лоадров
			        loader: 'babel-loader',
				}
			]
		}
	};

};